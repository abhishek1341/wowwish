/* eslint-disable no-console */
/**
 * Capture clean mobile hero preview videos from local WowWish demo pages.
 *
 * Usage:
 * 1. Start the app: npm run dev
 * 2. If Playwright is missing:
 *    npm install -D playwright
 *    npx playwright install chromium
 * 3. Run: npm run capture:hero-videos
 *
 * Output:
 * - public/hero-previews/birthday-bestie-preview.webm
 * - public/hero-previews/proposal-cute-preview.webm
 * - matching preview/poster PNG files
 *
 * Optional ffmpeg compression:
 * ffmpeg -i public/hero-previews/birthday-bestie-preview.webm -c:v libvpx-vp9 -b:v 900k -an public/hero-previews/birthday-bestie-preview.optimized.webm
 *
 * Recommended target: each video under 1.5 MB, 540px-780px wide, no audio, 5-7 seconds.
 */

const fs = require("fs");
const os = require("os");
const path = require("path");

const BASE_URL = process.env.WOWWISH_CAPTURE_BASE_URL || "http://localhost:3000";
const VIEWPORT = { width: 390, height: 844 };
const SCROLL_DURATION_MS = Number(process.env.WOWWISH_CAPTURE_SCROLL_MS || 9500);
const SCROLL_TARGET_RATIO = Number(process.env.WOWWISH_CAPTURE_SCROLL_TARGET || 0.62);
const INTRO_WAIT_MS = 1000;
const OUTRO_WAIT_MS = 500;
const ASSET_WAIT_MS = 3500;

const previews = [
  {
    route: "/birthday-bestie",
    videoName: "birthday-bestie-preview.webm",
    previewName: "birthday-bestie-preview.png",
    posterName: "birthday-bestie-poster.png",
  },
  {
    route: "/proposal-cute",
    videoName: "proposal-cute-preview.webm",
    previewName: "proposal-cute-preview.png",
    posterName: "proposal-cute-poster.png",
  },
];

async function loadPlaywright() {
  try {
    return require("playwright");
  } catch {
    console.error("Playwright is not installed.");
    console.error("Run: npm install -D playwright");
    console.error("Then: npx playwright install chromium");
    process.exitCode = 1;
    return null;
  }
}

async function waitForAssets(page) {
  await page.waitForLoadState("domcontentloaded", { timeout: 15000 });
  await page.waitForLoadState("networkidle", { timeout: ASSET_WAIT_MS }).catch(() => {
    console.log("Network did not become idle quickly; continuing capture.");
  });

  await page
    .evaluate(async ({ timeoutMs }) => {
      const timeout = new Promise((resolve) => window.setTimeout(resolve, timeoutMs));
      const assetsReady = (async () => {
    if ("fonts" in document) {
      await document.fonts.ready;
    }

        await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            }),
            ),
        );
      })();

      await Promise.race([assetsReady, timeout]);
    }, { timeoutMs: ASSET_WAIT_MS })
    .catch(() => {
      console.log("Asset wait timed out; continuing capture.");
    });
}

async function scrollPage(page) {
  await page.evaluate(
    async ({ duration, targetRatio }) => {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const target = maxScroll * targetRatio;
      const start = window.scrollY;
      const startedAt = performance.now();

      await new Promise((resolve) => {
        function step(now) {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          window.scrollTo(0, start + (target - start) * eased);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        }

        requestAnimationFrame(step);
      });
    },
    { duration: SCROLL_DURATION_MS, targetRatio: SCROLL_TARGET_RATIO },
  );
}

async function capturePreview(browser, outputDir, preview) {
  const tempVideoDir = fs.mkdtempSync(path.join(os.tmpdir(), "wowwish-hero-video-"));
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    recordVideo: {
      dir: tempVideoDir,
      size: VIEWPORT,
    },
  });

  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  const url = `${BASE_URL}${preview.route}`;
  console.log(`Capturing ${url}`);

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
    await waitForAssets(page);
    console.log(`Loaded ${url}; saving poster and preview PNG.`);

    await page.screenshot({
      path: path.join(outputDir, preview.previewName),
      fullPage: false,
    });
    await page.screenshot({
      path: path.join(outputDir, preview.posterName),
      fullPage: false,
    });

    await page.waitForTimeout(INTRO_WAIT_MS);
    console.log(`Recording scroll for ${url}.`);
    await scrollPage(page);
    await page.waitForTimeout(OUTRO_WAIT_MS);

    const video = page.video();
    console.log(`Finalizing video for ${url}.`);
    await page.close();
    await context.close();

    if (!video) {
      throw new Error(`No video was recorded for ${url}`);
    }

    const outputPath = path.join(outputDir, preview.videoName);
    await video.saveAs(outputPath);
    await video.delete().catch(() => {});
    fs.rmSync(tempVideoDir, { recursive: true, force: true });
    console.log(`Saved ${outputPath}`);
  } catch (error) {
    await page.close().catch(() => {});
    await context.close().catch(() => {});
    fs.rmSync(tempVideoDir, { recursive: true, force: true });
    throw error;
  }
}

async function main() {
  const playwright = await loadPlaywright();
  if (!playwright) return;

  const outputDir = path.join(process.cwd(), "public", "hero-previews");
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await playwright.chromium.launch();
  try {
    for (const preview of previews) {
      await capturePreview(browser, outputDir, preview);
    }
  } finally {
    await browser.close();
  }

  console.log(`Done. Files saved to ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
