import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9200 + (process.pid % 1000);
const profile = path.join(process.cwd(), `.chrome-profile-p02-${process.pid}`);
const output = path.join(process.cwd(), "screenshots");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const chrome = spawn(chromePath, ["--headless=new", "--disable-gpu", "--disable-extensions", "--no-first-run", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore", windowsHide: true });

let socket;
try {
  let target;
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      target = targets.find((item) => item.type === "page" && item.url === "about:blank") ?? targets.find((item) => item.type === "page");
      if (target) break;
    } catch { /* Browser is starting. */ }
    await delay(250);
  }
  if (!target) throw new Error("Chrome did not open a debuggable page");
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let nextId = 1;
  const pending = new Map();
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const item = pending.get(message.id);
    if (!item) return;
    pending.delete(message.id);
    if (message.error) item.reject(new Error(message.error.message));
    else item.resolve(message.result);
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression) => {
    const response = await call("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
    return response.result.value;
  };
  const save = async (name, options = {}) => {
    const shot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false, ...options });
    await writeFile(path.join(output, name), Buffer.from(shot.data, "base64"));
  };
  await mkdir(output, { recursive: true });
  await call("Page.enable");
  await call("Runtime.enable");
  await call("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await call("Page.navigate", { url: "http://localhost:3000/?preview=1" });
  await delay(1600);
  const desktop = await evaluate("({title:document.querySelector('h1')?.textContent,viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,splash:!!document.querySelector('.splash')})");
  console.log("Desktop:", desktop);
  assert.equal(desktop.viewport, 1440);
  assert.ok(desktop.scrollWidth <= 1440);
  assert.equal(desktop.splash, false);
  await save("prototype-02-desktop-1440x900.png");
  const desktopMetrics = await call("Page.getLayoutMetrics");
  await save("prototype-02-desktop-full.png", { clip: { x: 0, y: 0, width: 1440, height: Math.ceil(desktopMetrics.cssContentSize.height), scale: 1 }, captureBeyondViewport: true });

  await call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await delay(500);
  const mobile = await evaluate("({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,spotlight:!!document.querySelector('h1')})");
  console.log("Mobile:", mobile);
  assert.equal(mobile.viewport, 390);
  assert.ok(mobile.scrollWidth <= 390);
  const fileTrack = await evaluate("(() => { const track=[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Shuffle focus'))?.closest('section')?.querySelector('div:last-child'); return track ? {visible:track.clientWidth,total:track.scrollWidth} : null })()");
  assert.ok(fileTrack && fileTrack.total > fileTrack.visible);
  await save("prototype-02-mobile-390x844.png");
  const mobileMetrics = await call("Page.getLayoutMetrics");
  await save("prototype-02-mobile-full.png", { clip: { x: 0, y: 0, width: 390, height: Math.ceil(mobileMetrics.cssContentSize.height), scale: 1 }, captureBeyondViewport: true });

  await evaluate("document.querySelector('button[aria-label=\"Open visitor profile\"]')?.click()");
  assert.equal(await evaluate("document.querySelector('[role=dialog] h2')?.textContent"), "Visitor 000");
  await evaluate("document.querySelector('button[aria-label=\"Close visitor profile\"]')?.click()");
  await evaluate("document.querySelector('button[aria-label=\"Show another Familiar\"]')?.click()");
  assert.equal(await evaluate("document.querySelector('button[aria-label=\"Show another Familiar\"] img')?.alt.includes('Pebbloq')"), true);
  await evaluate("document.querySelector('button[aria-label=\"Audio off. Toggle audio\"]')?.click()");
  assert.equal(await evaluate("localStorage.getItem('breakspider-muted')"), "false");
  await evaluate("document.querySelector('button[aria-controls=\"p02-menu\"]')?.click()");
  assert.equal(await evaluate("!!document.querySelector('#p02-menu')"), true);
  await evaluate("document.querySelector('button[aria-controls=\"p02-menu\"]')?.click()");
  await evaluate("[...document.querySelectorAll('button')].find(b => b.textContent.includes('found: MAP.EXE'))?.click()");
  assert.equal(await evaluate("document.querySelector('[role=dialog] h2')?.textContent"), "A map of the public rooms");
  await save("prototype-02-mobile-inspection.png");
  await evaluate("document.querySelector('button[aria-label=\"Close inspection\"]')?.click()");
  assert.equal((await fetch("http://localhost:3000/prototype-01")).status, 200);
  await call("Page.navigate", { url: "http://localhost:3000/" });
  await delay(1000);
  assert.equal(await evaluate("!!document.querySelector('.splash')"), true);
  await delay(3500);
  await evaluate("document.querySelector('.enter-button')?.click()");
  await delay(1450);
  assert.equal(await evaluate("!!document.querySelector('.splash')"), false);
  assert.equal(await evaluate("localStorage.getItem('breakspider-entered')"), "true");
  await call("Page.reload");
  await delay(800);
  assert.equal(await evaluate("!!document.querySelector('.splash')"), false);
  await call("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await call("Page.navigate", { url: "http://localhost:3000/prototype-01?preview=1" });
  await delay(1200);
  await save("prototype-01-preserved-1440x900.png");
  console.log("Interactions, one-time splash, and Prototype 01 comparison route: OK");
} finally {
  socket?.close();
  chrome.kill();
  await delay(300);
  const workspaceRoot = path.resolve(process.cwd());
  const resolvedProfile = path.resolve(profile);
  if (resolvedProfile.startsWith(`${workspaceRoot}${path.sep}`)) await rm(resolvedProfile, { recursive: true, force: true, maxRetries: 5, retryDelay: 150 }).catch(() => {});
}
