import {
  pageMeta,
  pageJsonLd,
  serializeJsonLd,
  siteName,
  siteUrl,
} from "./seo";

export function updatePageHead(pathname: string, doc: Document = document) {
  const meta = pageMeta(pathname);
  const url = meta.url + (meta.url === siteUrl ? "/" : "");
  doc.title = `${meta.title} · ${siteName}`;
  const setMeta = (
    attribute: "name" | "property",
    key: string,
    value: string,
  ) => {
    let element = doc.head.querySelector<HTMLMetaElement>(
      `meta[${attribute}="${key}"]`,
    );
    if (!element) {
      element = doc.createElement("meta");
      element.setAttribute(attribute, key);
      doc.head.appendChild(element);
    }
    element.content = value;
  };
  setMeta("name", "description", meta.description);
  setMeta("name", "robots", meta.robots);
  setMeta("name", "twitter:card", "summary_large_image");
  for (const [key, value] of Object.entries({
    type: "website",
    site_name: siteName,
    locale: "ru_RU",
    title: doc.title,
    description: meta.description,
    url,
    image: siteUrl + "/assets/activity-hero.jpg",
  }))
    setMeta("property", "og:" + key, value);
  let canonical = doc.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!canonical) {
    canonical = doc.createElement("link");
    canonical.rel = "canonical";
    doc.head.appendChild(canonical);
  }
  canonical.href = url;
  let schema = doc.head.querySelector<HTMLScriptElement>(
    "script[data-page-seo]",
  );
  if (!schema) {
    schema = doc.createElement("script");
    schema.type = "application/ld+json";
    schema.setAttribute("data-page-seo", "");
    doc.head.appendChild(schema);
  }
  schema.textContent = serializeJsonLd(pageJsonLd(pathname));
}
