import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Copy,
  Database,
  FileText,
  Gift,
  GraduationCap,
  Grid2X2,
  LayoutDashboard,
  Layers3,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  TextCursorInput,
  TrendingUp,
  Users,
  Workflow,
  X,
  Palette,
  ExternalLink,
} from "lucide-react";
import { contact, faq } from "./content";
import type { Widget } from "./content";
const icons = {
  activity: Activity,
  arrow: ArrowRight,
  up: ArrowUpRight,
  chart: BarChart3,
  bell: Bell,
  calendar: CalendarDays,
  check: Check,
  down: ChevronDown,
  right: ChevronRight,
  help: CircleHelp,
  clock: Clock3,
  copy: Copy,
  database: Database,
  file: FileText,
  gift: Gift,
  graduation: GraduationCap,
  grid: Grid2X2,
  layout: LayoutDashboard,
  layers: Layers3,
  mail: Mail,
  map: MapPin,
  menu: Menu,
  message: MessageCircle,
  more: MoreHorizontal,
  phone: Phone,
  plus: Plus,
  search: Search,
  send: Send,
  settings: Settings2,
  shield: ShieldCheck,
  sparkles: Sparkles,
  text: TextCursorInput,
  trending: TrendingUp,
  users: Users,
  workflow: Workflow,
  close: X,
  palette: Palette,
  external: ExternalLink,
};
export function Icon({
  name,
  size = 20,
  ...props
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const C = icons[name as keyof typeof icons] || Layers3;
  return <C size={size} strokeWidth={1.7} aria-hidden="true" {...props} />;
}
export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Ракурс — на главную">
      <svg viewBox="0 0 79 79" fill="none" aria-hidden="true">
        <rect
          x="13"
          y="41"
          width="13"
          height="22"
          rx="3"
          fill="#fff"
          opacity=".35"
        />
        <rect
          x="33"
          y="31"
          width="13"
          height="32"
          rx="3"
          fill="#fff"
          opacity=".65"
        />
        <rect x="53" y="13" width="13" height="50" rx="3" fill="#5cc4bf" />
      </svg>
      <span>Ракурс</span>
    </Link>
  );
}
export function Button({
  children,
  onClick,
  to,
  href,
  secondary = false,
  className = "",
  icon = "arrow",
}: {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
  href?: string;
  secondary?: boolean;
  className?: string;
  icon?: string;
}) {
  const cls = `btn ${secondary ? "btn-secondary" : "btn-primary"} ${className}`;
  const body = (
    <>
      {children}
      {icon && <Icon name={icon} size={18} />}
    </>
  );
  return to ? (
    <Link to={to} className={cls}>
      {body}
    </Link>
  ) : href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <button onClick={onClick} className={cls}>
      {body}
    </button>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}
export function SectionHead({
  eyebrow,
  title,
  text,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  );
}
export function IconBox({
  name,
  color = "teal",
}: {
  name: string;
  color?: string;
}) {
  return (
    <span className={`icon-box ${color}`}>
      <Icon name={name} size={24} />
    </span>
  );
}
export function CategoryBadge({ category }: { category: string }) {
  const badges: Record<
    string,
    { label: string; icon: string; description: string }
  > = {
    free: {
      label: "Бесплатно",
      icon: "gift",
      description: "Бесплатный виджет для amoCRM",
    },
    top: {
      label: "ТОП-виджет",
      icon: "layers",
      description:
        "Можно купить отдельно или получить при оплате лицензий amoCRM — уточните условия",
    },
    pro: {
      label: "ПРО-виджет",
      icon: "sparkles",
      description: "Премиум-решение Ракурс для amoCRM",
    },
  };
  const badge = badges[category] || badges.free;
  return (
    <span
      className={`tag category-badge ${category}`}
      title={badge.description}
    >
      <Icon name={badge.icon} size={14} />
      {badge.label}
    </span>
  );
}

