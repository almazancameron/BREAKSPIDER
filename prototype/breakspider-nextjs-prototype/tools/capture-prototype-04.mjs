import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9200 + (process.pid % 1000);
const profile = path.join(process.cwd(), `.chrome-profile-p04-${process.pid}`);
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
  const keepsakes = await evaluate("(() => { const portrait=document.querySelector('a[aria-label=\"About the creator\"]'); const r=portrait?.getBoundingClientRect(); return {floatingLayer:!!document.querySelector('[class*=accumulation]'),portraitLeft:r?.left,portraitRight:r?.right,portraitTop:r?.top,noiseBankImages:document.querySelectorAll('[class*=noiseBank] img').length,nonNoiseMargins:[...document.querySelectorAll('[class*=marginClutter] img')].filter(img => getComputedStyle(img).display !== 'none' && !img.src.includes('noise')).length,pinImages:[...document.images].filter(img => /lightning-pin|player-pin/.test(img.src)).length,spotlightBadges:document.querySelector('[class*=spotlightBadges]')?.parentElement?.tagName,viscapMark:!!document.querySelector('a[aria-label=\"Open Viscap project\"] img[src*=\"viscap-mark\"]'),familiarDrops:!!document.querySelector('[class*=familiar] img[src*=\"strawberry\"]')} })()");
  assert.equal(keepsakes.floatingLayer, false);
  assert.ok(keepsakes.portraitLeft > 800 && keepsakes.portraitRight < 1120);
  assert.ok(keepsakes.noiseBankImages >= 75 && keepsakes.nonNoiseMargins >= 8);
  assert.equal(keepsakes.pinImages, 0);
  assert.equal(keepsakes.spotlightBadges, "SECTION");
  assert.ok(keepsakes.viscapMark && keepsakes.familiarDrops);
  assert.ok(await evaluate("['noiseLavender04','debrisRed'].every(name => getComputedStyle(document.querySelector(`[class*=${name}]`)).display === 'none')"));
  console.log("P04 attached keepsakes:", keepsakes);
  const desktopHeader = await evaluate("(() => { const rect = (selector) => { const r=document.querySelector(selector).getBoundingClientRect(); return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,height:r.height} }; return {header:rect('header'),avatar:rect('button[aria-label=\"Open visitor profile\"]'),mute:rect('button[aria-label^=\"Audio\"]'),nav:rect('nav[aria-label=\"Primary navigation\"]'),status:rect('[class*=headerStatus]'),logo:rect('a[aria-label=\"Breakspider home\"]'),shadows:[...document.querySelectorAll('nav[aria-label=\"Primary navigation\"] a')].map(link=>getComputedStyle(link).filter)} })()");
  assert.ok(desktopHeader.avatar.left < desktopHeader.mute.left && desktopHeader.mute.right < desktopHeader.nav.left);
  assert.ok(desktopHeader.nav.right < desktopHeader.status.left && desktopHeader.status.right < desktopHeader.logo.left);
  assert.ok(desktopHeader.header.height <= 104);
  assert.equal(new Set(desktopHeader.shadows).size, 3);
  const composition = await evaluate("(() => { const header=document.querySelector('header').getBoundingClientRect(); const spotlight=document.querySelector('[class*=spotlight]').getBoundingClientRect(); const readout=document.querySelector('[class*=sideReadout]'); const readoutStyle=getComputedStyle(readout); const noise=[...document.querySelectorAll('[class*=noiseBank] img')]; return {headerGap:spotlight.top-header.bottom,readoutZ:Number(readoutStyle.zIndex),readoutBackground:readoutStyle.backgroundColor,interiorBanks:['noiseBridge','noiseRightPocket','noiseLowerPocket'].map(name=>document.querySelector(`[class*=${name}] img`)?.getBoundingClientRect().width>0),minNoiseHorizontalVisibility:Math.min(...noise.map(img=>{const r=img.getBoundingClientRect();return Math.max(0,Math.min(innerWidth,r.right)-Math.max(0,r.left))/r.width}))} })()");
  assert.ok(composition.headerGap >= 20 && composition.headerGap <= 45, `Header to Spotlight gap: ${composition.headerGap}`);
  assert.ok(composition.readoutZ > 3 && composition.readoutBackground !== "rgba(0, 0, 0, 0)");
  assert.ok(composition.interiorBanks.every(Boolean));
  assert.ok(composition.minNoiseHorizontalVisibility >= .3, `Noise clipped too far: ${composition.minNoiseHorizontalVisibility}`);
  console.log("Composition:", composition);
  const projectsHover = await evaluate("(() => { const links=[...document.querySelectorAll('nav[aria-label=\"Primary navigation\"] a')]; const project=links[1].getBoundingClientRect(); const about=links[2].getBoundingClientRect(); return {x:project.left+project.width/2,y:project.top+project.height/2,projectRight:project.right,aboutLeft:about.left,navOverflow:getComputedStyle(links[1].parentElement).overflow,backgroundSize:getComputedStyle(links[1]).backgroundSize,backgroundPosition:getComputedStyle(links[1]).backgroundPosition} })()");
  await save("prototype-04-projects-static-detail.png", { clip: { x: 620, y: 15, width: 340, height: 75, scale: 3 }, captureBeyondViewport: true });
  await call("Input.dispatchMouseEvent", { type: "mouseMoved", x: projectsHover.x, y: projectsHover.y });
  await delay(250);
  const hoveredBackground = await evaluate("(() => { const style=getComputedStyle(document.querySelectorAll('nav[aria-label=\"Primary navigation\"] a')[1]); return {size:style.backgroundSize,position:style.backgroundPosition} })()");
  assert.equal(hoveredBackground.size, projectsHover.backgroundSize);
  assert.equal(hoveredBackground.position, projectsHover.backgroundPosition);
  await save("prototype-04-projects-hover.png");
  await save("prototype-04-projects-hover-detail.png", { clip: { x: 620, y: 15, width: 340, height: 75, scale: 3 }, captureBeyondViewport: true });
  console.log("Projects hover geometry:", projectsHover, "hovered background:", hoveredBackground);
  await call("Input.dispatchMouseEvent", { type: "mouseMoved", x: 0, y: 0 });
  await evaluate("document.querySelector('button[aria-label=\"Open visitor profile\"]')?.click()");
  await delay(100);
  const desktopProfile = await evaluate("(() => { const dialog=document.querySelector('[role=dialog]'); const rect=dialog.getBoundingClientRect(); return {left:rect.left,right:rect.right,top:rect.top,textColor:getComputedStyle(dialog.querySelector('h2')).color,bodyColor:getComputedStyle(document.body).color} })()");
  console.log("Desktop profile:", desktopProfile);
  assert.ok(desktopProfile.left <= 30 && desktopProfile.top >= 100);
  assert.equal(desktopProfile.textColor, "rgb(247, 242, 232)");
  await save("prototype-04-profile-desktop.png");
  await evaluate("document.querySelector('button[aria-label=\"Close visitor profile\"]')?.click()");
  await save("prototype-04-desktop-1440x900.png");
  const desktopMetrics = await call("Page.getLayoutMetrics");
  await save("prototype-04-desktop-full.png", { clip: { x: 0, y: 0, width: 1440, height: Math.ceil(desktopMetrics.cssContentSize.height), scale: 1 }, captureBeyondViewport: true });

  await call("Emulation.setDeviceMetricsOverride", { width: 768, height: 900, deviceScaleFactor: 1, mobile: false });
  await delay(400);
  assert.ok(await evaluate("document.documentElement.scrollWidth <= 768"));
  await save("prototype-04-middle-768x900.png");

  await call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await delay(500);
  const mobile = await evaluate("({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,spotlight:!!document.querySelector('h1')})");
  console.log("Mobile:", mobile);
  assert.equal(mobile.viewport, 390);
  assert.ok(mobile.scrollWidth <= 390);
  assert.ok(await evaluate("(() => { const avatar=document.querySelector('button[aria-label=\"Open visitor profile\"]').getBoundingClientRect(); const mute=document.querySelector('button[aria-label^=\"Audio\"]').getBoundingClientRect(); const status=document.querySelector('[class*=headerStatus]').getBoundingClientRect(); const logo=document.querySelector('a[aria-label=\"Breakspider home\"]').getBoundingClientRect(); return avatar.left < mute.left && status.right < logo.left && document.querySelector('header').getBoundingClientRect().height <= 108 })()"));
  assert.ok(await evaluate("getComputedStyle(document.querySelector('button[aria-label^=\"Audio\"] span')).display !== 'none'"));
  const mobileOrder = await evaluate("(() => { const top = (name) => document.querySelector(`[class*=${name}]`)?.getBoundingClientRect().top + scrollY; return ['spotlight','about','projects','current','sketchbook','familiar','changelog','foundMap','pile'].map(top) })()");
  assert.ok(mobileOrder.every((top, index) => index === 0 || top > mobileOrder[index - 1]), `Unexpected mobile reading order: ${mobileOrder}`);
  const missingImages = await evaluate("[...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src)");
  assert.deepEqual(missingImages, []);
  const fileTrack = await evaluate("(() => { const track=[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Shuffle focus'))?.closest('section')?.querySelector('div:last-child'); return track ? {visible:track.clientWidth,total:track.scrollWidth} : null })()");
  assert.ok(fileTrack && fileTrack.total > fileTrack.visible);
  await save("prototype-04-mobile-390x844.png");
  const mobileMetrics = await call("Page.getLayoutMetrics");
  await save("prototype-04-mobile-full.png", { clip: { x: 0, y: 0, width: 390, height: Math.ceil(mobileMetrics.cssContentSize.height), scale: 1 }, captureBeyondViewport: true });

  await evaluate("document.querySelector('button[aria-label=\"Touch the little crystal\"]')?.click()");
  assert.equal(await evaluate("document.querySelector('button[aria-label=\"Put the crystal back\"]') !== null"), true);

  await evaluate("document.querySelector('button[aria-label=\"Open visitor profile\"]')?.click()");
  assert.equal(await evaluate("document.querySelector('[role=dialog] h2')?.textContent"), "Visitor 000");
  assert.ok(await evaluate("(() => { const dialog=document.querySelector('[role=dialog]'); return dialog.getBoundingClientRect().left <= 16 && getComputedStyle(dialog.querySelector('h2')).color === 'rgb(247, 242, 232)' })()"));
  await save("prototype-04-profile-mobile.png");
  await evaluate("document.querySelector('button[aria-label=\"Close visitor profile\"]')?.click()");
  await evaluate("document.querySelector('button[aria-label=\"Show another Familiar\"]')?.click()");
  assert.equal(await evaluate("document.querySelector('button[aria-label=\"Show another Familiar\"] img')?.alt.includes('Pebbloq')"), true);
  await evaluate("document.querySelector('button[aria-label=\"Audio off. Toggle audio\"]')?.click()");
  assert.equal(await evaluate("localStorage.getItem('breakspider-muted')"), "false");
  const stickerNav = await evaluate("[...document.querySelectorAll('nav[aria-label=\"Primary navigation\"] a')].map(link => ({text:link.textContent,visible:link.getBoundingClientRect().width>0,background:getComputedStyle(link).backgroundImage}))");
  assert.deepEqual(stickerNav.map((link) => link.text), ["Home", "Projects", "About"]);
  assert.ok(stickerNav.every((link) => link.visible && link.background.includes("p03-nav-")));
  await evaluate("[...document.querySelectorAll('button')].find(b => b.textContent.includes('found: MAP.EXE'))?.click()");
  assert.equal(await evaluate("document.querySelector('[role=dialog] h2')?.textContent"), "A map of the public rooms");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('[role=dialog] h2')).color"), "rgb(247, 242, 232)");
  await save("prototype-04-mobile-inspection.png");
  await evaluate("document.querySelector('button[aria-label=\"Close inspection\"]')?.click()");
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
  await call("Emulation.setDeviceMetricsOverride", { width: 32, height: 32, deviceScaleFactor: 1, mobile: false });
  await call("Page.navigate", { url: "http://localhost:3000/icon.svg" });
  await delay(400);
  await save("prototype-04-favicon-32.png");
  console.log("Prototype 04 interactions and one-time splash: OK");
} finally {
  socket?.close();
  chrome.kill();
  await delay(300);
  const workspaceRoot = path.resolve(process.cwd());
  const resolvedProfile = path.resolve(profile);
  if (resolvedProfile.startsWith(`${workspaceRoot}${path.sep}`)) await rm(resolvedProfile, { recursive: true, force: true, maxRetries: 5, retryDelay: 150 }).catch(() => {});
}


