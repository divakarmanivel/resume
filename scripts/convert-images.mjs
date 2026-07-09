/**
 * Convert PNG/JPEG assets to WebP for smaller static payloads.
 * Run: npm run images:webp
 */
import sharp from 'sharp';
import { access, readdir } from 'node:fs/promises';
import { basename, dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const assetsDir = join(projectRoot, 'assets');
const QUALITY = 88;
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg']);

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function displayPath(absPath) {
  return relative(projectRoot, absPath).replace(/\\/g, '/');
}

function webpDestFor(srcPath) {
  const base = basename(srcPath, extname(srcPath));
  return join(dirname(srcPath), `${base}.webp`);
}

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listImages(fullPath)));
      continue;
    }
    if (!entry.isFile()) continue;
    const ext = extname(entry.name).toLowerCase();
    if (!IMAGE_EXT.has(ext)) continue;
    files.push(fullPath);
  }

  return files;
}

async function convertOne(srcPath) {
  const dest = webpDestFor(srcPath);
  await sharp(srcPath).webp({ quality: QUALITY }).toFile(dest);
  const srcStat = await sharp(srcPath).metadata();
  const destStat = await sharp(dest).metadata();
  console.log(
    `  ${displayPath(srcPath)} → ${displayPath(dest)} (${srcStat.width}×${srcStat.height})`,
  );
  return { width: destStat.width, height: destStat.height };
}

if (!(await pathExists(assetsDir))) {
  console.error('assets/ directory not found');
  process.exit(1);
}

const images = await listImages(assetsDir);
console.log(`Converting ${images.length} image(s) to WebP…\n`);

for (const src of images) {
  await convertOne(src);
}

console.log('\nDone.');
