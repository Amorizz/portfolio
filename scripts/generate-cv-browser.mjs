#!/usr/bin/env node

import { mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

async function waitForServer(url, timeoutMs = 90000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Timed out waiting for server at ${url}`);
}

function startDevServer(port) {
  const command =
    process.platform === 'win32'
      ? `npm run dev -- --port ${port}`
      : `npm run dev -- --port ${port}`;
  const child = spawn(command, [], {
    cwd: ROOT,
    stdio: 'pipe',
    shell: true,
  });

  child.stdout.on('data', (d) => {
    const line = String(d).trim();
    if (line) console.log(`[dev] ${line}`);
  });
  child.stderr.on('data', (d) => {
    const line = String(d).trim();
    if (line) console.log(`[dev] ${line}`);
  });

  return child;
}

async function generateOnePdf(browser, lang, baseUrl, outputDir) {
  const page = await browser.newPage();
  await page.emulateMedia({ media: 'print' });
  await page.goto(`${baseUrl}/cv-print/${lang}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#cv-content', { timeout: 20000 });
  await page.waitForTimeout(1200);

  const outPath = resolve(outputDir, `cv-${lang}.pdf`);
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
    preferCSSPageSize: true,
    pageRanges: '1',
  });

  await page.close();
  console.log(`  PDF generated: ${outPath}`);
}

async function main() {
  const args = process.argv.slice(2);
  const requestedLang = args[0];
  const langs = requestedLang ? [requestedLang] : ['en', 'fr'];
  const invalid = langs.find((l) => l !== 'en' && l !== 'fr');
  if (invalid) {
    throw new Error(`Invalid language "${invalid}". Use "en" or "fr".`);
  }

  const outputDir = resolve(ROOT, 'public', 'cv');
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

  const port = 4173;
  const baseUrl = `http://127.0.0.1:${port}`;
  let devServer;

  try {
    console.log(`Starting local app on ${baseUrl}...`);
    devServer = startDevServer(port);
    await waitForServer(`${baseUrl}/cv-print/en`);

    const { chromium } = await import('playwright');
    const browser = await chromium.launch({ headless: true });
    try {
      for (const lang of langs) {
        console.log(`\n--- Generating ${lang.toUpperCase()} CV (browser render) ---`);
        await generateOnePdf(browser, lang, baseUrl, outputDir);
      }
    } finally {
      await browser.close();
    }
  } finally {
    if (devServer && !devServer.killed) {
      devServer.kill('SIGTERM');
    }
  }

  console.log('\nDone!');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
