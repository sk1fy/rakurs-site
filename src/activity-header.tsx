import { useState } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { Footer, Header } from "./App";
import { ContactModal } from "./components";
import styles from "./styles.css?inline";

// Keep the site's shared navigation isolated from the original landing styles.
const host = document.getElementById("site-header-root")!;
const subject = host.dataset.subject || "Контроль активности";
const pathname = window.location.pathname;
host.style.cssText = "display:block;position:sticky;top:0;z-index:100";
const shadow = host.attachShadow({ mode: "open" });
const style = document.createElement("style");
style.textContent = styles.replace(/:root/g, ":host");
shadow.append(style);
const mount = document.createElement("div");
shadow.append(mount);
shadow.addEventListener(
  "click",
  (event) => {
    const mouse = event as MouseEvent;
    if (
      mouse.button ||
      mouse.metaKey ||
      mouse.ctrlKey ||
      mouse.shiftKey ||
      mouse.altKey
    )
      return;
    const anchor = event
      .composedPath()
      .find((el) => el instanceof HTMLAnchorElement) as
      HTMLAnchorElement | undefined;
    if (!anchor || anchor.target || anchor.origin !== window.location.origin)
      return;
    event.preventDefault();
    event.stopPropagation();
    window.location.assign(anchor.href);
  },
  { capture: true },
);

function LandingHeader() {
  const [open, setOpen] = useState(false);
  return (
    <MemoryRouter initialEntries={[pathname]}>
      <Header open={() => setOpen(true)} />
      <ContactModal
        open={open}
        onClose={() => setOpen(false)}
        subject={subject}
      />
    </MemoryRouter>
  );
}
createRoot(mount).render(<LandingHeader />);

const footerHost = document.getElementById("site-footer-root");
if (footerHost) {
  const footerShadow = footerHost.attachShadow({ mode: "open" });
  footerShadow.append(style.cloneNode(true));
  const footerMount = document.createElement("div");
  footerShadow.append(footerMount);
  footerShadow.addEventListener(
    "click",
    (event) => {
      const mouse = event as MouseEvent;
      if (
        mouse.button ||
        mouse.metaKey ||
        mouse.ctrlKey ||
        mouse.shiftKey ||
        mouse.altKey
      )
        return;
      const anchor = event
        .composedPath()
        .find((el) => el instanceof HTMLAnchorElement) as
        HTMLAnchorElement | undefined;
      if (!anchor || anchor.target || anchor.origin !== window.location.origin)
        return;
      event.preventDefault();
      event.stopPropagation();
      window.location.assign(anchor.href);
    },
    { capture: true },
  );
  createRoot(footerMount).render(
    <MemoryRouter initialEntries={[pathname]}>
      <Footer />
    </MemoryRouter>,
  );
}
