import { contact, faq, instructions, widgets } from "./content";

export const siteUrl = "https://rkrs.ru";
export const siteName = "Ракурс";

export type PageMeta = {
  title: string;
  description: string;
  url: string;
  robots: string;
};

const defaultDescription =
  "Внедрение amoCRM, виджеты и автоматизация продаж. Ракурс — официальный партнёр amoCRM с 2016 года.";

const staticMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "amoCRM с вашего ракурса",
    description: defaultDescription,
  },
  "/widget_amocrm": {
    title: "Виджеты для amoCRM",
    description: `Каталог ${widgets.length} виджетов для amoCRM: контроль активности, автоматизация продаж, интеграции с Telegram, WhatsApp и Google. Тестовый период от 7 дней.`,
  },
  "/vnedrenie": {
    title: "Внедрение amoCRM",
    description:
      "Внедрение amoCRM под процессы вашего бизнеса: анализ, настройка воронок, интеграции и обучение команды. Официальный партнёр amoCRM с 2016 года.",
  },
  "/bonus": {
    title: "Лицензии amoCRM, бонусы и кэшбэк",
    description:
      "Покупайте лицензии amoCRM по обычной цене и получайте 20% на бонусный счёт. Бонусы — на оплату виджетов, услуг и доработок Ракурс.",
  },
  "/partner": {
    title: "Партнёрская программа",
    description:
      "Партнёрская программа Ракурс для агентств и фрилансеров: комиссия за внедрения и виджеты amoCRM, техническая поддержка и материалы.",
  },
  "/blog": {
    title: "Блог и база знаний",
    description:
      "Инструкции по виджетам amoCRM от Ракурс: установка, настройка и ответы на частые вопросы.",
  },
  "/policy": {
    title: "Политика конфиденциальности",
    description: "Политика конфиденциальности сервиса Ракурс.",
  },
  "/oferta": {
    title: "Договор-оферта",
    description: "Договор-оферта сервиса Ракурс.",
  },
  "/support": {
    title: "Поддержка",
    description:
      "Техническая поддержка виджетов и внедрений amoCRM от Ракурс. Напишите в чат — ответим по рабочим дням.",
  },
  "/faq": {
    title: "Ответы на вопросы",
    description:
      "Частые вопросы о внедрении amoCRM, тестировании и покупке виджетов, бонусной программе и поддержке Ракурс.",
  },
};

function clamp(text: string, max = 180) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const dot = cut.lastIndexOf(". ");
  return (dot > 80 ? cut.slice(0, dot + 1) : cut.trimEnd()) + "…";
}

export function pageMeta(pathname: string): PageMeta {
  pathname = normalizePath(pathname);
  const base = {
    url: siteUrl + (pathname === "/" ? "" : pathname),
    robots: ["/policy", "/oferta"].includes(pathname)
      ? "noindex, follow"
      : "index, follow",
  };
  const s = staticMeta[pathname];
  if (s) return { ...s, ...base };
  const w = widgets.find((x) => "/" + x.slug === pathname);
  if (w)
    return {
      title: `${w.name} — виджет для amoCRM`,
      description: clamp(w.description),
      ...base,
    };
  const a = instructions.find((x) => "/" + x.slug === pathname);
  if (a)
    return {
      title: a.title,
      description: clamp(
        a.lines.filter((l) => !l.startsWith("«") && l.length > 40)[0] ||
          a.lines.join(" "),
      ),
      ...base,
    };
  return {
    title: "Страница не найдена",
    description: defaultDescription,
    ...base,
    robots: "noindex, follow",
  };
}

export const prerenderRoutes = [
  "/",
  "/widget_amocrm",
  "/vnedrenie",
  "/bonus",
  "/partner",
  "/blog",
  "/policy",
  "/oferta",
  "/support",
  "/faq",
  ...widgets.map((w) => "/" + w.slug),
  ...instructions.map((a) => "/" + a.slug),
];

export const legacyRedirects: Record<string, string> = {
  "/cashback": "/bonus",
  "/partner_bonus": "/bonus",
  "/activity_control": "/kontrol-aktivnosti",
  "/top": "/widget_amocrm#top",
  "/rakurs-free-pack": "/widget_amocrm#free",
};

export function normalizePath(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return (legacyRedirects[path] || path).split("#")[0];
}

export function pageJsonLd(pathname: string): Record<string, unknown>[] {
  pathname = normalizePath(pathname);
  if (!prerenderRoutes.includes(pathname)) return [];
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": siteUrl + "/#organization",
    name: siteName,
    url: siteUrl,
    logo: siteUrl + "/favicon.svg",
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Санкт-Петербург",
      streetAddress: "Бухарестская ул., 32, офис 5-37",
      addressCountry: "RU",
    },
  };
  const data: Record<string, unknown>[] = [organization];
  if (pathname === "/") {
    data.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": siteUrl + "/#website",
      name: siteName,
      url: siteUrl + "/",
      publisher: { "@id": organization["@id"] },
      potentialAction: {
        "@type": "SearchAction",
        target: siteUrl + "/widget_amocrm?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    });
  } else if (pathname === "/faq") {
    data.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  } else {
    const w = widgets.find((item) => "/" + item.slug === pathname);
    if (w) {
      const amount =
        w.category === "free"
          ? "0"
          : w.price.match(/[\d][\d\s]*/)?.[0].replace(/\s/g, "");
      data.push({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: w.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: w.description,
        url: siteUrl + pathname,
        ...(amount
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: "RUB",
                price: amount,
                description: w.price,
              },
            }
          : {}),
      });
    }
  }
  return data;
}

export function serializeJsonLd(data: Record<string, unknown>[]) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
