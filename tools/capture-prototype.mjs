import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9200 + (process.pid % 1000);
const profile = path.join(process.cwd(), `.chrome-profile-${process.pid}`);
const output = path.join(process.cwd(), "screenshots");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const checkOnly = process.argv.includes("--check-only");

const chrome = spawn(chromePath, [
  "--headless=new", "--disable-gpu", "--disable-extensions", "--no-first-run", "--no-default-browser-check",
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank",
], { stdio: "ignore", windowsHide: true });

let socket;
try {
  let pageTarget;
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      pageTarget = targets.find((target) => target.type === "page" && target.url === "about:blank") ?? targets.find((target) => target.type === "page");
      if (pageTarget) break;
    } catch { /* Chrome is starting. */ }
    await delay(250);
  }
  if (!pageTarget) throw new Error("Chrome did not open a debuggable page");
  socket = new WebSocket(pageTarget.webSocketDebuggerUrl);
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
  socket.onclose = (event) => console.error("Chrome debugging connection closed:", event.code, event.reason);
  socket.onerror = (event) => console.error("Chrome debugging error:", event);
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    const id = nextId++;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`${method} timed out`)); }, 10000);
    pending.set(id, { resolve: (value) => { clearTimeout(timer); resolve(value); }, reject: (error) => { clearTimeout(timer); reject(error); } });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression) => {
    const result = await call("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  const save = async (name, options = {}) => {
    if (checkOnly) return;
    const shot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false, ...options });
    await writeFile(path.join(output, name), Buffer.from(shot.data, "base64"));
  };
  await mkdir(output, { recursive: true });
  await call("Page.enable");
  await call("Runtime.enable");
  await call("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await call("Page.navigate", { url: "http://localhost:3000/" });
  await delay(5500);
  await save("breakspider-splash-ready-1440x900.png");
  await evaluate("document.querySelector('.enter-button')?.click()");
  await delay(240);
  console.log("Opening panel transform:", await evaluate("document.querySelector('.splash-panel.left') ? getComputedStyle(document.querySelector('.splash-panel.left')).transform : 'finished'"));
  await save("breakspider-splash-opening-1440x900.png");
  await delay(1700);
  const desktopState = await evaluate("({splash:!!document.querySelector('.splash'), title:document.querySelector('h1')?.innerText, width:document.documentElement.scrollWidth, entered:localStorage.getItem('breakspider-entered')})");
  console.log("Desktop state:", desktopState);
  assert.equal(desktopState.splash, false);
  assert.equal(desktopState.entered, "true");
  await save("breakspider-desktop-1440x900.png");
  if (!checkOnly) {
    const desktopMetrics = await call("Page.getLayoutMetrics");
    await save("breakspider-desktop-full.png", { clip: { x: 0, y: 0, width: 1440, height: Math.ceil(desktopMetrics.cssContentSize.height), scale: 1 }, captureBeyondViewport: true });
  }

  await call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await delay(750);
  const mobileState = await evaluate("({viewport:window.innerWidth, document:document.documentElement.scrollWidth, spotlight:document.querySelector('.spotlight')?.getBoundingClientRect().width})");
  console.log("Mobile state:", mobileState);
  assert.equal(mobileState.viewport, 390);
  assert.equal(mobileState.document, 390);
  await save("breakspider-mobile-390x844.png");
  if (!checkOnly) {
    const mobileMetrics = await call("Page.getLayoutMetrics");
    await save("breakspider-mobile-full.png", { clip: { x: 0, y: 0, width: 390, height: Math.ceil(mobileMetrics.cssContentSize.height), scale: 1 }, captureBeyondViewport: true });
  }

  await evaluate("document.querySelector('.process-scrap')?.click()");
  await delay(250);
  const inspectionTitle = await evaluate("document.querySelector('#inspection-title')?.innerText");
  console.log("Inspection:", inspectionTitle);
  assert.equal(inspectionTitle, "A battle plan in progress");
  await save("breakspider-mobile-inspection.png");
  await evaluate("document.querySelector('.inspection .plain-close')?.click(); document.querySelector('.avatar-button')?.click()");
  await delay(250);
  const profileTitle = await evaluate("document.querySelector('.profile-popover h2')?.innerText");
  console.log("Profile:", profileTitle);
  assert.equal(profileTitle, "Visitor 000");
  await save("breakspider-mobile-profile.png");
  await evaluate("document.querySelector('.profile-popover .plain-close')?.click(); document.querySelector('.audio-toggle')?.click()");
  const audioSetting = await evaluate("localStorage.getItem('breakspider-muted')");
  console.log("Audio setting:", audioSetting);
  assert.equal(audioSetting, "false");
  await evaluate("document.querySelector('.menu-button')?.click()");
  const menuFirstItem = await evaluate("document.querySelector('.mobile-navigation a')?.innerText");
  console.log("Mobile menu:", menuFirstItem);
  assert.ok(menuFirstItem?.includes("Home"));
  await evaluate("[...document.querySelectorAll('.mobile-navigation a')].find(a => a.textContent.includes('Projects'))?.click()");
  await delay(800);
  const projectState = await evaluate("({title:document.querySelector('.stub-page h1')?.innerText, entered:localStorage.getItem('breakspider-entered'), url:location.href})");
  console.log("Project route:", projectState);
  assert.equal(projectState.entered, "true");
  assert.equal(projectState.title, "Work, games, and other systems.");
  await evaluate("document.querySelector('.brand')?.click()");
  await delay(800);
  const returnState = await evaluate("({splash:Boolean(document.querySelector('.splash')), entered:localStorage.getItem('breakspider-entered'), url:location.href})");
  console.log("Return-home:", returnState);
  assert.equal(returnState.splash, false);
  await evaluate("document.querySelector('.site-footer button')?.click()");
  await delay(150);
  const replayState = await evaluate("Boolean(document.querySelector('.splash'))");
  console.log("Replay splash:", replayState);
  assert.equal(replayState, true);
  for (const route of ["/about", "/projects", "/projects/pixel-pugilists", "/projects/viscap", "/sketchbook", "/familiars", "/collection", "/map"]) {
    const response = await fetch(`http://localhost:3000${route}`);
    console.log(`${route}: ${response.status}`);
    assert.equal(response.status, 200);
  }
} finally {
  socket?.close();
  chrome.kill();
  await delay(300);
  const workspaceRoot = path.resolve(process.cwd());
  const resolvedProfile = path.resolve(profile);
  if (resolvedProfile.startsWith(`${workspaceRoot}${path.sep}`)) {
    await rm(resolvedProfile, { recursive: true, force: true, maxRetries: 5, retryDelay: 150 }).catch(() => {});
  }
}
