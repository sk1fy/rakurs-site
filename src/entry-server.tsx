import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { pageMeta, pageJsonLd } from "./seo";
export {
  prerenderRoutes,
  siteName,
  siteUrl,
  legacyRedirects,
  serializeJsonLd,
  pageMeta,
  pageJsonLd,
} from "./seo";
export { updatePageHead } from "./page-head";

export function render(pathname: string) {
  return {
    html: renderToString(
      <MemoryRouter initialEntries={[pathname]}>
        <App />
      </MemoryRouter>,
    ),
    meta: pageMeta(pathname),
    jsonLd: pageJsonLd(pathname),
  };
}
