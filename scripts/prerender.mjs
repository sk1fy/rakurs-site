import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const server = await import(path.join(ssrDir, "entry-server.js"));
const template = readFileSync(path.join(dist, "index.html"), "utf8");
const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function pageHtml(route) {
  const { html, meta, jsonLd } = server.render(route);
  const url = meta.url + (route === "/" ? "/" : "");
  const title = `${meta.title} · ${server.siteName}`;
  const tags = [
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta name="robots" content="${meta.robots}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${server.siteName}" />`,
    `<meta property="og:locale" content="ru_RU" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:image" content="${server.siteUrl}/assets/activity-hero.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json" data-page-seo>${server.serializeJsonLd(jsonLd)}</script>`,
  ];
  if (route === "/kontrol-aktivnosti") {
    return readFileSync(path.join(dist, "activity-control.html"), "utf8")
      .replace(/<link rel="canonical"[^>]*>/, "")
      .replace("</head>", () => tags.join("\n") + "\n</head>");
  }
  return template
    .replace(/<title>.*?<\/title>/, () => `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/>/,
      () =>
        `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    )
    .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`)
    .replace("</head>", () => tags.join("\n    ") + "\n  </head>");
}

for (const route of server.prerenderRoutes) {
  const file = path.join(
    dist,
    route === "/" ? "index.html" : route.slice(1) + "/index.html",
  );
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, pageHtml(route));
}
writeFileSync(path.join(dist, "404.html"), pageHtml("/404"));
const urls = server.prerenderRoutes
  .filter((route) => !server.pageMeta(route).robots.includes("noindex"))
  .map(
    (route) =>
      `  <url><loc>${server.siteUrl}${route === "/" ? "/" : route}</loc></url>`,
  )
  .join("\n");
writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
rmSync(ssrDir, { recursive: true, force: true });
console.log(
  `Prerendered ${server.prerenderRoutes.length} pages + 404.html, wrote sitemap.xml`,
);
