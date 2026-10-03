import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import assert from "node:assert/strict";

const origin = process.argv[2] ?? "http://localhost:3005";
const output = path.join(tmpdir(), "breakspider-prototype-05-review");
const profile = path.join(tmpdir(), `breakspider-p05-chrome-${process.pid}`);
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9300 + (process.pid % 500);
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const chrome = spawn(chromePath, ["--headless=new", "--disable-gpu", "--disable-extensions", "--no-first-run", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore", windowsHide: true });

let socket;
const errors = [];
try {
  await mkdir(output, { recursive: true });
  let target;
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      target = targets.find(item => item.type === "page");
      if (target) break;
    } catch { /* Chrome is starting. */ }
    await delay(200);
  }
  if (!target) throw new Error("Chrome debugging page did not start");
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let nextId = 1;
  const pending = new Map();
  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.text);
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
  const evaluate = async expression => {
    const response = await call("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
    return response.result.value;
  };
  const viewport = async (width, height) => call("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 700 });
  const visit = async route => {
    await call("Page.navigate", { url: origin + route });
    await delay(950);
    const state = await evaluate("({h1:document.querySelector('h1')?.textContent, width:innerWidth, scrollWidth:document.documentElement.scrollWidth, broken:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src)})");
    assert.ok(state.h1, `Missing heading on ${route}`);
    assert.ok(state.scrollWidth <= state.width + 1, `Horizontal overflow on ${route}: ${state.scrollWidth}/${state.width}`);
    assert.equal(state.broken.length, 0, `Broken images on ${route}: ${state.broken.join(", ")}`);
    console.log(route, JSON.stringify(state));
  };
  const shot = async name => {
    const result = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await writeFile(path.join(output, name), Buffer.from(result.data, "base64"));
  };
  await call("Page.enable");
  await call("Runtime.enable");

  await viewport(1440, 900);
  for (const [route, name] of [["/?preview=1", "home-desktop"], ["/about", "about-desktop"], ["/projects", "projects-desktop"], ["/projects/pixel-pugilists", "onff-desktop"], ["/projects/viscap", "viscap-desktop"], ["/sketchbook", "sketchbook-desktop"], ["/familiars", "familiars-desktop"], ["/collection", "collection-desktop"], ["/map", "map-desktop"]]) {
    await visit(route);
    await shot(`${name}.png`);
  }
  await visit("/projects/viscap");
  await evaluate("[...document.querySelectorAll('button')].find(b=>b.textContent?.includes('Media Library'))?.click()");
  await delay(120);
  assert.equal(await evaluate("document.querySelector('[aria-live=polite] strong')?.textContent"), "Media Library");
  await shot("viscap-selected-desktop.png");

  await viewport(1024, 768);
  await visit("/?preview=1");
  await shot("home-laptop.png");
  await viewport(820, 768);
  await visit("/?preview=1");
  await shot("home-tablet.png");

  await viewport(390, 844);
  for (const [route, name] of [["/?preview=1", "home-mobile"], ["/about", "about-mobile"], ["/projects", "projects-mobile"], ["/projects/pixel-pugilists", "onff-mobile"], ["/projects/viscap", "viscap-mobile"], ["/sketchbook", "sketchbook-mobile"], ["/sketchbook/battle-plans-first-pass", "entry-mobile"], ["/familiars", "familiars-mobile"], ["/familiars/ashwing", "ashwing-mobile"], ["/familiars/pebbloq", "pebbloq-mobile"], ["/collection", "collection-mobile"], ["/map", "map-mobile"]]) {
    await visit(route);
    await shot(`${name}.png`);
  }
  await visit("/?preview=1");
  await evaluate("window.scrollTo(0, document.getElementById('p03-pile-title').getBoundingClientRect().top + scrollY - 100)");
  await delay(180);
  await shot("home-files-mobile.png");
  await visit("/familiars");
  await evaluate("window.scrollTo(0, document.getElementById('roster-title').getBoundingClientRect().top + scrollY - 100)");
  await delay(180);
  await shot("familiars-roster-mobile.png");
  await visit("/projects/pixel-pugilists");
  assert.ok(await evaluate("document.querySelector('[class*=viewerBar]')?.textContent?.includes('BRACKET')"), "Build gallery should show a different screen from the hero");
  await visit("/collection");
  await evaluate("[...document.querySelectorAll('button')].find(b=>b.textContent?.includes('Fire badge'))?.click()");
  await delay(500);
  assert.equal(await evaluate("document.querySelector('[aria-live=polite] h3')?.textContent"), "Fire badge");
  await shot("collection-selected-mobile.png");
  await visit("/map");
  assert.equal(await evaluate("document.querySelectorAll('nav[aria-label=\"Public rooms\"] a').length"), 8);
  console.log("Runtime exceptions:", errors.length, errors);
  assert.equal(errors.length, 0);
  console.log("Screenshots:", output);
} finally {
  socket?.close();
  chrome.kill();
  if (path.resolve(profile).startsWith(path.resolve(tmpdir()) + path.sep)) {
    await delay(300);
    await rm(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 }).catch(() => {});
  }
}
