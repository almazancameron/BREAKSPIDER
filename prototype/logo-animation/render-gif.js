#!/usr/bin/env node
// Export the live SVG/Web Animations prototype without external packages.
// Usage: node render-gif.js
// Requires Node 22+ and Chrome or Edge installed locally.

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const zlib = require('node:zlib');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const WIDTH = 1280;
const HEIGHT = 656;
const FPS = 24;
const SECONDS = 4;
const FRAMES = FPS * SECONDS;
const BASE = process.env.BREAKSPIDER_ANIM_DIR || __dirname;
const OUTPUT = path.join(BASE, 'breakspider-animation.gif');

function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

function browserPath() {
  const candidates = [
    process.env.CHROME_BIN,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  ].filter(Boolean);
  const found = candidates.find((candidate) => fs.existsSync(candidate));
  if (!found) throw new Error('Chrome or Edge is required to render the GIF.');
  return found;
}

async function waitForPort(profile, browser) {
  const marker = path.join(profile, 'DevToolsActivePort');
  for (let attempt = 0; attempt < 150; attempt++) {
    if (fs.existsSync(marker)) return Number(fs.readFileSync(marker, 'utf8').split(/\r?\n/)[0]);
    if (browser.exitCode !== null) throw new Error('The browser exited before opening DevTools.');
    await sleep(100);
  }
  throw new Error('Timed out waiting for the browser DevTools port.');
}

async function openCdp(port) {
  let target;
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      target = pages.find((item) => item.type === 'page');
      if (target) break;
    } catch { /* Browser is still starting. */ }
    await sleep(100);
  }
  if (!target) throw new Error('No browser page was available for capture.');

  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  let nextId = 1;
  const pending = new Map();
  socket.addEventListener('message', (event) => {
    const packet = JSON.parse(event.data);
    if (!packet.id || !pending.has(packet.id)) return;
    const { resolve, reject } = pending.get(packet.id);
    pending.delete(packet.id);
    if (packet.error) reject(new Error(`${packet.error.message} (${packet.error.code})`));
    else resolve(packet.result);
  });
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = nextId++;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }
  return { socket, send };
}

async function evaluate(cdp, expression) {
  const result = await cdp.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || 'Browser evaluation failed.');
  }
  return result.result.value;
}