export function WidgetCard({ widget: w }: { widget: Widget }) {
  return (
    <Link to={"/" + w.slug} className="widget-card">
      <div className="card-top">
        <IconBox name={w.icon} color={w.color} />
        <CategoryBadge category={w.category} />
      </div>
      <h3>{w.name}</h3>
      <p>{w.short}</p>
      <div className="widget-card-bottom">
        <span>
          {w.category === "free"
            ? "Бесплатно"
            : w.slug === "kontrol-aktivnosti"
              ? "6 000 ₽ / сотрудник в год"
              : w.price}
        </span>
        <Icon name="up" size={21} />
      </div>
    </Link>
  );
}
export function Faq({ all = false }: { all?: boolean }) {
  return (
    <div className="faq-list">
      {faq.slice(0, all ? 5 : 4).map((item, i) => (
        <details key={item.q}>
          <summary>
            <span className="faq-num">0{i + 1}</span>
            {item.q}
            <Icon name="plus" />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
export function ContactBanner({ open }: { open: () => void }) {
  return (
    <section className="contact-banner container">
      <div className="contact-banner-inner">
        <div>
          <Eyebrow>Начнём с вашей задачи</Eyebrow>
          <h2>
            Посмотрим на ваш бизнес
            <br />
            <span className="accent">с нового ракурса.</span>
          </h2>
          <p>Расскажите, что хотите улучшить. Мы предложим решение.</p>
        </div>
        <div className="contact-banner-actions">
          <Button onClick={open}>Обсудить проект</Button>
          <a href={contact.telegram} target="_blank" rel="noopener noreferrer">
            <Icon name="send" size={16} /> Или напишите в Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
const contactTopics = [
  {
    value: "Внедрение amoCRM",
    icon: "layers",
    description: "Настроить CRM под процессы компании",
  },
  {
    value: "Подбор виджетов",
    icon: "grid",
    description: "Найти готовое решение для вашей задачи",
  },
  {
    value: "Продление лицензий",
    icon: "gift",
    description: "Продлить amoCRM и получить бонусы",
  },
  {
    value: "Разработка на заказ",
    icon: "workflow",
    description: "Создать индивидуальный виджет или интеграцию",
  },
  {
    value: "Партнёрская программа",
    icon: "users",
    description: "Подключиться к программе для интеграторов",
  },
];
function TopicSelect({
  value,
  onChange,
  subject,
}: {
  value: string;
  onChange: (value: string) => void;
  subject: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const options = [
    ...contactTopics,
    ...(!contactTopics.some((t) => t.value === subject) && subject
      ? [
          {
            value: subject,
            icon: "message",
            description: "Обсудить с командой Ракурс",
          },
        ]
      : []),
  ];
  const selected = options.find((t) => t.value === value) || options[0];
  function show() {
    setActive(
      Math.max(
        0,
        options.findIndex((t) => t.value === value),
      ),
    );
    setExpanded(true);
  }
  function choose(index: number) {
    onChange(options[index].value);
    setExpanded(false);
    trigger.current?.focus();
  }
  useEffect(() => {
    if (!expanded) return;
    const dismiss = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setExpanded(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [expanded]);
  useEffect(() => {
    if (expanded)
      list.current?.children[active]?.scrollIntoView({
        block: "nearest",
        behavior: "instant",
      });
  }, [expanded, active]);
  return (
    <div
      className="topic-select"
      ref={root}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setExpanded(false);
      }}
    >
      <button
        type="button"
        id="topic"
        ref={trigger}
        className="topic-trigger"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={expanded}
        aria-controls="topic-options"
        aria-activedescendant={expanded ? `topic-option-${active}` : undefined}
        aria-label="Меня интересует"
        onClick={() => (expanded ? setExpanded(false) : show())}
        onKeyDown={(e) => {
          if (e.key === "Escape" && expanded) {
            e.preventDefault();
            e.stopPropagation();
            setExpanded(false);
          } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!expanded) show();
            else
              setActive(
                (i) =>
                  (i + (e.key === "ArrowDown" ? 1 : options.length - 1)) %
                  options.length,
              );
          } else if (expanded && (e.key === "Home" || e.key === "End")) {
            e.preventDefault();
            setActive(e.key === "Home" ? 0 : options.length - 1);
          } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            expanded ? choose(active) : show();
          } else if (e.key === "Tab") setExpanded(false);
        }}
      >
        <span className="topic-icon">
          <Icon name={selected.icon} size={18} />
        </span>
        <span>{selected.value}</span>
        <Icon name="down" size={18} />
      </button>
      {expanded && (
        <div
          id="topic-options"
          className="topic-options"
          role="listbox"
          aria-label="Направление проекта"
          ref={list}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              id={`topic-option-${index}`}
              role="option"
              aria-selected={option.value === value}
              tabIndex={-1}
              className={`topic-option ${index === active ? "is-active" : ""}`}
              onPointerMove={() => setActive(index)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(index)}
            >
              <span className="topic-icon">
                <Icon name={option.icon} size={18} />
              </span>
              <span>
                <strong>{option.value}</strong>
                <small>{option.description}</small>
              </span>
              {option.value === value && <Icon name="check" size={17} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ContactModal({
  open,
  onClose,
  subject,
}: {
  open: boolean;
  onClose: () => void;
  subject: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [topic, setTopic] = useState("Внедрение amoCRM");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (open) {
      setTopic(subject || "Внедрение amoCRM");
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, subject]);
  return (
    <dialog
      ref={dialog}
      className="contact-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) {
          const rect = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
          )
            onClose();
        }
      }}
      aria-labelledby="contact-title"
    >
      <button
        className="dialog-close"
        onClick={onClose}
        aria-label="Закрыть окно"
      >
        <Icon name="close" />
      </button>
      <IconBox name="message" />
      <Eyebrow>Давайте знакомиться</Eyebrow>
      <h2 id="contact-title">Какую задачу решаем?</h2>
      <p>
        Выберите направление и расскажите немного о проекте. Продолжим общение в
        удобном мессенджере.
      </p>
      <label htmlFor="topic">Меня интересует</label>
      <TopicSelect
        key={String(open)}
        value={topic}
        onChange={setTopic}
        subject={subject}
      />
      <label htmlFor="message">
        Пара слов о задаче <span>необязательно</span>
      </label>
      <textarea
        id="message"
        rows={3}
        value={message}
        placeholder="Например: хотим собрать заявки из всех каналов в одну CRM"
        onChange={(e) => setMessage(e.target.value)}
        maxLength={1500}
      />
      <Button
        href={`${contact.whatsapp}?text=${encodeURIComponent("Здравствуйте! Меня интересует: " + topic + ". " + message)}`}
        icon="message"
      >
        Продолжить в WhatsApp
      </Button>
      <a
        className="dialog-telegram"
        href={contact.telegram}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="send" size={18} /> Написать в Telegram{" "}
        <Icon name="up" size={16} />
      </a>
      <p className="dialog-note">
        Кнопка откроет мессенджер с черновиком. Сообщение отправляете вы.
      </p>
      <div className="dialog-phone">
        <span>Или позвоните нам</span>
        <a href="tel:+79214377886">{contact.phone}</a>
      </div>
    </dialog>
  );
}
