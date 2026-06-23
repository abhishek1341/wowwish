/**
 * Generates 1200x630 OG images (PNG) from the WowWish logo + occasion label.
 * Run: node scripts/generate-og-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const logoCandidates = [
  path.join(root, "public", "images", "wowwish-logo.png"),
  path.join(root, "public", "favicon_io", "apple-touch-icon.png"),
];
const outDir = path.join(root, "public", "og");

function resolveLogoPath() {
  for (const candidate of logoCandidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(`Logo not found. Tried:\n${logoCandidates.join("\n")}`);
}

const cards = [
  { file: "default.png", label: "Personalized wish pages" },
  { file: "proposal.png", label: "Proposal wish pages" },
  { file: "proposal-luxury.png", label: "Luxury proposal pages" },
  { file: "proposal-cute.png", label: "Cute proposal pages" },
  { file: "anniversary.png", label: "Anniversary wish pages" },
  { file: "anniversary-cute.png", label: "Cute anniversary pages" },
  { file: "anniversary-elegant.png", label: "Elegant anniversary pages" },
  { file: "birthday.png", label: "Birthday wish pages" },
  { file: "birthday-bestie.png", label: "Birthday bestie pages" },
  { file: "birthday-yaari.png", label: "Birthday yaari pages" },
  { file: "mukesh-sonal-30th-anniversary.png", label: "30th anniversary" },
];

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function backgroundSvg(label) {
  const safeLabel = escapeXml(label);
  return Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9F4"/>
      <stop offset="45%" stop-color="#FFE8DC"/>
      <stop offset="100%" stop-color="#F6D4C8"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="55%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="600" y="560" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="42" font-weight="600" fill="#7A3E35">${safeLabel}</text>
  <text x="600" y="610" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600" letter-spacing="6" fill="#B4534B">WOWWISH</text>
</svg>`);
}

async function generateCard(logoPath, { file, label }) {
  const logo = await sharp(logoPath)
    .resize(420, 420, { fit: "inside", withoutEnlargement: true })
    .png()
    .toBuffer();

  const logoMeta = await sharp(logo).metadata();
  const logoWidth = logoMeta.width ?? 420;
  const logoHeight = logoMeta.height ?? 420;
  const left = Math.round((1200 - logoWidth) / 2);
  const top = Math.round(150 - logoHeight / 2);

  const outputPath = path.join(outDir, file);

  await sharp(backgroundSvg(label))
    .composite([{ input: logo, left, top }])
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true })
    .toFile(outputPath);

  const { size } = fs.statSync(outputPath);
  console.log(`${file} — ${Math.round(size / 1024)} KB`);
}

async function main() {
  const logoPath = resolveLogoPath();
  console.log(`Using logo: ${path.relative(root, logoPath)}`);

  fs.mkdirSync(outDir, { recursive: true });

  for (const card of cards) {
    await generateCard(logoPath, card);
  }

  console.log(`\nGenerated ${cards.length} OG images in public/og/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
