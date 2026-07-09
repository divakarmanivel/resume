/**
 * Download brand SVG icons from thesvg.org into assets/icons/
 * Run: npm run icons:fetch
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'assets', 'icons');

const ICONS = [
  { slug: 'typescript' },
  { slug: 'react' },
  { slug: 'vite' },
  { slug: 'tailwind-css' },
  { slug: 'nodejs' },
  { slug: 'dotnet' },
  { slug: 'postgresql' },
  { slug: 'microsoft-sql-server' },
  { slug: 'azure' },
  { slug: 'stripe' },
  { slug: 'docker' },
  { slug: 'git' },
  { slug: 'cursor' },
  { slug: 'claude' },
  { slug: 'github', variant: 'dark' },
  { slug: 'linkedin' },
];

await mkdir(outDir, { recursive: true });

for (const icon of ICONS) {
  const variant = icon.variant || 'default';
  const url = `https://thesvg.org/icons/${icon.slug}/${variant}.svg`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`Skip ${icon.slug}: HTTP ${res.status}`);
    continue;
  }
  const svg = await res.text();
  const file = icon.file || `${icon.slug}.svg`;
  await writeFile(join(outDir, file), svg);
  console.log(`  ${icon.slug} → assets/icons/${file}`);
}

console.log('Done.');
