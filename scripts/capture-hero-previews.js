/* eslint-disable no-console */
/**
 * Optional helper for creating real WowWish hero preview screenshots.
 *
 * 1. Run the site locally: npm run dev
 * 2. Install Playwright if needed: npm install -D playwright
 * 3. Run: node scripts/capture-hero-previews.js
 *
 * This writes mobile screenshots to /public/hero-previews/.
 * You can later switch the hero preview data in WowWishV2Experience.tsx
 * from /images/*.png to these generated files, or replace them with .webm videos.
 */

const fs = require("fs");
const path = require("path");

async function main() {
  let chromium;

  try {
    ({ chromium } = require("playwright"));
  } catch (error) {
    console.error("Playwright is not installed. Run: npm install -D playwright");
    process.exitCode = 1;
    return;
  }

  const outputDir = path.join(process.cwd(), "public", "hero-previews");
  fs.mkdirSync(outputDir, { recursive: true });

  const previews = [
    {
      url: "http://localhost:3000/birthday",
      fileName: "birthday-pop-preview.png",
    },
    {
      url: "http://localhost:3000/proposal-cute",
      fileName: "proposal-cute-preview.png",
    },
    {
      url: "http://localhost:3000/anniversary-elegant",
      fileName: "anniversary-preview.png",
    },
  ];

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });

  for (const preview of previews) {
    console.log(`Capturing ${preview.url}`);
    await page.goto(preview.url, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(outputDir, preview.fileName),
      fullPage: false,
    });
  }

  await browser.close();
  console.log(`Saved hero previews to ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
