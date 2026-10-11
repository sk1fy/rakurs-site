import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import {
  Button,
  CategoryBadge,
  Eyebrow,
  Faq,
  Icon,
  IconBox,
  SectionHead,
  WidgetCard,
} from "./components";
import {
  categories,
  contact,
  instructions,
  legal,
  steps,
  widgets,
} from "./content";
import type { Widget } from "./content";
type Open = { open: (subject?: string) => void };
export function Home({ open }: Open) {
  return (
    <>
      <section className="hero hero-simple">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-tag">
              <i />
              Официальный партнёр amoCRM с 2016 года
            </div>
            <h1>
              amoCRM, которая
              <br />
              работает на <span className="accent">ваш бизнес.</span>
            </h1>
            <p>
              Внедряем CRM, создаём виджеты и автоматизируем продажи. Чтобы
              команда занималась клиентами,
              <br className="desktop-only" /> а вы — развитием бизнеса.
            </p>
            <div className="hero-cta-block">
              <div className="hero-actions">
                <Button onClick={() => open()}>Обсудить задачу</Button>
                <Button to="/widget_amocrm" secondary icon="">
                  Выбрать виджет
                </Button>
              </div>
              <div className="hero-assurance">
                <span>
                  <Icon name="check" size={16} />
                  Отвечаем быстро
                </span>
                <span>
                  <Icon name="check" size={16} />
                  Погружаемся в ваш бизнес
                </span>
                <span>
                  <Icon name="check" size={16} />
                  Остаёмся на связи
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="trust-strip">
        <div className="container trust-grid">
          {[
            { n: "с 2016", t: "развиваем бизнес с amoCRM", i: "shield" },
            { n: "20", t: "виджетов под реальные задачи", i: "grid" },
            { n: "ТОП-20", t: "партнёров amoCRM", i: "trending" },
            { n: "24/7", t: "поддержка для наших клиентов", i: "message" },
          ].map((s) => (
            <div key={s.n} className="trust-item">
              <Icon name={s.i} size={23} />
              <div>
                <strong>{s.n}</strong>
                <span>{s.t}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="section container" id="solutions">
        <SectionHead
          eyebrow="Что мы делаем"
          title={
            <>
              Всё, что нужно для
              <br />
              системных продаж.
            </>
          }
          text="От первого внедрения до собственных инструментов. Подключаемся на любом этапе развития вашей CRM."
        />
        <div className="service-grid">
          {[
            {
              n: "01",
              icon: "layers",
              title: "Внедряем amoCRM",
              text: "Объединяем заявки, сделки и контакты. Настраиваем воронки, интеграции и аналитику. Обучаем команду.",
              tags: ["Внедрение под ключ", "Обучение"],
              link: "/vnedrenie",
              label: "Подробнее о внедрении",
            },
            {
              n: "02",
              icon: "grid",
              title: "Создаём виджеты",
              text: "Добавляем то, чего не хватает вашей CRM. От простых помощников до автоматизации сложных процессов.",
              tags: ["20 готовых решений", "Разработка"],
              link: "/widget_amocrm",
              label: "Перейти в каталог",
            },
            {
              n: "03",
              icon: "gift",
              title: "Даём больше за лицензии",
              text: "Та же стоимость amoCRM — больше возможностей. Поддержка, бонусы и кэшбэк на развитие вашей системы.",
              tags: ["Кэшбэк 20%", "Бонусные месяцы"],
              link: "/bonus",
              label: "Посмотреть преимущества",
            },
          ].map((s) => (
            <Link className="service-card" to={s.link} key={s.n}>
              <div className="card-top">
                <IconBox name={s.icon} />
                <span className="service-number">{s.n}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="service-tags">
                {s.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="card-link">
                {s.label}
                <Icon name="up" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section tinted">
        <div className="container">
          <SectionHead
            eyebrow="Виджеты Ракурс"
            title={
              <>
                Меньше рутины.
                <br />
                Больше возможностей.
              </>
            }
            text="Небольшие инструменты, которые меняют ежедневную работу. Выберите решение под вашу задачу."
            action={
              <Link className="text-link" to="/widget_amocrm">
                Все 20 виджетов <Icon name="arrow" size={18} />
              </Link>
            }
          />
          <div className="featured-widget">
            <div className="featured-copy">
              <div className="featured-label">
                <CategoryBadge category="pro" />
                <span>В фокусе</span>
              </div>
              <h3>
                Знайте, чем занят
                <br />
                ваш отдел продаж.
              </h3>
              <p>
                «Контроль активности» показывает работу команды в реальном
                времени: от первого звонка до выполненной задачи.
              </p>
              <ul className="check-list">
                <li>
                  <Icon name="check" />
                  Активность каждого менеджера
                </li>
                <li>
                  <Icon name="check" />
                  Пропущенные звонки и забытые сделки
                </li>
                <li>
                  <Icon name="check" />
                  Рейтинг и загрузка команды
                </li>
              </ul>
              <Button to="/kontrol-aktivnosti" secondary>
                Познакомиться с виджетом
              </Button>
              <span className="trial-note">
                14 дней бесплатно · Без привязки карты
              </span>
            </div>
            <Link to="/kontrol-aktivnosti" className="featured-image">
              <div className="image-window-bar">
                <span className="live-dot" />
                Контроль активности <span>Онлайн</span>
              </div>
              <img
                src="/assets/activity-hero.jpg"
                alt="Реальная панель Контроль активности: таймлайны работы менеджеров"
                loading="lazy"
              />
              <div className="feature-image-caption">
                <Icon name="activity" size={17} />
                Видеть картину целиком — значит управлять
              </div>
            </Link>
          </div>
          <div className="widget-grid home-widgets">
            {widgets.slice(1, 4).map((w) => (
              <WidgetCard key={w.slug} widget={w} />
            ))}
          </div>
          <Link to="/widget_amocrm#free" className="free-banner">
            <span className="free-banner-icon">
              <Icon name="gift" size={24} />
            </span>
            <span>
              <b>Начните с простого. И бесплатного.</b>
              <span>7 помощников для ежедневной работы в amoCRM</span>
            </span>
            <span className="free-banner-link">
              Бесплатные виджеты <Icon name="arrow" size={18} />
            </span>
          </Link>
        </div>
      </section>
      <section className="section container">
        <SectionHead
          eyebrow="Как мы работаем"
          title={
            <>
              Ваша задача — бизнес.
              <br />
              Наша — работающая CRM.
            </>
          }
          text="Берём технические вопросы на себя. От вас — понимание целей, от нас — система, которая помогает их достигать."
        />
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step" key={s.short}>
              <div className="step-top">
                <span>0{i + 1}</span>
                <div />
                <Icon name={s.icon} size={22} />
              </div>
              <h3>{s.short}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <div className="process-note">
          <Icon name="shield" size={20} />
          <span>
            Фиксируем результат в техническом задании и работаем по договору.
          </span>
          <Link to="/vnedrenie">
            Все этапы <Icon name="arrow" size={17} />
          </Link>
        </div>
      </section>
      <section className="about-section tinted" id="about">
        <div className="container about-grid">
          <div className="founder-portrait">
            <img
              src="/assets/founder.jpg"
              alt="Максим Шумилов, основатель компании Ракурс"
              loading="lazy"
            />
            <div className="founder-label">
              <strong>Максим Шумилов</strong>
              <span>Основатель компании «Ракурс»</span>
            </div>
          </div>
          <div className="about-copy">
            <Eyebrow>Команда за продуктом</Eyebrow>
            <h2>
              Не просто настроить.
              <br />
              <span className="accent">Помочь увидеть больше.</span>
            </h2>
            <p className="about-lead">
              Меняя угол зрения, открываем новые перспективы в управлении
              отделом продаж.
            </p>
            <p>
              С 2016 года помогаем компаниям выстраивать работу в amoCRM. Мы
              сами разрабатываем виджеты и знаем систему изнутри — поэтому можем
              собрать решение именно под ваш бизнес.
            </p>
            <div className="about-facts">
              <div>
                <b>Официальный партнёр</b>
                <span>amoCRM · № 11284009</span>
              </div>
              <div>
                <b>Собственная разработка</b>
                <span>От идеи до поддержки</span>
              </div>
            </div>
            <a
              className="text-link"
              href={contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Познакомиться с командой <Icon name="up" size={18} />
            </a>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="license-banner">
          <div>
            <Eyebrow>Больше пользы от подписки</Eyebrow>
            <h2>
              Продлевайте amoCRM.
              <br />
              Получайте больше.
            </h2>
            <p>
              Та же цена лицензии. Поддержка и бонусы от Ракурс — в дополнение.
            </p>
            <Button to="/bonus" secondary>
              Все бонусы за лицензии
            </Button>
          </div>
          <div className="cashback-visual">
            <span>ВОЗВРАЩАЕМ НА БОНУСНЫЙ СЧЁТ</span>
            <strong>
              20<span>%</span>
            </strong>
            <p>
              на виджеты, услуги
              <br />и ваши новые идеи
            </p>
            <Icon name="gift" size={60} />
          </div>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <Eyebrow>Всё по делу</Eyebrow>
          <h2>
            Возможно, вы
            <br />
            хотели спросить.
          </h2>
          <p>Не нашли ответ? Мы на связи.</p>
          <a
            className="text-link"
            href={contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Задать вопрос <Icon name="up" size={18} />
          </a>
        </div>
        <Faq />
      </section>
    </>
  );
}
export function PageIntro({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro container">
      <Link className="breadcrumb" to="/">
        Главная <Icon name="right" size={13} /> {eyebrow}
      </Link>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
      {children}
    </section>
  );
}
export function Catalog({ open }: Open) {
  const location = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const initialCategory =
    location.hash === "#premium" ? "pro" : location.hash.slice(1);
  const [category, setCategory] = useState(
    categories.some((c) => c.id === initialCategory) ? initialCategory : "all",
  );
  const query = params.get("q") || "";
  useEffect(() => {
    const hash = location.hash === "#premium" ? "pro" : location.hash.slice(1);
    setCategory(categories.some((c) => c.id === hash) ? hash : "all");
  }, [location.hash]);
  const filtered = widgets.filter(
    (w) =>
      (category === "all" || w.category === category) &&
      `${w.name} ${w.short}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageIntro
        eyebrow="Каталог виджетов"
        title={
          <>
            Ваша CRM умеет больше.
            <br />
            <span className="accent">Найдите свой инструмент.</span>
          </>
        }
        text="20 решений для amoCRM: автоматизируйте рутину, управляйте командой и держите данные в порядке."
      />
      <section className="container catalog-section">
        <div className="catalog-toolbar">
          <div
            className="filter-tabs"
            role="group"
            aria-label="Категория виджетов"
          >
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCategory(c.id);
                  navigate(
                    {
                      pathname: location.pathname,
                      search: location.search,
                      hash:
                        c.id === "all"
                          ? ""
                          : "#" + (c.id === "pro" ? "premium" : c.id),
                    },
                    { replace: true },
                  );
                }}
                className={category === c.id ? "active" : ""}
                aria-pressed={category === c.id}
              >
                {c.name}
                <span>
                  {c.id === "all"
                    ? widgets.length
                    : widgets.filter((w) => w.category === c.id).length}
                </span>
              </button>
            ))}
          </div>
          <label className="search-field">
            <Icon name="search" size={18} />
            <input
              aria-label="Поиск виджетов"
              placeholder="Какую задачу решаем?"
              value={query}
              onChange={(e) =>
                navigate(
                  {
                    pathname: location.pathname,
                    search: e.target.value
                      ? "?q=" + encodeURIComponent(e.target.value)
                      : "",
                    hash: location.hash,
                  },
                  { replace: true },
                )
              }
            />
            <button
              type="button"
              className="search-clear"
              disabled={!query}
              aria-hidden={!query}
              onClick={() => setParams({}, { replace: true })}
              aria-label="Очистить поиск"
            >
              <Icon name="close" size={16} />
            </button>
          </label>
        </div>
        <div className="catalog-meta">
          <span aria-live="polite">Найдено: {filtered.length}</span>
          <span>
            <Icon name="shield" size={14} />
            Разработано командой Ракурс
          </span>
        </div>
        <div className="widget-grid">
          {filtered.map((w) => (
            <WidgetCard key={w.slug} widget={w} />
          ))}
        </div>
        {!filtered.length && (
          <div className="empty-state">
            <Icon name="search" size={35} />
            <h3>Пока нет такого виджета</h3>
            <p>Попробуйте другой запрос или расскажите нам о задаче.</p>
            <Button
              onClick={() => {
                setParams({});
                setCategory("all");
                navigate("/widget_amocrm", { replace: true });
              }}
              secondary
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
        <div className="custom-development">
          <IconBox name="workflow" />
          <div>
            <h3>Ваша задача не помещается в готовое решение?</h3>
            <p>
              Разработаем виджет или интеграцию специально для вашего бизнеса.
            </p>
          </div>
          <Button onClick={() => open("Разработка на заказ")} secondary>
            Обсудить разработку
          </Button>
        </div>
        <p className="pricing-note">
          Цены указаны по опубликованным условиям. Срок лицензии и состав
          решения уточняются при подключении. Условия бесплатного пакета могут
          отличаться от отдельных виджетов.
        </p>
      </section>
    </>
  );
}
export function WidgetPage({ widget: w, open }: Open & { widget: Widget }) {
  const isActivity = w.slug === "kontrol-aktivnosti";
  const localInstruction = w.instruction?.startsWith("https://rkrs.ru/");
  return (
    <>
      <section className="container product-hero">
        <div className="product-copy">
          <Link to="/widget_amocrm" className="breadcrumb">
            Виджеты <Icon name="right" size={13} /> {w.name}
          </Link>
          <div className="product-tags">
            <CategoryBadge category={w.category} />
            <span>Виджет для amoCRM</span>
          </div>
          <IconBox name={w.icon} color={w.color} />
          <h1>{w.name}</h1>
          <p>{w.short}</p>
          <div className="product-price">
            {w.category === "free" ? "Бесплатно" : w.price}
          </div>
          {isActivity && (
            <p className="small-note">
              От 5 сотрудников · подключайте только тех, за кем нужно следить
            </p>
          )}
          <div className="hero-actions">
            {w.install ? (
              <Button href={w.install}>Установить в amoCRM</Button>
            ) : (
              <Button onClick={() => open(w.name)}>Уточнить доступность</Button>
            )}
            {w.instruction &&
              (localInstruction ? (
                <Button
                  to={new URL(w.instruction).pathname}
                  secondary
                  icon="file"
                >
                  Инструкция
                </Button>
              ) : (
                <Button href={w.instruction} secondary icon="file">
                  Инструкция
                </Button>
              ))}
          </div>
          {!w.install && (
            <p className="small-note">
              Установка временно недоступна: виджет на модерации. Уточните
              статус у команды.
            </p>
          )}
          <div className="hero-assurance">
            <span>
              <Icon name="check" size={16} />
              {w.category === "free"
                ? "Без абонентской платы"
                : isActivity
                  ? "14 дней бесплатно"
                  : "7 дней бесплатно"}
            </span>
            <span>
              <Icon name="check" size={16} />
              Поможем с настройкой
            </span>
          </div>
        </div>
        {isActivity ? (
          <div className="product-real-shot">
            <div className="image-window-bar">
              <span className="live-dot" />
              Контроль активности
            </div>
            <img
              src="/assets/activity-full.png"
              alt="Реальный интерфейс панели контроля активности amoCRM"
            />
            <a
              href="https://ka.rkrs.ru/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Полный обзор продукта <Icon name="up" size={18} />
            </a>
          </div>
        ) : (
          <div className={`product-illustration ${w.color}`}>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="product-illustration-center">
              <Icon name={w.icon} size={80} />
            </div>
            <div className="product-illustration-label">
              <span className="live-dot" />
              Ракурс + amoCRM
            </div>
            <div className="product-illustration-status">
              <Icon name="check" size={18} />
              Меньше действий. Больше результата.
            </div>
          </div>
        )}
      </section>
      <section className="section tinted">
        <div className="container">
          <SectionHead
            eyebrow="О решении"
            title="Что изменится в вашей работе"
            text={w.description}
          />
          <div className="product-features">
            {Object.entries(w.sections)
              .filter(([k, v]) => k !== "Решение" && v)
              .map(([k, v]) => (
                <div key={k}>
                  <Eyebrow>
                    {k === "Проблема"
                      ? "Знакомая ситуация"
                      : "Что нужно бизнесу"}
                  </Eyebrow>
                  <p>{v}</p>
                </div>
              ))}
            <div className="solution-card">
              <Eyebrow>Решение Ракурс</Eyebrow>
              <p>{w.sections["Решение"] || w.short}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHead
          eyebrow="Быстрый старт"
          title="Три шага до новой возможности"
        />
        <div className="steps-grid three">
          {[
            {
              title: "Установите виджет",
              text: "Перейдите по кнопке установки, выберите свой аккаунт amoCRM и разрешите подключение.",
            },
            {
              title: "Настройте под себя",
              text: "Откройте интеграцию в настройках amoCRM. Следуйте инструкции на странице виджета.",
            },
            {
              title: "Попробуйте в работе",
              text: "Проверьте результат на своих процессах. Если возникнут вопросы — наша поддержка поможет.",
            },
          ].map((s, i) => (
            <div className="step" key={s.title}>
              <div className="step-top">
                <span>0{i + 1}</span>
                <div />
                <Icon name={["grid", "settings", "check"][i]} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        {w.slug === "timeclient" && (
          <div className="process-note">
            <Icon name="help" />
            <span>
              Работает с номерами РФ. Регион определяется по регистрации номера,
              а не текущему местоположению клиента.
            </span>
          </div>
        )}
        {w.slug === "analytic" && (
          <div className="process-note">
            <Icon name="help" />
            <span>
              Полный функционал доступен на тарифах amoCRM «Расширенный» и
              «Профессиональный».
            </span>
          </div>
        )}
      </section>
      <section className="section container compact-top">
        <SectionHead
          eyebrow="Работают вместе"
          title="Дополните свою CRM"
          action={
            <Link to="/widget_amocrm" className="text-link">
              Весь каталог <Icon name="arrow" size={18} />
            </Link>
          }
        />
        <div className="widget-grid">
          {widgets
            .filter((x) => x.slug !== w.slug)
            .slice(0, 3)
            .map((x) => (
              <WidgetCard key={x.slug} widget={x} />
            ))}
        </div>
      </section>
    </>
  );
}
export function Implementation({ open }: Open) {
  return (
    <>
      <section className="container implementation-hero">
        <div>
          <div className="breadcrumb">
            <Link to="/">Главная</Link>
            <Icon name="right" size={13} />
            Внедрение amoCRM
          </div>
          <Eyebrow>Внедрение amoCRM</Eyebrow>
          <h1>
            Порядок в продажах.
            <br />
            <span className="accent">
              Без погружения
              <br />в технические детали.
            </span>
          </h1>
          <p>
            Соберём CRM под ваш бизнес с минимальным участием собственника. От
            анализа процессов до уверенной работы команды.
          </p>
          <Button onClick={() => open("Внедрение amoCRM")}>
            Обсудить внедрение
          </Button>
          <div className="hero-assurance">
            <span>
              <Icon name="check" size={16} />
              Договор с гарантией результата
            </span>
          </div>
        </div>
        <div className="implementation-map">
          <span className="map-label">ВАШИ КАНАЛЫ ПРОДАЖ</span>
          <div className="integration-nodes">
            {["Сайт", "Телефония", "Почта", "Мессенджеры"].map((n, i) => (
              <div key={n}>
                <Icon name={["layout", "phone", "mail", "message"][i]} />
                {n}
              </div>
            ))}
          </div>
          <div className="map-connectors">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="amocrm-node">
            amo<span>CRM</span>
            <small>Всё в одной системе</small>
          </div>
          <div className="map-line" />
          <div className="integration-output">
            <Icon name="users" /> Команда <Icon name="plus" size={13} />
            <Icon name="chart" /> Аналитика <Icon name="plus" size={13} />
            <Icon name="trending" /> Рост
          </div>
        </div>
      </section>
      <section className="section tinted">
        <div className="container">
          <SectionHead
            eyebrow="От задачи до результата"
            title="Четыре этапа. Одна работающая система."
          />
          <div className="implementation-steps">
            {steps.map((s, i) => (
              <article key={s.short}>
                <div className="implementation-step-number">0{i + 1}</div>
                <div>
                  <Eyebrow>{s.short}</Eyebrow>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                <ul className="check-list">
                  {s.items.map((t) => (
                    <li key={t}>
                      <Icon name="check" />
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHead
          eyebrow="Вместе с внедрением"
          title="Хороший старт с дополнительной пользой"
        />
        <div className="benefit-grid">
          {[
            [
              "28 дней",
              "Тестовый период amoCRM",
              "Больше времени, чтобы проверить систему в работе.",
            ],
            [
              "+1 месяц",
              "К выбранному тарифу",
              "Дополнительное время использования amoCRM.",
            ],
            [
              "20%",
              "На бонусный счёт",
              "Можно использовать на наши виджеты и услуги.",
            ],
            [
              "Поддержка",
              "И обучающие материалы",
              "Помощь команде после запуска системы.",
            ],
          ].map(([v, t, d]) => (
            <div className="benefit" key={v}>
              <strong>{v}</strong>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <Eyebrow>Перед стартом</Eyebrow>
          <h2>Ответы на вопросы</h2>
        </div>
        <Faq />
      </section>
    </>
  );
}
export function Bonuses({ open }: Open) {
  const [amount, setAmount] = useState(60000);
  return (
    <>
      <PageIntro
        eyebrow="Лицензии и бонусы"
        title={
          <>
            Та же amoCRM.
            <br />
            <span className="accent">Больше для вашего бизнеса.</span>
          </>
        }
        text="Покупайте и продлевайте лицензии через Ракурс по стоимости amoCRM. Получайте поддержку, бонусы и кэшбэк на развитие системы."
      >
        <Button onClick={() => open("Продление лицензий")}>
          Получить предложение
        </Button>
      </PageIntro>
      <section className="container bonus-calculator">
        <div>
          <Eyebrow>Считаем вашу выгоду</Eyebrow>
          <h2>
            20% возвращаются
            <br />в развитие бизнеса.
          </h2>
          <p>
            Бонусы можно потратить на виджеты, консультации и индивидуальные
            доработки.
          </p>
          <label htmlFor="license-cost">Стоимость лицензий amoCRM, ₽</label>
          <input
            id="license-cost"
            type="number"
            min="0"
            max="10000000"
            step="1000"
            value={amount}
            onChange={(e) =>
              setAmount(
                Math.max(0, Math.min(10000000, Number(e.target.value) || 0)),
              )
            }
          />
          <input
            aria-label="Изменить стоимость лицензий"
            type="range"
            min="10000"
            max="500000"
            step="1000"
            value={Math.max(10000, Math.min(500000, amount))}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className="calculation-result">
          <Icon name="gift" size={36} />
          <span>На ваш бонусный счёт</span>
          <strong aria-live="polite">
            {Math.round(amount * 0.2).toLocaleString("ru-RU")} <small>₽</small>
          </strong>
          <p>20% от {amount.toLocaleString("ru-RU")} ₽</p>
          <span className="calculation-note">
            Бонусы на услуги Ракурс.
            <br />
            Не являются денежной выплатой.
          </span>
        </div>
      </section>
      <section className="section container">
        <SectionHead
          eyebrow="Ваши преимущества"
          title="Лицензия — только начало"
        />
        <div className="benefit-grid">
          {[
            [
              "settings",
              "Индивидуальное предложение",
              "Подберём условия обслуживания и виджеты под задачи вашего бизнеса.",
            ],
            [
              "message",
              "Техподдержка 24/7",
              "Бесплатная поддержка на срок продления и доступ к обучающим материалам.",
            ],
            [
              "gift",
              "Бонусные месяцы",
              "Дополнительный срок лицензии. Условия зависят от вашего продления.",
            ],
            [
              "send",
              "Закрытый Telegram-канал",
              "Новости обновлений, лайфхаки и предложения для клиентов Ракурс.",
            ],
          ].map(([i, t, d]) => (
            <div className="benefit" key={t}>
              <IconBox name={i} />
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <div className="process-note">
          <Icon name="help" />
          <span>
            Баланс бонусного счёта доступен в установленных виджетах Ракурс.
            Уточните итоговое предложение у команды.
          </span>
        </div>
      </section>
      <section className="section tinted">
        <div className="container">
          <SectionHead
            eyebrow="Ещё больше возможностей"
            title="Бонусы от наших партнёров"
            text="Поможем подобрать телефонию и сервисы для работы с клиентами. Актуальные условия проверим при подключении."
          />
          <div className="service-grid">
            {[
              ["Билайн", "Специальные тарифы на связь для клиентов Ракурс."],
              ["DaData", "Подсказки по адресам, компаниям и реквизитам."],
              [
                "OnlinePBX",
                "Телефония с интеграцией в amoCRM и тестовым периодом.",
              ],
            ].map(([t, d]) => (
              <div className="service-card" key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
                <button className="text-link" onClick={() => open(t)}>
                  Узнать условия <Icon name="arrow" size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export function Partners({ open }: Open) {
  return (
    <>
      <PageIntro
        eyebrow="Партнёрская программа"
        title={
          <>
            Ваши клиенты.
            <br />
            Наши инструменты.
            <br />
            <span className="accent">Общий рост.</span>
          </>
        }
        text="Расширяйте возможности своих проектов с виджетами Ракурс. Помогаем интеграторам предлагать больше и зарабатывать на каждом подключении."
      >
        <Button onClick={() => open("Партнёрская программа")}>
          Стать партнёром
        </Button>
      </PageIntro>
      <section className="container partner-stats">
        {[
          ["50%", "от первой продажи"],
          ["40%", "от повторных продаж"],
          ["3 месяца", "виджеты бесплатно для изучения"],
        ].map(([n, d]) => (
          <div key={n}>
            <strong>{n}</strong>
            <span>{d}</span>
          </div>
        ))}
      </section>
      <section className="section tinted">
        <div className="container">
          <SectionHead
            eyebrow="Понятные правила"
            title="Партнёрство, на которое можно опереться"
          />
          <div className="service-grid">
            {[
              [
                "shield",
                "Клиенты остаются вашими",
                "Закрепляем клиента за вами на срок оплаты виджета. Наш отдел продаж с ним не контактирует.",
              ],
              [
                "workflow",
                "Развиваем решения вместе",
                "Обсуждаем доработки под задачи ваших клиентов. Условия зависят от технического задания.",
              ],
              [
                "message",
                "Поддерживаем партнёров",
                "Помогаем разобраться в возможностях и настройках. Технические вопросы решаем в партнёрском чате.",
              ],
            ].map(([i, t, d]) => (
              <div key={t} className="service-card">
                <IconBox name={i} />
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container partner-conditions">
        <div>
          <Eyebrow>Как это работает</Eyebrow>
          <h2>
            От знакомства
            <br />
            до первой продажи.
          </h2>
          <p>По вопросам партнёрства:</p>
          <a className="text-link" href="tel:+79213669042">
            +7 (921) 366-90-42 <Icon name="phone" size={18} />
          </a>
        </div>
        <div>
          {[
            [
              "Регистрируетесь в программе",
              "Напишите команде. Руководитель партнёрского направления предоставит доступ в личный кабинет.",
            ],
            [
              "Изучаете и настраиваете виджеты",
              "На три месяца активируем виджеты в вашем аккаунте. Установку, настройку и поддержку своих клиентов вы ведёте самостоятельно.",
            ],
            [
              "Продаёте и получаете вознаграждение",
              "Оплата проходит через личный кабинет с удержанием вашего вознаграждения. Каждая продажа продлевает доступ к виджету в вашем аккаунте ещё на три месяца.",
            ],
          ].map(([t, d], i) => (
            <article key={t}>
              <span>0{i + 1}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </article>
          ))}
          <div className="small-note">
            Если за 45 дней после установки виджет не продан, клиент считается
            свободным. Подробные условия обсудим при регистрации.
          </div>
        </div>
      </section>
    </>
  );
}
export function Knowledge() {
  const [query, setQuery] = useState("");
  const items = instructions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageIntro
        eyebrow="Блог и база знаний"
        title={
          <>
            Разобраться проще,
            <br />
            <span className="accent">когда есть инструкция.</span>
          </>
        }
        text="Практические руководства по работе с виджетами Ракурс. От первого подключения до настройки под ваши процессы."
      />
      <section className="container knowledge-section">
        <label className="search-field">
          <Icon name="search" size={18} />
          <input
            aria-label="Поиск инструкций"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Найти инструкцию по виджету"
          />
        </label>
        <div className="knowledge-grid">
          {items.map((a, i) => (
            <Link to={"/" + a.slug} key={a.slug} className="knowledge-card">
              <div className={`knowledge-visual v${i % 3}`}>
                <Icon
                  name={
                    [
                      "map",
                      "palette",
                      "layout",
                      "calendar",
                      "activity",
                      "workflow",
                    ][i]
                  }
                  size={62}
                />
                <span>Ракурс / Практика</span>
                <b>0{i + 1}</b>
              </div>
              <div className="knowledge-card-copy">
                <span className="eyebrow">Инструкция</span>
                <h3>{a.title.replace(" от Rakurs", "")}</h3>
                <span className="text-link">
                  Читать руководство <Icon name="up" size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        {items.length === 0 && (
          <div className="empty-state">
            <h3>Инструкция не найдена</h3>
            <p>Измените запрос или обратитесь в поддержку.</p>
          </div>
        )}
        <div className="custom-development">
          <IconBox name="send" />
          <div>
            <h3>Обновления — там, где удобно</h3>
            <p>Новые решения, полезные приёмы и новости команды в Telegram.</p>
          </div>
          <Button href="https://t.me/amocrm_wiget" secondary>
            Перейти в канал
          </Button>
        </div>
      </section>
    </>
  );
}
export function Article({ slug }: { slug: string }) {
  const article = instructions.find((a) => a.slug === slug);
  if (!article) return <NotFound />;
  return (
    <>
      <PageIntro
        eyebrow="База знаний"
        title={article.title.replace(" от Rakurs", "")}
      />
      <div className="container article-layout">
        <aside>
          <Link to="/blog">
            <Icon name="arrow" size={16} /> Все инструкции
          </Link>
          <a href={contact.support} target="_blank" rel="noopener noreferrer">
            Нужна помощь?
            <Icon name="message" size={16} />
          </a>
        </aside>
        <article className="article-body">
          {article.lines
            .filter(
              (l) =>
                l !== "→" &&
                l !== "Виджеты" &&
                l !== "Главная" &&
                l !== "Главная страница" &&
                l !== article.title &&
                !l.includes("Инструкция по настройке") &&
                !l.includes("Инструкция к виджету") &&
                l !== "Бесплатный" &&
                l !== "Топовые",
            )
            .map((l, i) =>
              /^\d+[.)]|^Шаг|^Настройка|^Установка|^Важно|^Как |^Возможности|^Инструкция|^Примечание/.test(
                l,
              ) && l.length < 150 ? (
                <h3 key={i}>{l}</h3>
              ) : (
                <p key={i}>{l}</p>
              ),
            )}
          <a
            className="text-link article-source"
            href={article.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            Оригинал инструкции <Icon name="external" size={16} />
          </a>
        </article>
      </div>
    </>
  );
}
export function LegalPage({ kind }: { kind: "policy" | "oferta" }) {
  const lines = legal[kind];
  const start =
    kind === "oferta"
      ? 12
      : lines.findIndex((l, i) => i > 12 && l.startsWith("1."));
  const cleaned = lines.slice(start >= 0 ? start : 14);
  const end = cleaned.findIndex((l) => l.includes("+7 (921) 437-78-86"));
  const paragraphs = end > 0 ? cleaned.slice(0, end) : cleaned;
  return (
    <>
      <PageIntro
        eyebrow="Документы"
        title={
          kind === "policy" ? "Политика конфиденциальности" : "Договор-оферта"
        }
      />
      <article className="container legal-body">
        {paragraphs.map((l, i) =>
          /^\d+\.\s[^\d]|^[А-Я\s-]{6,}$/.test(l) && l.length < 130 ? (
            <h2 key={i}>{l}</h2>
          ) : (
            <p key={i}>{l}</p>
          ),
        )}
        <a
          className="text-link"
          href={"https://rkrs.ru/" + kind}
          target="_blank"
          rel="noopener noreferrer"
        >
          Документ на действующем сайте <Icon name="external" size={16} />
        </a>
      </article>
    </>
  );
}
export function Support() {
  return (
    <>
      <PageIntro
        eyebrow="Поддержка"
        title={
          <>
            Есть вопрос?
            <br />
            <span className="accent">Мы рядом.</span>
          </>
        }
        text="Поможем с установкой, настройкой и работой виджетов. Укажите ID аккаунта amoCRM и опишите вашу задачу."
      >
        <Button href={contact.support} icon="message">
          Открыть чат поддержки
        </Button>
      </PageIntro>
      <section className="section container faq-section">
        <div>
          <Eyebrow>Частые вопросы</Eyebrow>
          <h2>
            Ответ может
            <br />
            быть уже здесь.
          </h2>
        </div>
        <Faq all />
      </section>
    </>
  );
}
export function NotFound() {
  return (
    <section className="container not-found">
      <Eyebrow>404 · Другой ракурс</Eyebrow>
      <h1>
        Этой страницы
        <br />
        здесь нет.
      </h1>
      <p>Но есть решения, которые вы искали.</p>
      <Button to="/">На главную</Button>
      <Button to="/widget_amocrm" secondary>
        Каталог виджетов
      </Button>
    </section>
  );
}
