import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  render,
  pageMeta,
  pageJsonLd,
  prerenderRoutes,
  legacyRedirects,
  updatePageHead,
  serializeJsonLd,
} from "../dist-ssr/entry-server.js";

test("all routes contain their own content, metadata and schema", () => {
  assert.equal(prerenderRoutes.length, 36);
  const titles = new Set();
  for (const route of prerenderRoutes) {
    const file = route === "/" ? "dist/index.html" : `dist${route}/index.html`;
    const html = readFileSync(file, "utf8");
    assert.match(html, /<h1[\s>]/, route);
    assert.match(html, /<main[^>]*id="main"/);
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title), route);
    titles.add(title);
    for (const key of ["description", "robots", "twitter:card"]) {
      assert.equal(
        html.split(`name="${key}"`).length - 1,
        1,
        route + ": " + key,
      );
    }
    for (const key of [
      "type",
      "title",
      "description",
      "url",
      "image",
      "site_name",
      "locale",
    ]) {
      assert.equal(
        html.split(`property="og:${key}"`).length - 1,
        1,
        route + ": og:" + key,
      );
    }
    const schema = JSON.parse(
      html.match(
        /<script type="application\/ld\+json" data-page-seo>(.*?)<\/script>/s,
      )[1],
    );
    assert.deepEqual(schema, pageJsonLd(route));
    assert.equal(schema[0]["@type"], "Organization");
    assert.equal(
      pageMeta(route + (route === "/" ? "" : "/")).title,
      pageMeta(route).title,
    );
    assert.ok(
      html.includes(`href="${pageMeta(route).url}${route === "/" ? "/" : ""}"`),
    );
  }
  assert.equal(pageJsonLd("/faq")[1].mainEntity.length, 5);
  assert.equal(pageJsonLd("/timeclient")[1].offers.price, "0");
  assert.equal(pageJsonLd("/kontrol-aktivnosti")[1].offers.price, "6000");
  assert.ok(!serializeJsonLd([{ text: "</script>" }]).includes("</script>"));
});

test("sitemap excludes noindex and unknown routes; old URLs redirect before fallback", () => {
  const sitemap = readFileSync("dist/sitemap.xml", "utf8");
  assert.equal((sitemap.match(/<loc>/g) || []).length, 34);
  assert.ok(!sitemap.includes("/policy") && !sitemap.includes("/oferta"));
  const notFound = readFileSync("dist/404.html", "utf8");
  assert.match(notFound, /name="robots" content="noindex, follow"/);
  assert.equal(pageMeta("/unknown").robots, "noindex, follow");
  const redirects = readFileSync("dist/_redirects", "utf8");
  assert.ok(!redirects.includes("/*"));
  for (const [from, to] of Object.entries(legacyRedirects))
    assert.ok(redirects.includes(`${from} ${to} 301`));
});

// A minimal DOM surface lets us exercise the same head writer used by React.
function documentStub() {
  const elements = [];
  return {
    title: "",
    head: {
      appendChild(element) {
        elements.push(element);
      },
      querySelector(selector) {
        const [, tag, key, value] = selector.match(
          /^(\w+)\[([^=\]]+)(?:="([^"]*)")?\]$/,
        );
        return (
          elements.find(
            (e) =>
              e.tag === tag &&
              (value === undefined ? key in e.attrs : e.attrs[key] === value),
          ) || null
        );
      },
    },
    createElement(tag) {
      return {
        tag,
        attrs: {},
        setAttribute(key, value) {
          this.attrs[key] = value;
        },
        set rel(value) {
          this.attrs.rel = value;
        },
        set type(value) {
          this.attrs.type = value;
        },
      };
    },
    elements,
  };
}

test("client transitions replace robots and schema and create missing head tags", () => {
  const doc = documentStub();
  for (const route of [
    "/policy",
    "/vnedrenie/",
    "/faq",
    "/kontrol-aktivnosti",
    "/unknown",
    "/",
  ]) {
    updatePageHead(route, doc);
    assert.equal(doc.title, pageMeta(route).title + " · Ракурс");
    assert.equal(
      doc.head.querySelector('meta[name="robots"]').content,
      pageMeta(route).robots,
    );
    assert.deepEqual(
      JSON.parse(doc.head.querySelector("script[data-page-seo]").textContent),
      pageJsonLd(route),
    );
  }
  assert.equal(
    doc.head.querySelector('link[rel="canonical"]').href,
    "https://rkrs.ru/",
  );
  assert.equal(doc.elements.filter((e) => e.attrs.name === "robots").length, 1);
});
