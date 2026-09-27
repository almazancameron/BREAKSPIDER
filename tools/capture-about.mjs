import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const route = process.argv[2] || "about";
if (!/^[a-z0-9/-]+$/.test(route) || route.includes("..")) throw new Error("Invalid route path");
const prefix = route === "projects/pixel-pugilists" ? "pixel-pugilists" : route.replaceAll("/", "-");
const serverPort = Number(process.argv[3] || 3001);
const port = 9300 + (process.pid % 1000);
const profile = path.join(process.cwd(), `.chrome-profile-${prefix}-${process.pid}`);
if (path.dirname(path.resolve(profile)).toLowerCase() !== path.resolve(process.cwd()).toLowerCase()) throw new Error("Chrome profile path escaped the workspace");
const output = path.join(process.cwd(), "screenshots");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const chrome = spawn(chromePath, ["--headless=new", "--disable-gpu", "--disable-extensions", "--no-first-run", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore", windowsHide: true });
let socket;
try {
  let target;
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      target = targets.find(item => item.type === "page");
      if (target) break;
    } catch {}
    await delay(250);
  }
  if (!target) throw new Error("Chrome did not start");
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let nextId = 1;
  const pending = new Map();
  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const promise = pending.get(message.id);
    if (!promise) return;
    pending.delete(message.id);
    message.error ? promise.reject(new Error(message.error.message)) : promise.resolve(message.result);
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => (await call("Runtime.evaluate", { expression, returnByValue: true })).result.value;
  await mkdir(output, { recursive: true });
  await call("Page.enable");
  await call("Runtime.enable");
  for (const [width, height, name] of [[1440, 900, `${prefix}-desktop-1440x900.png`], [390, 844, `${prefix}-mobile-390x844.png`]]) {
    await call("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
    await call("Page.navigate", { url: `http://localhost:${serverPort}/${route}` });
    await delay(1500);
    const state = await evaluate("({ title: document.title, h1: document.querySelector('h1')?.textContent, width: innerWidth, scrollWidth: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight, contact: !!document.querySelector('#contact'), projects: !!document.querySelector('#viscap') && !!document.querySelector('#pixel-pugilists') })");
    console.log(name, state);
    const screenshot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await writeFile(path.join(output, name), Buffer.from(screenshot.data, "base64"));
    const metrics = await call("Page.getLayoutMetrics");
    const fullHeight = Math.ceil(metrics.cssContentSize.height);
    const fullScreenshot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: fullHeight, scale: 1 } });
    await writeFile(path.join(output, name.replace(".png", "-full.png")), Buffer.from(fullScreenshot.data, "base64"));
    if (route === "projects") {
      await evaluate("document.querySelector('button[aria-label=\"Show Viscap Actor hub screenshot\"]').click(); document.querySelector('button[aria-label=\"Show Pixel Pugilists Priority builder screenshot\"]').click(); true");
      await delay(100);
      const switched = await evaluate("({ viscap: !!document.querySelector('#viscap img[src*=\"viscap-actor\"]'), game: !!document.querySelector('#pixel-pugilists img[src*=\"pp-priority\"]') })");
      if (!switched.viscap || !switched.game) throw new Error(`Screenshot controls did not switch images: ${JSON.stringify(switched)}`);
      console.log("Screenshot controls:", switched);
    }
    if (route === "projects/pixel-pugilists") {
      await evaluate("document.querySelectorAll('button[aria-pressed]')[2].click(); true");
      await delay(100);
      const switched = await evaluate("!!document.querySelector('button[aria-pressed=\"true\"]:nth-child(3)') && !!document.querySelector('img[alt=\"Pixel Pugilists tournament bracket screen\"]')");
      if (!switched) throw new Error("Pixel Pugilists screenshot chooser did not switch images");
      await evaluate("document.querySelector('button[aria-label=\"Inspect Pixel Pugilists combat screenshot\"]').click(); true");
      await delay(100);
      const inspection = await evaluate("!!document.querySelector('[role=\"dialog\"][aria-label=\"Combat screenshot\"]')");
      if (!inspection) throw new Error("Pixel Pugilists screenshot inspection did not open");
      console.log("Pixel Pugilists controls:", { switched, inspection });
    }
    if (route === "projects/viscap") {
      await evaluate("document.querySelector('button[aria-label=\"Show Actor Hub\"]').click(); true");
      await delay(100);
      const switched = await evaluate("document.querySelector('#focus-title')?.textContent === 'Actor Hub'");
      await evaluate("document.querySelector('button[aria-label=\"Inspect Actor Hub screenshot\"]').click(); true");
      await delay(100);
      const inspection = await evaluate("!!document.querySelector('[role=\"dialog\"][aria-label=\"Actor Hub screenshot\"]')");
      if (!switched || !inspection) throw new Error("Viscap system selection or inspection failed");
      console.log("Viscap controls:", { switched, inspection });
    }
    if (route === "sketchbook") {
      await evaluate("Array.from(document.querySelectorAll('nav[aria-label=\"Filter posts by tag\"] button')).find(button => button.textContent === 'Viscap').click(); true");
      await delay(100);
      const filtered = await evaluate("document.querySelectorAll('section[aria-label=\"Sketchbook entries\"] article').length === 1 && document.querySelector('section[aria-label=\"Sketchbook entries\"] article')?.textContent.includes('Two screens from Viscap')");
      if (!filtered) throw new Error("Sketchbook tag filtering failed");
      console.log("Sketchbook controls:", { filtered });
    }
    if (route === "familiars/ashwing") {
      await evaluate("document.querySelector('button[aria-pressed]').click(); true");
      await delay(100);
      const grid = await evaluate("document.querySelector('button[aria-pressed=\"true\"]')?.textContent.includes('PIXEL GRID')");
      if (!grid) throw new Error("Familiar pixel grid toggle failed");
      console.log("Familiar controls:", { grid });
    }
    if (route === "collection") {
      await evaluate("Array.from(document.querySelectorAll('nav[aria-label=\"Collection categories\"] button')).find(button => button.textContent.startsWith('Map')).click(); true");
      await delay(100);
      const category = await evaluate("!!document.querySelector('nav[aria-label=\"Collection categories\"] button[aria-pressed=\"true\"]')?.textContent.startsWith('Map')");
      await evaluate("Array.from(document.querySelectorAll('button')).find(button => button.textContent.includes('Pin in showcase')).click(); true");
      await delay(100);
      const pinned = await evaluate("document.querySelector('h2')?.textContent === 'Default visitor' && Array.from(document.querySelectorAll('h2')).some(heading => heading.textContent === 'Public Map')");
      if (!category || !pinned) throw new Error("Collection category or showcase controls failed");
      console.log("Collection controls:", { category, pinned });
    }
    if (route === "map") {
      await evaluate("Array.from(document.querySelectorAll('section[aria-label=\"Interactive public route map\"] button')).find(button => button.textContent.includes('Viscap')).click(); true");
      await delay(100);
      const selected = await evaluate("!!Array.from(document.querySelectorAll('section[aria-label=\"Interactive public route map\"] a')).find(link => link.getAttribute('href') === '/projects/viscap')");
      if (!selected) throw new Error("Map route selection failed");
      console.log("Map controls:", { selected });
    }
  }
} finally {
  socket?.close();
  chrome.kill();
  await delay(300);
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
}
