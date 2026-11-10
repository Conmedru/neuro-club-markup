/*
 * Общая оболочка макетов клуба — каркас ai.neurology-club.ru (31.10: макет клиента поверх шапки-дуги C2):
 * белая строка — цветной логотип, разделы, «Войти» / «Регистрация»; синее полотно с точками — девиз
 * и крупный поиск (главная) или только поиск, снизу дуга; слева полоса значков с выезжающими панелями,
 * которая заходит на дугу; при прокрутке — узкая белая полоса. На синем — «нейронный след» от курсора.
 * Пользователь должен видеть один сайт: клуб и ai. Источник правды — components/layout/header.tsx,
 * icon-rail.tsx, neuro-trail.tsx портала.
 * Страница задаёт:
 *   <body data-page="experts" data-crumbs="Эксперты клуба" data-user="1">
 *   <div id="page"> … содержимое … </div>
 * В вёрстке на Битриксе это шаблон сайта (header.php / footer.php) и меню.
 * Прежняя «бумажная» оболочка — assets/shell-paper.js (для сравнения).
 */
(function () {
  const AI = "https://ai.neurology-club.ru";
  const page = document.body.dataset.page || "";
  const crumbs = (document.body.dataset.crumbs || "").split("|").filter(Boolean);
  const loggedIn = document.body.dataset.user === "1";
  const home = page === "home";
  const IC = {"Главная": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\"/><path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/></svg>", "Навигация по нозологиям": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11 2v2\"/><path d=\"M5 2v2\"/><path d=\"M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1\"/><path d=\"M8 15a6 6 0 0 0 12 0v-3\"/><circle cx=\"20\" cy=\"10\" r=\"2\"/></svg>", "Клинразборы": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 3h20\"></path><path d=\"M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3\"></path><path d=\"m7 21 5-5 5 5\"></path></svg>", "Статьи клуба": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4\"></path><path d=\"M2 6h4\"></path><path d=\"M2 10h4\"></path><path d=\"M2 14h4\"></path><path d=\"M2 18h4\"></path><path d=\"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z\"></path></svg>", "Шпаргалки и инфографика": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 5h8\"></path><path d=\"M13 12h8\"></path><path d=\"M13 19h8\"></path><path d=\"m3 17 2 2 4-4\"></path><path d=\"m3 7 2 2 4-4\"></path></svg>", "Синдромология": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\"></path><path d=\"m8 13 4-7 4 7\"></path><path d=\"M9.1 11h5.7\"></path></svg>", "Гайдлайны": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\"></path><path d=\"M14 2v5a1 1 0 0 0 1 1h5\"></path><path d=\"M10 9H8\"></path><path d=\"M16 13H8\"></path><path d=\"M16 17H8\"></path></svg>", "Шкалы и калькуляторы": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"16\" height=\"20\" x=\"4\" y=\"2\" rx=\"2\"></rect><line x1=\"8\" x2=\"16\" y1=\"6\" y2=\"6\"></line><line x1=\"16\" x2=\"16\" y1=\"14\" y2=\"18\"></line><path d=\"M16 10h.01\"></path><path d=\"M12 10h.01\"></path><path d=\"M8 10h.01\"></path><path d=\"M12 14h.01\"></path><path d=\"M8 14h.01\"></path><path d=\"M12 18h.01\"></path><path d=\"M8 18h.01\"></path></svg>", "Статьи из журналов": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 7v14\"></path><path d=\"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z\"></path></svg>", "Исследования": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2\"></path><path d=\"M6.453 15h11.094\"></path><path d=\"M8.5 2h7\"></path></svg>", "Клинические случаи": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"8\" height=\"4\" x=\"8\" y=\"2\" rx=\"1\" ry=\"1\"></rect><path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\"></path><path d=\"M12 11h4\"></path><path d=\"M12 16h4\"></path><path d=\"M8 11h.01\"></path><path d=\"M8 16h.01\"></path></svg>", "Новости": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 18h-5\"></path><path d=\"M18 14h-8\"></path><path d=\"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2\"></path><rect width=\"8\" height=\"4\" x=\"10\" y=\"6\" rx=\"1\"></rect></svg>", "Мнения экспертов": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"></path><path d=\"M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1\"></path></svg>", "Видео": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5\"></path><rect x=\"2\" y=\"6\" width=\"14\" height=\"12\" rx=\"2\"></rect></svg>", "Лекции клуба": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z\"></path><circle cx=\"12\" cy=\"12\" r=\"10\"></circle></svg>", "События": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 2v4\"></path><path d=\"M16 2v4\"></path><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"></rect><path d=\"M3 10h18\"></path><path d=\"M8 14h.01\"></path><path d=\"M12 14h.01\"></path><path d=\"M16 14h.01\"></path><path d=\"M8 18h.01\"></path><path d=\"M12 18h.01\"></path><path d=\"M16 18h.01\"></path></svg>", "Журналы-партнёры": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m16 6 4 14\"></path><path d=\"M12 6v14\"></path><path d=\"M8 8v12\"></path><path d=\"M4 4v16\"></path></svg>", "Эксперты клуба": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"></path><path d=\"M16 3.128a4 4 0 0 1 0 7.744\"></path><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"></path><circle cx=\"9\" cy=\"7\" r=\"4\"></circle></svg>", "Новости клуба": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z\"></path><path d=\"M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14\"></path><path d=\"M8 6v8\"></path></svg>", "О клубе": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M12 16v-4\"></path><path d=\"M12 8h.01\"></path></svg>", "Образовательные программы": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z\"/><path d=\"M22 10v6\"/><path d=\"M6 12.5V16a6 3 0 0 0 12 0v-3.5\"/></svg>", "Вестник неврологии": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\"/><path d=\"M8 7h6\"/><path d=\"M8 11h8\"/></svg>", "Пациентам": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/></svg>", "_menu": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 7h16M4 12h16M4 17h16\"/></svg>", "_search": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m20 20-3.5-3.5\"/></svg>", "_user": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21a8 8 0 0 1 16 0\"/></svg>", "_login": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m10 17 5-5-5-5\"/><path d=\"M15 12H3\"/><path d=\"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4\"/></svg>", "_close": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg>", "_collapse": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M9 3v18\"/><path d=\"m16 15-3-3 3-3\"/></svg>", "_expand": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M9 3v18\"/><path d=\"m14 9 3 3-3 3\"/></svg>", "_arrow": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12h14\"/><path d=\"m12 5 7 7-7 7\"/></svg>", "_ext": "<svg class=\"ic\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/></svg>"};
  const ic = (k) => IC[k] || "";

  // Одно меню для клуба и ai (navigation.html, ТЗ п. 5) — то же, что lib/site-menu.ts на ai.
  // [ключ страницы, название, адрес, ai?] — пункты ai открывают ai.neurology-club.ru.
  const MENU = [
    [null, [["home", "Главная", "index.html"], ["", "Навигация по нозологиям", "/navigation", true, "nos"]]],
    ["Клиническая практика", [
      ["klin", "Клинразборы", "klinrazbors.html"],
      ["articles", "Статьи клуба", "articles.html"],
      ["cheats", "Шпаргалки и инфографика", "cheatsheets.html"],
      ["synd", "Синдромология", "sindromology.html"],
      ["", "Гайдлайны", "/docs", true],
      ["", "Шкалы и калькуляторы", "/tools", true],
    ]],
    ["Мировая неврология", [
      ["", "Статьи из журналов", "/section/journal-articles", true],
      ["", "Исследования", "/section/journal-articles?type=research", true],
      ["", "Клинические случаи", "/section/journal-articles?type=case", true],
      ["", "Новости", "/section/news", true],
      ["", "Мнения экспертов", "/section/expert-opinions", true],
    ]],
    ["Смотреть", [["video", "Видео", "video.html"]]],
    ["Учиться", [
      ["programs", "Образовательные программы", "programs.html"],
      ["vestnik", "Вестник неврологии", "vestnik.html"],
      ["", "События", "/events", true],
      ["medlib", "Журналы-партнёры", "medlibrary.html"],
    ]],
    ["Клуб", [
      ["experts", "Эксперты клуба", "experts.html"],
      ["news", "Новости клуба", "news.html"],
      ["about", "О клубе", "about.html"],
    ]],
  ];

  // Разделы в белой строке шапки — те же, что на ai (components/layout/header.tsx); хвост прячется на узких экранах
  const SECTIONS = [
    ["", "Журналы", "/section/journal-articles", true],
    ["", "Новости", "/section/news", true],
    ["", "Мнения экспертов", "/section/expert-opinions", true],
    ["video", "Видео", "video.html"],
    ["klin", "Клинразборы", "klinrazbors.html"],
    ["", "Гайдлайны", "/docs", true],
    ["", "Шкалы", "/tools", true],
    ["", "События", "/events", true],
  ];

  const href = (h, isAi) => (isAi ? AI + h : h);
  const railItem = ([key, name, h, isAi, cls]) =>
    `<a class="ax-ri${key && key === page ? " on" : ""}${cls ? " ax-ri-" + cls : ""}" href="${href(h, isAi)}" title="${name}">${ic(name)}<span>${name}</span></a>`;

  const rail = `
    <aside class="ax-rail" aria-label="Меню сайта">
      <nav>
        ${MENU.map(([title, items]) => `<div class="ax-grp">${title ? `<div class="ax-grp-t">${title}</div>` : ""}${items.map(railItem).join("")}</div>`).join("")}
        <div class="ax-grp ax-apart">${railItem(["patients", "Пациентам", "patients.html"])}</div>
      </nav>
      <div class="ax-rail-acc">
        ${loggedIn
          ? `<a class="ax-ri" href="profile.html">${ic("_user")}<span>Анна Иванова</span></a>`
          : `<a class="ax-rail-reg" href="register.html">${ic("_user")}<span>Регистрация в клубе</span></a>`}
      </div>
    </aside>`;

  const userBox = loggedIn
    ? `<a class="ax-user" href="profile.html"><span class="ax-av">АИ</span><span>Анна</span></a>`
    : `<a class="ax-login" href="login.html">${ic("_login")}<span>Войти</span></a><a class="ax-reg" href="register.html">Регистрация</a>`;
  const userBoxM = loggedIn
    ? `<a class="ax-av ax-av-m" href="profile.html" aria-label="Личный кабинет">АИ</a>`
    : `<a class="ax-icbtn" href="login.html" aria-label="Войти">${ic("_user")}</a>`;
  const burger = `<button type="button" class="ax-icbtn ax-burger" data-open-menu aria-label="Меню">${ic("_menu")}</button>`;
  const search = (long) => `<button type="button" class="ax-search" data-open-search aria-label="Поиск по клубу и ai-порталу">${ic("_search")}<span class="ax-s-long">${long}</span><span class="ax-s-short">${home ? "Препарат, нозология, шкала" : "Поиск"}</span><kbd>⌘K</kbd></button>`;
  const secLink = ([key, name, h, isAi]) => `<a${key && key === page ? ' class="on"' : ""} href="${href(h, isAi)}">${name}</a>`;

  // Шапка: белая строка (логотип · разделы · вход) → синее полотно (девиз и поиск) с дугой снизу.
  const header = `
    <header class="ax-hd">
      <div class="ax-top">
        <a class="ax-logo" href="index.html" aria-label="Клуб неврологов — на главную"><img src="assets/club-logo.png" alt="Клуб неврологов" width="923" height="325"></a>
        <nav class="ax-nav" aria-label="Основные разделы">${SECTIONS.map(secLink).join("")}</nav>
        <div class="ax-acts ax-acts-d">${userBox}</div>
        <div class="ax-acts ax-acts-m">${userBoxM}${burger}</div>
      </div>
      <div class="ax-band${home ? " home" : ""}">
        <canvas class="ax-trail" aria-hidden="true"></canvas>
        <div class="ax-band-in">
          ${home
            ? `<p class="ax-motto">Мировая неврология — <span>на русском языке в течение 24 часов</span></p>
               ${search("Препарат, нозология, шкала или тема — например, «ремибрутиниб при РС»")}`
            : `${search("Поиск по статьям, нозологиям, препаратам")}
               <nav class="ax-mnav" aria-label="Основные разделы">${SECTIONS.map(secLink).join("")}</nav>`}
        </div>
        <div class="ax-arc" aria-hidden="true"></div>
      </div>
    </header>`;

  // Полоса значков (components/layout/icon-rail.tsx): группа из одного пункта — ссылка, из нескольких — панель.
  const GROUP_META = {
    "Клиническая практика": ["Практика", "Клинразборы"],
    "Мировая неврология": ["Мировая", "Статьи из журналов"],
    "Учиться": ["Учиться", "Образовательные программы"],
    "Клуб": ["Клуб", "Эксперты клуба"],
  };
  const tile = (label, icon, item, title) =>
    `<a class="ax-ib${item[0] && item[0] === page ? " on" : ""}" href="${href(item[2], item[3])}" title="${title}">${ic(icon)}${label}</a>`;
  const irailGroups = [
    tile("Главная", "Главная", MENU[0][1][0], "Главная"),
    tile("Нозологии", "Навигация по нозологиям", MENU[0][1][1], "Навигация по нозологиям"),
    ...MENU.slice(1).map(([title, items]) => {
      if (items.length === 1) return tile(items[0][1], items[0][1], items[0], title);
      const [label, icon] = GROUP_META[title] || [title, items[0][1]];
      const on = items.some(([key]) => key && key === page);
      return `<div class="ax-ib-w">
        <button type="button" class="ax-ib${on ? " on" : ""}" aria-expanded="false">${ic(icon)}${label}</button>
        <div class="ax-fly"><div class="ax-fly-t">${title}</div>${items
          .map(([key, name, h, isAi]) => `<a class="ax-fi${key && key === page ? " on" : ""}" href="${href(h, isAi)}">${ic(name)}<span>${name}</span></a>`)
          .join("")}</div>
      </div>`;
    }),
    tile("Пациентам", "Пациентам", ["patients", "Пациентам", "patients.html"], "Пациентам"),
  ];
  const irail = `<aside class="ax-irail" aria-label="Навигация по разделам"><nav>${irailGroups.join("")}</nav></aside>`;

  // Узкая белая полоса при прокрутке: знак, поиск, вход
  const stick = `
    <div class="ax-stick" aria-hidden="true" inert>
      <a class="ax-mark" href="index.html" aria-label="Клуб неврологов — главная"><img src="assets/club-mark.png" alt=""></a>
      <button type="button" class="ax-search" data-open-search aria-label="Поиск по клубу и ai-порталу">${ic("_search")}<span class="ax-s-long">Поиск по статьям, нозологиям, препаратам</span><span class="ax-s-short">Поиск</span></button>
      <div class="ax-acts ax-acts-d">${userBox}</div>
      ${burger}
    </div>`;

  const trail = crumbs.length
    ? `<nav class="ax-crumbs" aria-label="Вы здесь"><a href="index.html">Главная</a>${crumbs
        .map((c, i) => `<span class="sep">/</span>${i === crumbs.length - 1 ? `<span class="here">${c}</span>` : `<a href="#">${c}</a>`}`)
        .join("")}</nav>`
    : "";

  const partners = ["roib", "stress", "ros", "spina-bifida", "Sod-2", "medal-gold", "f-sma"]
    .map((p) => `<a href="#"><img src="https://neurology-club.ru/images/${p}.png" alt=""></a>`)
    .join("");

  // Подвал — как на ai (components/layout/footer.tsx): синий баннер дайджеста, колонки, документы клуба
  const footer = `
    <section class="ax-partners-wrap">
      <div class="section-head"><h2 class="h2">Партнёры клуба</h2><a class="more" href="#">Все партнёры</a></div>
      <div class="partners">${partners}<a href="#" class="small" style="text-align:center">Стать партнёром</a></div>
    </section>
    <footer class="ax-foot">
      <div class="ax-digest">
        <div>
          <div class="ax-digest-k">Еженедельный дайджест</div>
          <h2>Новое в неврологии за неделю — каждый понедельник</h2>
          <p>Заголовки новых материалов — все или по выбранным нозологиям и разделам. Для участников клуба.</p>
        </div>
        <div class="ax-digest-a"><a class="ax-btn-white" href="${AI}/newsletter">${loggedIn ? "Настроить дайджест" : "Подписаться"}</a><span>Всё за неделю или только выбранные нозологии и разделы.</span></div>
      </div>
      <div class="ax-foot-grid">
        <div>
          <img src="assets/club-logo.png" alt="Клуб неврологов" class="ax-foot-logo">
          <p class="small">Клуб неврологов — мировая неврология в одном профессиональном пространстве: клинические разборы, шпаргалки, лекции экспертов и мировая неврология на русском языке.</p>
          <p class="small"><a href="mailto:reklama@icon-media.ru">reklama@icon-media.ru</a><br>115054, г. Москва, а/я 43<br><a href="https://t.me/nevro_club">Telegram @nevro_club</a></p>
        </div>
        <div><h5>Материалы</h5><ul><li><a href="klinrazbors.html">Клинразборы</a></li><li><a href="cheatsheets.html">Шпаргалки</a></li><li><a href="video.html">Видео</a></li><li><a href="vestnik.html">Вестник неврологии</a></li><li><a href="patients.html">Пациентам</a></li></ul></div>
        <div><h5>Клуб</h5><ul><li><a href="experts.html">Эксперты клуба</a></li><li><a href="programs.html">Образовательные программы</a></li><li><a href="about.html">О клубе</a></li><li><a href="news.html">Новости клуба</a></li><li><a href="${AI}/">ai.neurology-club.ru</a></li></ul></div>
        <div><h5>Документы</h5><ul><li><a href="https://neurology-club.ru/rules/">Правила пользования ресурсом</a></li><li><a href="https://neurology-club.ru/agreements/">Соглашение</a></li><li><a href="https://neurology-club.ru/PD.pdf">Политика обработки персональных данных</a></li><li><a href="${AI}/patients">Информация для пациентов</a></li></ul></div>
      </div>
      <div class="ax-foot-note"><span>© 2026 Клуб неврологов · Информация предназначена для специалистов здравоохранения</span><span>neurology-club.ru · ai.neurology-club.ru</span></div>
    </footer>`;

  // ─── Сборка: шапка → [полоса значков | белый лист]
  const content = document.getElementById("page");
  const frame = document.createElement("div");
  frame.className = "ax-frame";
  frame.innerHTML = header + `<div class="ax-body">${irail}<div class="ax-sheet">${trail}</div></div>`;
  document.body.prepend(frame);
  document.body.insertAdjacentHTML("beforeend", stick);
  document.body.classList.add("ax-on");
  const sheet = frame.querySelector(".ax-sheet");
  sheet.appendChild(content);
  if (document.body.dataset.footer !== "0") sheet.insertAdjacentHTML("beforeend", footer);

  // ─── Эксперты — в случайном порядке при каждом открытии: иерархии между ними нет (решение клиента 23.10).
  // <div data-shuffle data-show="6"> — перемешать и показать первые N. В Битриксе — сортировка RAND в компоненте.
  document.querySelectorAll("[data-shuffle]").forEach((box) => {
    const items = [...box.children].filter((el) => el.tagName === "A");
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    const show = Number(box.dataset.show) || items.length;
    items.forEach((el, i) => { box.appendChild(el); el.hidden = i >= show; });
  });

  // ─── Панели полосы значков: мышью — наведение (закрытие с задержкой, чтобы дойти до панели),
  // тачем и клавиатурой — по нажатию; Esc и клик мимо закрывают.
  const wraps = [...frame.querySelectorAll(".ax-ib-w")];
  const setOpen = (w) => wraps.forEach((x) => { x.classList.toggle("open", x === w); x.querySelector("button").setAttribute("aria-expanded", x === w); });
  let closeTimer = 0, lastPointer = "";
  wraps.forEach((w) => {
    const btn = w.querySelector("button");
    w.addEventListener("pointerenter", (e) => { if (e.pointerType !== "mouse") return; clearTimeout(closeTimer); setOpen(w); });
    w.addEventListener("pointerleave", (e) => { if (e.pointerType !== "mouse") return; closeTimer = setTimeout(() => setOpen(null), 160); });
    btn.addEventListener("pointerdown", (e) => { lastPointer = e.pointerType; });
    btn.addEventListener("click", () => { const mouse = lastPointer === "mouse"; lastPointer = ""; setOpen(mouse || !w.classList.contains("open") ? w : null); });
  });
  document.addEventListener("pointerdown", (e) => { if (!e.target.closest(".ax-irail")) setOpen(null); });

  // ─── Узкая полоса — когда поиск в шапке ушёл за край экрана
  const stickEl = document.querySelector(".ax-stick");
  const hd = frame.querySelector(".ax-hd");
  const onScroll = () => {
    const on = window.scrollY > hd.offsetHeight - 72;
    stickEl.classList.toggle("on", on);
    stickEl.toggleAttribute("inert", !on);
    stickEl.setAttribute("aria-hidden", String(!on));
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ─── «Нейронный след» на синем (components/layout/neuro-trail.tsx): курсор прокладывает путь по точкам
  // фона — тонкие изогнутые отростки с бегущей искрой, редкие ветки, гаснут за ~2 с; клик — вспышка и сеть.
  // Только мышь, без анимации при prefers-reduced-motion.
  (function trail() {
    const canvas = frame.querySelector(".ax-trail");
    const host = canvas && canvas.parentElement;
    if (!host || !matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    const STEP = 18, OFFSET = 1, GROW = 320, LIFE = 2100, MAX = 160, CLICK_LIFE = 2900, PULSE = 900, RESTART = 450;
    const snap = (v) => OFFSET + Math.round((v - OFFSET) / STEP) * STEP;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const bend = (a, b) => { const k = (Math.random() - 0.5) * 0.5; return { x: (a.x + b.x) / 2 - (b.y - a.y) * k, y: (a.y + b.y) / 2 + (b.x - a.x) * k }; };
    const at = (s, t) => { const u = 1 - t; return { x: u * u * s.a.x + 2 * u * t * s.c.x + t * t * s.b.x, y: u * u * s.a.y + 2 * u * t * s.c.y + t * t * s.b.y }; };
    let segs = [], pulses = [], last = null, lastMove = 0, travelled = 0, spacing = 0, prev = null, raf = 0, w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = host.clientWidth; h = host.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    new ResizeObserver(resize).observe(host);
    const nextSpacing = () => STEP * (2.6 + Math.random() * 1.8);
    const add = (a, b, born, branch, life = LIFE) => { if (segs.length >= MAX) segs.shift(); segs.push({ a, b, c: bend(a, b), born, branch, life }); };
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    function draw() {
      const now = performance.now();
      ctx.clearRect(0, 0, w, h);
      segs = segs.filter((s) => now - s.born < s.life);
      pulses = pulses.filter((p) => now - p.born < PULSE);
      ctx.lineCap = "round";
      ctx.globalCompositeOperation = "lighter";
      for (const s of segs) {
        const age = now - s.born;
        if (age < 0) continue;
        const g = ease(Math.min(1, age / GROW));
        const flicker = 0.82 + Math.random() * 0.18;
        const alpha = Math.pow(1 - age / s.life, 1.6) * flicker * (s.branch ? 0.6 : 1);
        ctx.beginPath(); ctx.moveTo(s.a.x, s.a.y);
        for (let i = 1; i <= 14; i++) { const p = at(s, (i / 14) * g); ctx.lineTo(p.x, p.y); }
        ctx.strokeStyle = `rgba(150,215,255,${(alpha * 0.2).toFixed(3)})`; ctx.lineWidth = 3; ctx.stroke();
        ctx.strokeStyle = `rgba(210,240,255,${(alpha * 0.72).toFixed(3)})`; ctx.lineWidth = 0.7; ctx.stroke();
        if (g < 1) {
          const p = at(s, g);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 7);
          grad.addColorStop(0, `rgba(255,255,255,${(0.9 * flicker).toFixed(3)})`);
          grad.addColorStop(0.35, "rgba(158,216,247,0.35)");
          grad.addColorStop(1, "rgba(158,216,247,0)");
          ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, Math.PI * 2); ctx.fill();
        } else {
          const r = s.branch ? 1 : 1.4;
          ctx.fillStyle = `rgba(158,216,247,${(alpha * 0.18).toFixed(3)})`; ctx.beginPath(); ctx.arc(s.b.x, s.b.y, r * 4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(255,255,255,${(alpha * 0.85).toFixed(3)})`; ctx.beginPath(); ctx.arc(s.b.x, s.b.y, r, 0, Math.PI * 2); ctx.fill();
        }
      }
      for (const p of pulses) {
        const t = (now - p.born) / PULSE, a = 1 - t;
        const soma = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 16);
        soma.addColorStop(0, `rgba(255,255,255,${(a * 0.95).toFixed(3)})`);
        soma.addColorStop(0.3, `rgba(158,216,247,${(a * 0.45).toFixed(3)})`);
        soma.addColorStop(1, "rgba(158,216,247,0)");
        ctx.fillStyle = soma; ctx.beginPath(); ctx.arc(p.x, p.y, 16, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = `rgba(190,235,255,${(a * a * 0.45).toFixed(3)})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(p.x, p.y, 8 + ease(t) * 86, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = segs.length || pulses.length ? requestAnimationFrame(draw) : 0;
    }
    host.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = host.getBoundingClientRect();
      const m = { x: e.clientX - r.left, y: e.clientY - r.top };
      const now = performance.now();
      if (!last || now - lastMove > RESTART) { last = { x: snap(m.x), y: snap(m.y) }; prev = m; travelled = 0; spacing = nextSpacing(); }
      lastMove = now;
      travelled += Math.hypot(m.x - prev.x, m.y - prev.y); prev = m;
      if (travelled < spacing) return;
      const jitter = () => (Math.floor(Math.random() * 3) - 1) * STEP;
      const b = { x: snap(m.x) + jitter(), y: snap(m.y) + jitter() };
      if (b.x === last.x && b.y === last.y) return;
      add(last, b, now, false);
      if (Math.random() < 0.28) {
        const ang = Math.random() * Math.PI * 2, len = STEP * (2 + Math.random() * 2);
        const t = { x: snap(b.x + Math.cos(ang) * len), y: snap(b.y + Math.sin(ang) * len) };
        if (t.x !== b.x || t.y !== b.y) add(b, t, now + GROW * 0.8, true);
      }
      last = b; travelled = 0; spacing = nextSpacing();
      kick();
    });
    host.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const r = host.getBoundingClientRect();
      const o = { x: snap(e.clientX - r.left), y: snap(e.clientY - r.top) };
      const now = performance.now();
      pulses.push({ ...o, born: now });
      const rays = 5 + Math.floor(Math.random() * 3), base = Math.random() * Math.PI * 2, tips = [];
      for (let k = 0; k < rays; k++) {
        let ang = base + (k / rays) * Math.PI * 2 + (Math.random() - 0.5) * 0.5, p = o, t = now + Math.random() * 80;
        const links = 2 + Math.floor(Math.random() * 2);
        for (let j = 0; j < links; j++) {
          ang += (Math.random() - 0.5) * 0.7;
          const len = STEP * (2 + Math.random() * 1.6);
          const q = { x: snap(p.x + Math.cos(ang) * len), y: snap(p.y + Math.sin(ang) * len) };
          if (q.x === p.x && q.y === p.y) continue;
          add(p, q, t, j > 0, CLICK_LIFE); t += GROW * 0.85; p = q;
        }
        tips.push({ p, t });
      }
      for (let i = 0; i < tips.length; i++) {
        const a = tips[i], b = tips[(i + 1) % tips.length];
        if (Math.hypot(a.p.x - b.p.x, a.p.y - b.p.y) < STEP * 6.5 && Math.random() < 0.75) add(a.p, b.p, Math.max(a.t, b.t), true, CLICK_LIFE);
      }
      kick();
    });
  })();

  // ─── Телефон: то же синее меню выезжает слева
  const drawer = document.createElement("div");
  drawer.className = "ax-drawer";
  drawer.hidden = true;
  drawer.innerHTML = `<div class="ax-scrim" data-close-menu></div><div class="ax-drawer-panel"><div class="ax-drawer-top"><button type="button" class="ax-icbtn" data-close-menu aria-label="Закрыть меню">${ic("_close")}</button></div>${rail.replace('class="ax-rail"', 'class="ax-rail ax-rail-m"')}</div>`;
  document.body.appendChild(drawer);
  const openMenu = () => { drawer.hidden = false; document.body.style.overflow = "hidden"; };
  const closeMenu = () => { drawer.hidden = true; document.body.style.overflow = ""; };
  document.querySelectorAll("[data-open-menu]").forEach((b) => b.addEventListener("click", openMenu));
  drawer.addEventListener("click", (e) => { if (e.target.closest("[data-close-menu]") || e.target.closest("a")) closeMenu(); });

  // ─── Окно поиска (⌘K) — как на ai (components/search/search-dialog.tsx): один поиск по клубу и ai
  const hit = (src, rubric, date, title, text, h) => `
    <a class="sd-hit" href="${h}">
      <div class="label"><b>${rubric}</b><span class="dot">·</span>${date}<span class="sd-src">${src}</span></div>
      <div class="sd-title">${title}</div><div class="sd-text">${text}</div>
    </a>`;
  const dialog = `
    <div class="sd-backdrop" data-search hidden>
      <div class="sd" role="dialog" aria-modal="true" aria-label="Поиск по клубу и ai-порталу">
        <div class="sd-input">${ic("_search")}<input type="text" value="энцефалит" placeholder="Препарат, нозология, шкала, исследование…"><button type="button" class="sd-close" data-close-search aria-label="Закрыть">${ic("_close")}</button></div>
        <div class="sd-body">
          <div class="label sd-count">Найдено 4 материала</div>
          ${hit("Клуб", "Статья клуба", "29 сент.", "Аутоиммунные <mark>энцефалиты</mark> в практике невролога: когда «психиатрия» оказывается иммунологией", "Клинический спектр, красные флаги у «психиатрического» пациента, алгоритм обследования…", "article.html")}
          ${hit("Клуб", "Шпаргалка", "12 сент.", "Диагностические критерии аутоиммунного <mark>энцефалита</mark> (Graus F., 2016)", "Возможный, вероятный и определённый АЭ — критерии в одной таблице, PDF", "cheatsheet.html")}
          ${hit("ai", "Нейроинфекции", "8 окт.", "Клещевой <mark>энцефалит</mark>: исходы через 5 лет у взрослых", "Когортное исследование 412 пациентов: стойкий неврологический дефицит у 27%…", AI + "/section/journal-articles")}
          ${hit("ai", "Рассеянный склероз", "2 окт.", "Анти-MOG-ассоциированный острый рассеянный <mark>энцефаломиелит</mark> у детей", "Обзор диагностических критериев и тактики иммунотерапии…", AI + "/section/journal-articles")}
          <a class="sd-all" href="search.html">Все результаты по запросу «энцефалит» <span aria-hidden="true">→</span></a>
        </div>
        <div class="sd-foot"><span><kbd>↑↓</kbd> выбор</span><span><kbd>Enter</kbd> открыть</span><span><kbd>Esc</kbd> закрыть</span></div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", dialog);
  const sd = document.querySelector("[data-search]");
  const open = () => { sd.hidden = false; sd.querySelector("input").focus(); };
  const close = () => { sd.hidden = true; };
  document.querySelectorAll("[data-open-search]").forEach((b) => b.addEventListener("click", open));
  sd.addEventListener("click", (e) => { if (e.target === sd || e.target.closest("[data-close-search]")) close(); });
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); sd.hidden ? open() : close(); }
    if (e.key === "Escape") { close(); closeMenu(); setOpen(null); }
  });
})();
