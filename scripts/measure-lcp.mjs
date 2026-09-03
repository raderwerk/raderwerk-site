import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseUrl = process.argv[2] ?? 'http://127.0.0.1:4321/raderwerk-site';
const routes = ['/', '/werkwijze/', '/diensten/', '/cases/', '/transparantie/', '/contact/', '/cases/kantelbeer/', '/cases/spoorlinde/', '/cases/zoutkaap/', '/cases/raderwerk/'];
const browser = await chromium.launch({ headless: true });
const results = {};

for (const route of routes) {
  const context = await browser.newContext({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 150,
    downloadThroughput: 180_000,
    uploadThroughput: 180_000,
    connectionType: 'cellular3g',
  });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => {
    globalThis.__lcp = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) globalThis.__lcp = entry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1_000);
  results[route] = Math.round(await page.evaluate(() => globalThis.__lcp));
  await context.close();
}

const evidence = {
  measuredAt: new Date().toISOString(),
  browser: `Chromium ${browser.version()}`,
  unit: 'ms',
  threshold: 2500,
  profile: { viewport: '360x800', deviceScaleFactor: 2, cpuSlowdownMultiplier: 4, latencyMs: 150, downloadBitsPerSecond: 1_440_000 },
  command: `npm run measure:lcp -- ${baseUrl}`,
  results,
};
await browser.close();
await mkdir('evidence', { recursive: true });
await writeFile('evidence/lcp-mobile.json', `${JSON.stringify(evidence, null, 2)}\n`);
console.log(`Recorded ${routes.length} routes in evidence/lcp-mobile.json; maximum LCP ${Math.max(...Object.values(results))} ms.`);
