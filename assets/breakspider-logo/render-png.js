#!/usr/bin/env node
// Rasterize the approved final SVG into two transparent website PNGs.
// Run `node render-png.js` from this folder (Node 22+ and Chrome/Edge).

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');

const base = process.env.BREAKSPIDER_LOGO_DIR || __dirname;
const width = 3120;
const height = 1450;
const source = fs.readFileSync(path.join(base, 'logo-full.svg'), 'utf8');
const canvas = 'viewBox="0 0 1600 820" width="1600" height="820"';
if (!source.includes(canvas)) throw new Error('Unexpected logo-full.svg canvas.');

// The distress clip also needs the even-odd rule so strokes cannot spill into
// counters such as P and D. A 20–25 unit crop cushion surrounds the ink.
const counterClipped = source.replaceAll(
  'fill-rule="evenodd"/></clipPath>',
  'fill-rule="evenodd" clip-rule="evenodd"/></clipPath>'
);
const cropped = counterClipped.replace(canvas, `viewBox="60 110 1560 725" width="${width}" height="${height}"`);
const whiteInk = cropped.replaceAll('#f4f0e5', '#ffffff');
const variants = [
  {
    file: 'breakspider-final-white.png',
    // Convert the dark distress paint to alpha while retaining soft edges.
    // The final composite uses white RGB, so the marks reveal the page below.
    svg: whiteInk.replace('</title>', `</title>
<defs><filter id="transparent-wear" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
  <feColorMatrix in="SourceGraphic" type="matrix" values="
    1 0 0 0 0
    0 1 0 0 0
    0 0 1 0 0
    .2126 .7152 .0722 0 0" result="luma"/>
  <feComponentTransfer in="luma" result="punched">
    <feFuncA type="linear" slope="1.04" intercept="-.04"/>
  </feComponentTransfer>
  <feComposite in="punched" in2="SourceAlpha" operator="in" result="alpha"/>
  <feFlood flood-color="#ffffff" result="white"/>
  <feComposite in="white" in2="alpha" operator="in"/>
</filter></defs>
<g filter="url(#transparent-wear)">`).replace('</svg>', '</g></svg>')
  },
  {
    file: 'breakspider-final-outlined.png',
    // The narrow black silhouette sits behind the original white ink and
    // dark print-wear details. It outlines delicate silk as well as letters.
    svg: whiteInk.replace('</title>', `</title>
<defs><filter id="website-outline" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
  <feMorphology in="SourceAlpha" operator="dilate" radius="1.75" result="edge"/>
  <feFlood flood-color="#000000" result="black"/>
  <feComposite in="black" in2="edge" operator="in" result="outline"/>
  <feMerge><feMergeNode in="outline"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter></defs>
<g filter="url(#website-outline)">`).replace('</svg>', '</g></svg>')
  }
];

function browserPath() {
  const found = [
    process.env.CHROME_BIN,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  ].filter(Boolean).find(fs.existsSync);
  if (!found) throw new Error('Chrome or Edge is required to render the PNGs.');
  return found;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function connect(browser, profile) {
  const marker = path.join(profile, 'DevToolsActivePort');
  let port;
  for (let i = 0; i < 150; i++) {
    if (fs.existsSync(marker)) {
      port = Number(fs.readFileSync(marker, 'utf8').split(/\r?\n/)[0]);
      break;
    }
    if (browser.exitCode !== null) throw new Error('Browser exited before opening DevTools.');
    await sleep(100);
  }
  if (!port) throw new Error('Timed out waiting for browser DevTools.');
  let target;
  for (let i = 0; i < 50; i++) {
    try {
      const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      target = pages.find((page) => page.type === 'page');
    } catch { /* Browser is still starting. */ }
    if (target) break;
    await sleep(100);
  }
  if (!target) throw new Error('No browser page was available.');
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  const pending = new Map();
  let nextId = 1;
  socket.addEventListener('message', ({ data }) => {
    const packet = JSON.parse(data);
    if (!pending.has(packet.id)) return;
    const { resolve, reject } = pending.get(packet.id);
    pending.delete(packet.id);
    packet.error ? reject(new Error(packet.error.message)) : resolve(packet.result);
  });
  return {
    socket,
    send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = nextId++;
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });
    }
  };
}

async function render() {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'breakspider-png-'));
  const browser = spawn(browserPath(), [
    '--headless=new', '--no-sandbox', '--disable-gpu-sandbox', '--no-first-run',
    '--disable-extensions', '--hide-scrollbars', '--remote-allow-origins=*',
    '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    `--window-size=${width},${height}`, 'about:blank'
  ], { windowsHide: true, stdio: 'ignore' });
  let cdp;
  try {
    cdp = await connect(browser, profile);
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width, height, deviceScaleFactor: 1, mobile: false
    });
    await cdp.send('Emulation.setDefaultBackgroundColorOverride', {
      color: { r: 0, g: 0, b: 0, a: 0 }
    });
    for (const { file, svg } of variants) {
      const data = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
      const expression = `(async () => {
        document.documentElement.style.cssText = 'margin:0;background:transparent';
        document.body.style.cssText = 'margin:0;width:${width}px;height:${height}px;overflow:hidden;background:transparent';
        const image = new Image();
        image.src = ${JSON.stringify(data)};
        image.style.cssText = 'display:block;width:${width}px;height:${height}px';
        document.body.replaceChildren(image);
        await image.decode();
        await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
        return [image.naturalWidth, image.naturalHeight];
      })()`;
      const loaded = await cdp.send('Runtime.evaluate', {
        expression, awaitPromise: true, returnByValue: true
      });
      if (loaded.exceptionDetails) throw new Error(`SVG failed to load: ${file}`);
      const shot = await cdp.send('Page.captureScreenshot', {
        format: 'png', fromSurface: true, captureBeyondViewport: false,
        clip: { x: 0, y: 0, width, height, scale: 1 }
      });
      const output = path.join(base, file);
      fs.writeFileSync(output, Buffer.from(shot.data, 'base64'));
      console.log(`Saved ${output} (${width} × ${height})`);
    }
  } finally {
    cdp?.socket.close();
    browser.kill();
    // The profile is created under the system temp directory above.
    try {
      const actual = fs.realpathSync(profile);
      const temp = fs.realpathSync(os.tmpdir());
      if (actual.startsWith(temp + path.sep) && path.basename(actual).startsWith('breakspider-png-')) {
        await sleep(500);
        fs.rmSync(actual, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      }
    } catch { /* Windows can briefly keep the browser profile locked. */ }
  }
}

render().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