// Decode Chrome's 8-bit RGB/RGBA screenshot and map its black/off-white art
// onto the same 256-step warm-white ramp used by the GIF palette.
function pngToPalette(png) {
  if (png.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('Not a PNG screenshot.');
  let position = 8;
  let width, height, channels, depth, interlace;
  const idat = [];
  while (position < png.length) {
    const length = png.readUInt32BE(position);
    const type = png.toString('ascii', position + 4, position + 8);
    const chunk = png.subarray(position + 8, position + 8 + length);
    position += length + 12;
    if (type === 'IHDR') {
      width = chunk.readUInt32BE(0);
      height = chunk.readUInt32BE(4);
      depth = chunk[8];
      channels = chunk[9] === 2 ? 3 : chunk[9] === 6 ? 4 : 0;
      interlace = chunk[12];
    } else if (type === 'IDAT') idat.push(chunk);
    else if (type === 'IEND') break;
  }
  if (width !== WIDTH || height !== HEIGHT || depth !== 8 || !channels || interlace !== 0) {
    throw new Error(`Unexpected PNG dimensions or color format: ${width}×${height}, depth ${depth}, channels ${channels}.`);
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const pixels = Buffer.allocUnsafe(width * height);
  let previous = Buffer.alloc(stride);
  let offset = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[offset++];
    const current = Buffer.allocUnsafe(stride);
    for (let i = 0; i < stride; i++) {
      const left = i >= channels ? current[i - channels] : 0;
      const above = previous[i];
      const upperLeft = i >= channels ? previous[i - channels] : 0;
      let predictor = 0;
      if (filter === 1) predictor = left;
      else if (filter === 2) predictor = above;
      else if (filter === 3) predictor = (left + above) >> 1;
      else if (filter === 4) {
        const estimate = left + above - upperLeft;
        const a = Math.abs(estimate - left);
        const b = Math.abs(estimate - above);
        const c = Math.abs(estimate - upperLeft);
        predictor = a <= b && a <= c ? left : b <= c ? above : upperLeft;
      } else if (filter !== 0) throw new Error(`Unsupported PNG row filter ${filter}.`);
      current[i] = (raw[offset++] + predictor) & 255;
    }
    for (let x = 0; x < width; x++) {
      const pixel = x * channels;
      const alpha = channels === 4 ? current[pixel + 3] / 255 : 1;
      pixels[y * width + x] = Math.min(255, Math.round(current[pixel] * alpha * 255 / 244));
    }
    previous = current;
  }
  return pixels;
}

// GIF LZW writes codes least-significant bit first, in blocks of at most 255
// bytes. One dictionary is used per complete frame.
function gifLzw(pixels) {
  const output = [];
  let bits = 0;
  let bitCount = 0;
  let codeSize = 9;
  let nextCode = 258;
  let dictionary = new Map();
  function writeCode(code) {
    bits |= code << bitCount;
    bitCount += codeSize;
    while (bitCount >= 8) {
      output.push(bits & 255);
      bits >>>= 8;
      bitCount -= 8;
    }
  }
  writeCode(256); // Clear code for an 8-bit palette.
  let prefix = pixels[0];
  for (let i = 1; i < pixels.length; i++) {
    const value = pixels[i];
    const key = (prefix << 8) | value;
    const match = dictionary.get(key);
    if (match !== undefined) {
      prefix = match;
      continue;
    }
    writeCode(prefix);
    if (nextCode < 4096) {
      dictionary.set(key, nextCode++);
      // GIF decoders add entries one emitted code behind the encoder. The
      // wider code size starts after nextCode passes the current boundary.
      if (nextCode > (1 << codeSize) && codeSize < 12) codeSize++;
    } else {
      writeCode(256);
      dictionary = new Map();
      codeSize = 9;
      nextCode = 258;
    }
    prefix = value;
  }
  writeCode(prefix);
  writeCode(257); // End of frame.
  if (bitCount) output.push(bits & 255);
  return Buffer.from(output);
}

class GifWriter {
  constructor(filename) {
    this.fd = fs.openSync(filename, 'w');
    const header = Buffer.alloc(13);
    header.write('GIF89a', 0, 'ascii');
    header.writeUInt16LE(WIDTH, 6);
    header.writeUInt16LE(HEIGHT, 8);
    header[10] = 0xf7; // Global 256-color table.
    fs.writeSync(this.fd, header);
    const palette = Buffer.alloc(256 * 3);
    for (let i = 0; i < 256; i++) {
      palette[i * 3] = Math.round(244 * i / 255);
      palette[i * 3 + 1] = Math.round(240 * i / 255);
      palette[i * 3 + 2] = Math.round(229 * i / 255);
    }
    fs.writeSync(this.fd, palette);
    fs.writeSync(this.fd, Buffer.from([0x21, 0xff, 0x0b, ...Buffer.from('NETSCAPE2.0'), 0x03, 0x01, 0, 0, 0]));
  }
  frame(pixels, delay) {
    fs.writeSync(this.fd, Buffer.from([0x21, 0xf9, 0x04, 0x04, delay & 255, delay >> 8, 0, 0]));
    const descriptor = Buffer.alloc(10);
    descriptor[0] = 0x2c;
    descriptor.writeUInt16LE(WIDTH, 5);
    descriptor.writeUInt16LE(HEIGHT, 7);
    fs.writeSync(this.fd, descriptor);
    fs.writeSync(this.fd, Buffer.from([8]));
    const compressed = gifLzw(pixels);
    for (let i = 0; i < compressed.length; i += 255) {
      const chunk = compressed.subarray(i, i + 255);
      fs.writeSync(this.fd, Buffer.from([chunk.length]));
      fs.writeSync(this.fd, chunk);
    }
    fs.writeSync(this.fd, Buffer.from([0]));
  }
  close() {
    fs.writeSync(this.fd, Buffer.from([0x3b]));
    fs.closeSync(this.fd);
    this.fd = null;
  }
}

async function render() {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'breakspider-gif-'));
  const browser = spawn(browserPath(), [
    '--headless=new', '--no-sandbox', '--disable-gpu-sandbox', '--disable-gpu',
    '--disable-gpu-compositing', '--disable-software-rasterizer',
    '--disable-features=Vulkan,CanvasOopRasterization', '--no-first-run',
    '--disable-extensions', '--hide-scrollbars', '--remote-allow-origins=*',
    '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    `--window-size=${WIDTH},${HEIGHT}`, 'about:blank'
  ], { windowsHide: true, stdio: 'ignore' });
  let cdp;
  let writer;
  try {
    const port = await waitForPort(profile, browser);
    cdp = await openCdp(port);
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false
    });
    const page = pathToFileURL(path.join(BASE, 'index.html')).href;
    await cdp.send('Page.navigate', { url: `${page}?t=0` });
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      ready = await evaluate(cdp, `location.href.startsWith(${JSON.stringify(page)}) && document.readyState === 'complete' && !!window.breakspiderMotion`);
      if (ready) break;
      await sleep(100);
    }
    if (!ready) throw new Error('The animation page did not finish loading.');
    await evaluate(cdp, `(async () => {
      await Promise.all([...document.images].map(image => image.decode()));
      document.body.style.cssText = 'display:block;width:${WIDTH}px;height:${HEIGHT}px;margin:0;overflow:hidden;background:#000';
      const main = document.querySelector('main');
      main.style.cssText = 'width:${WIDTH}px;max-width:none;margin:0;padding:0';
      document.querySelector('.topline').style.display = 'none';
      document.querySelector('.controls').style.display = 'none';
      document.querySelector('.progress').style.display = 'none';
      const stage = document.querySelector('.stage');
      stage.style.cssText = 'width:${WIDTH}px;height:${HEIGHT}px;aspect-ratio:auto;border:0';
      window.scrollTo(0, 0);
      return [stage.clientWidth, stage.clientHeight];
    })()`);
    writer = new GifWriter(OUTPUT);
    for (let i = 0; i < FRAMES; i++) {
      const time = i / FPS;
      await evaluate(cdp, `(async () => {
        window.breakspiderMotion.seek(${time});
        await new Promise(requestAnimationFrame);
        return true;
      })()`);
      const capture = await cdp.send('Page.captureScreenshot', {
        format: 'png', fromSurface: true, captureBeyondViewport: false,
        clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT, scale: 1 }
      });
      const png = Buffer.from(capture.data, 'base64');
      if (process.env.BREAKSPIDER_GIF_DEBUG && [0, 24, 40, 72, 95].includes(i)) {
        fs.writeFileSync(path.join(os.tmpdir(), `breakspider-gif-capture-${i}.png`), png);
      }
      const pixels = pngToPalette(png);
      const delay = Math.round((i + 1) * 400 / FRAMES) - Math.round(i * 400 / FRAMES);
      writer.frame(pixels, delay);
      if ((i + 1) % 12 === 0 || i === 0) console.log(`Rendered ${i + 1}/${FRAMES} frames`);
    }
    writer.close();
    writer = null;
    console.log(`Saved ${OUTPUT} (${(fs.statSync(OUTPUT).size / 1024 / 1024).toFixed(2)} MiB)`);
  } finally {
    if (writer?.fd != null) fs.closeSync(writer.fd);
    cdp?.socket.close();
    browser.kill();
    // The profile was created in the system temp directory by mkdtemp above.
    // Confirm its resolved location before recursively removing it on Windows.
    try {
      const actual = fs.realpathSync(profile);
      const temp = fs.realpathSync(os.tmpdir());
      if (actual.startsWith(temp + path.sep) && path.basename(actual).startsWith('breakspider-gif-')) {
        await sleep(500);
        fs.rmSync(actual, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      }
    } catch { /* A locked temp browser profile can be removed by the OS later. */ }
  }
}

render().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
