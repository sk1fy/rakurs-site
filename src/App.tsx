import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { Button, ContactBanner, ContactModal, Icon, Logo } from "./components";
import { contact, instructions, widgets } from "./content";
import {
  Article,
  Bonuses,
  Catalog,
  Home,
  Implementation,
  Knowledge,
  LegalPage,
  NotFound,
  Partners,
  Support,
  WidgetPage,
} from "./pages";
function PageEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles: Record<string, string> = {
      "/": "amoCRM с вашего ракурса",
      "/widget_amocrm": "Виджеты для amoCRM",
      "/vnedrenie": "Внедрение amoCRM",
      "/bonus": "Лицензии, бонусы и кэшбэк",
      "/partner": "Партнёрская программа",
      "/blog": "Блог и база знаний",
      "/policy": "Политика конфиденциальности",
      "/oferta": "Договор-оферта",
      "/support": "Поддержка",
      "/faq": "Ответы на вопросы",
    };
    const w = widgets.find((w) => "/" + w.slug === pathname);
    const article = instructions.find((a) => "/" + a.slug === pathname);
    document.title =
      (titles[pathname] || w?.name || article?.title || "Страница не найдена") +
      " · Ракурс";
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      "content",
      w?.short ||
        "Внедрение amoCRM, виджеты и автоматизация продаж. Ракурс — официальный партнёр amoCRM с 2016 года.",
    );
  }, [pathname]);
  return null;
}
const nav = [
  ["/vnedrenie", "Внедрение"],
  ["/widget_amocrm", "Виджеты"],
  ["/bonus", "Лицензии и бонусы"],
  ["/partner", "Партнёрам"],
  ["/blog", "Блог"],
];
const widgetMenuItems = [
  {
    to: "/widget_amocrm#free",
    name: "Бесплатные виджеты",
    description: "Помощники для ежедневной работы",
    icon: "gift",
    color: "free",
  },
  {
    to: "/widget_amocrm#top",
    name: "ТОП-виджеты",
    description: "Готовые инструменты автоматизации",
    icon: "layers",
    color: "top",
  },
  {
    to: "/widget_amocrm#premium",
    name: "ПРО-виджеты",
    description: "Премиум-решения для вашей CRM",
    icon: "sparkles",
    color: "pro",
  },
];
function WidgetsNavigation() {
  const [expanded, setExpanded] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const pointerType = useRef("mouse");
  const location = useLocation();
  useEffect(() => setExpanded(false), [location]);
  useEffect(() => {
    if (!expanded) return;
    const dismiss = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setExpanded(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [expanded]);
  return (
    <div
      ref={root}
      className={`widget-nav ${expanded ? "is-expanded" : ""}`}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setExpanded(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setExpanded(false);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setExpanded(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && expanded) {
          e.preventDefault();
          e.stopPropagation();
          setExpanded(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="widget-nav-heading">
        <NavLink
          to="/widget_amocrm"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Виджеты
        </NavLink>
        <button
          ref={toggle}
          type="button"
          aria-label="Типы виджетов"
          aria-expanded={expanded}
          aria-controls="widget-navigation-options"
          onPointerDown={(e) => {
            pointerType.current = e.pointerType;
          }}
          onClick={(e) =>
            setExpanded((v) =>
              e.detail === 0 || pointerType.current === "touch" ? !v : true,
            )
          }
        >
          <Icon name="down" size={14} />
        </button>
      </div>
      <div
        id="widget-navigation-options"
        className="widget-nav-panel"
        hidden={!expanded}
      >
        <div className="widget-nav-surface">
          {widgetMenuItems.map((item) => (
            <Link
              to={item.to}
              key={item.to}
              className={`widget-nav-option ${item.color}`}
            >
              <span className="widget-nav-icon">
                <Icon name={item.icon} size={20} />
              </span>
              <span>
                <strong>{item.name}</strong>
                <small>{item.description}</small>
              </span>
              <Icon name="right" size={15} />
            </Link>
          ))}
          <Link className="widget-nav-all" to="/widget_amocrm">
            Все 20 виджетов <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Header({ open }: { open: () => void }) {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  useEffect(() => setMenu(false), [location]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Logo />
        <nav
          className={menu ? "main-nav is-open" : "main-nav"}
          aria-label="Основная навигация"
          id="main-navigation"
        >
          {nav.map(([to, label]) =>
            to === "/widget_amocrm" ? (
              <WidgetsNavigation key={to} />
            ) : (
              <NavLink
                to={to}
                key={to}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {label}
              </NavLink>
            ),
          )}
          <a
            href={contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-contact"
          >
            Написать в Telegram <Icon name="send" size={16} />
          </a>
        </nav>
        <div className="nav-actions">
          <Button onClick={open} icon="up">
            Обсудить проект
          </Button>
          <button
            className="mobile-menu-button"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menu}
            aria-controls="main-navigation"
          >
            <Icon name={menu ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              Виджеты и решения для amoCRM.
              <br />
              Меняя угол зрения,
              <br />
              открываем новые возможности.
            </p>
            <div className="footer-socials">
              <a
                href={contact.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ракурс в Telegram"
              >
                <Icon name="send" size={18} />
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ракурс в WhatsApp"
              >
                <Icon name="message" size={18} />
              </a>
              <a
                href={"mailto:" + contact.email}
                aria-label="Написать Ракурс по электронной почте"
              >
                <Icon name="mail" size={18} />
              </a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Решения</h4>
            <Link to="/vnedrenie">Внедрение amoCRM</Link>
            <Link to="/widget_amocrm">Виджеты для amoCRM</Link>
            <Link to="/bonus">Лицензии и бонусы</Link>
            <Link to="/widget_amocrm#free">Бесплатные виджеты</Link>
          </div>
          <div className="footer-links">
            <h4>Компания</h4>
            <Link to="/partner">Партнёрам</Link>
            <Link to="/blog">Блог и база знаний</Link>
            <Link to="/support">Техническая поддержка</Link>
            <Link to="/faq">Частые вопросы</Link>
          </div>
          <div className="footer-links footer-contacts">
            <h4>На связи</h4>
            <a href="tel:+79214377886" className="footer-phone">
              {contact.phone}
            </a>
            <a href={"mailto:" + contact.email}>{contact.email}</a>
            <p>
              Санкт-Петербург
              <br />
              Бухарестская ул., 32, офис 5-37
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <span>© {new Date().getFullYear()} Ракурс</span>
            <span>
              ИП Шумилов Максим Львович · ИНН 371501428560 · ОГРНИП
              316370200076776
            </span>
          </div>
          <div>
            <Link to="/policy">Конфиденциальность</Link>
            <Link to="/oferta">Оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
function DetailRouter({ open }: { open: (s?: string) => void }) {
  const { slug } = useParams();
  const w = widgets.find((w) => w.slug === slug);
  if (w) return <WidgetPage widget={w} open={open} />;
  if (instructions.some((a) => a.slug === slug))
    return <Article slug={slug!} />;
  return <NotFound />;
}
export default function App() {
  const [modal, setModal] = useState(false);
  const [subject, setSubject] = useState("");
  const open = (s = "") => {
    setSubject(s);
    setModal(true);
  };
  const { pathname } = useLocation();
  return (
    <>
      <PageEffects />
      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>
      <Header open={() => open()} />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home open={open} />} />
          <Route path="/widget_amocrm" element={<Catalog open={open} />} />
          <Route path="/vnedrenie" element={<Implementation open={open} />} />
          <Route path="/bonus" element={<Bonuses open={open} />} />
          <Route path="/cashback" element={<Navigate to="/bonus" replace />} />
          <Route path="/partner_bonus" element={<Bonuses open={open} />} />
          <Route path="/partner" element={<Partners open={open} />} />
          <Route path="/blog" element={<Knowledge />} />
          <Route path="/policy" element={<LegalPage kind="policy" />} />
          <Route path="/oferta" element={<LegalPage kind="oferta" />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faq" element={<Support />} />
          <Route
            path="/activity_control"
            element={<Navigate to="/kontrol-aktivnosti" replace />}
          />
          <Route
            path="/top"
            element={<Navigate to="/widget_amocrm#top" replace />}
          />
          <Route
            path="/rakurs-free-pack"
            element={<Navigate to="/widget_amocrm#free" replace />}
          />
          <Route path="/:slug" element={<DetailRouter open={open} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!["/policy", "/oferta"].includes(pathname) && (
          <ContactBanner open={() => open()} />
        )}
      </main>
      <Footer />
      <ContactModal
        open={modal}
        onClose={() => setModal(false)}
        subject={subject}
      />
    </>
  );
}
