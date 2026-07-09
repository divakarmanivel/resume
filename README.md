# Divakar Manivel — Portfolio

Personal portfolio site hosted at [www.divakarmanivel.com](https://www.divakarmanivel.com).

## Development

```bash
npm install
npm run build:assets   # WebP images + favicons
```

### Scripts

| Script | Description |
|--------|-------------|
| `npm run images:webp` | Convert PNG/JPEG in `assets/` to WebP |
| `npm run generate:favicon` | Generate favicon assets from `assets/profile-pic.jpg` |
| `npm run icons:fetch` | Download skill/social SVGs from [theSVG](https://thesvg.org/) |
| `npm run build:assets` | Run favicon generation and WebP conversion |

## Deployment

Static GitHub Pages site. Deploy the project root (HTML, `css/`, `js/`, `assets/`, favicon files, `robots.txt`, `sitemap.xml`).

After changing images, run `npm run build:assets` before deploying.

## SEO

- Canonical URL, Open Graph, and Twitter Card meta tags
- `robots.txt` and `sitemap.xml`
- JSON-LD `Person` structured data
- WebP images with `<picture>` fallbacks, lazy loading, and explicit dimensions
