/*
 * Общая оболочка макетов: меню слева (единое с ai.neurology-club.ru — ТЗ, п. 5),
 * шапка с поиском и входом, партнёры и подвал. Страница задаёт:
 *   <body data-page="experts" data-crumbs="Эксперты клуба" data-user="1">
 *   <div id="page"> … содержимое … </div>
 * В вёрстке на Битриксе это шаблон сайта (header.php / footer.php) и меню.
 */
(function () {
  const AI = "https://ai.neurology-club.ru";
  const page = document.body.dataset.page || "";
  const crumbs = (document.body.dataset.crumbs || "").split("|").filter(Boolean);
  const loggedIn = document.body.dataset.user === "1";

  // Одно меню для клуба и ai (navigation.html, ТЗ п. 5): группы по задачам врача.
  // [ключ страницы, название, адрес, ai?] — пункты ai открывают ai.neurology-club.ru.
  const MENU = [
    [null, [["home", "Главная", "index.html"]]],
    ["Клиническая практика", [
      ["klin", "Клинразборы", "klinrazbors.html"],
      ["articles", "Статьи клуба", "articles.html"],
      ["cheats", "Шпаргалки и инфографика", "cheatsheets.html"],
      ["synd", "Синдромология", "sindromology.html"],
      ["", "Гайдлайны", "/docs", true],
      ["", "Шкалы и калькуляторы", "/tools", true],
    ]],
    ["Мировая неврология · ai", [
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

  const item = ([key, name, href, isAi]) => isAi
    ? `<a class="item" href="${AI}${href}">${name}<span class="ext">AI</span></a>`
    : `<a class="item${key && key === page ? " active" : ""}" href="${href}">${name}</a>`;

  const rail = `
    <aside class="rail">
      <a class="rail-logo" href="index.html" aria-label="Клуб неврологов — на главную"><img src="assets/club-logo.png" alt="Клуб неврологов"></a>
      ${MENU.map(([title, items]) => `<nav class="rail-group">${title ? `<div class="label">${title}</div>` : ""}${items.map(item).join("")}</nav>`).join("")}
      <a class="rail-accent" href="${AI}/navigation">Навигация по нозологиям <span aria-hidden="true">→</span></a>
      <nav class="rail-group rail-apart">${item(["patients", "Пациентам", "patients.html"])}</nav>
    </aside>`;

  const trail = crumbs.length
    ? `<a href="index.html">Главная</a>${crumbs
        .map((c, i) => `<span class="sep">/</span>${i === crumbs.length - 1 ? `<span class="here">${c}</span>` : `<a href="#">${c}</a>`}`)
        .join("")}`
    : `<span class="here">Клуб неврологов — профессиональное сообщество неврологов</span>`;

  const userBox = loggedIn
    ? `<a class="user" href="profile.html"><span class="avatar">АИ</span><span>Анна Иванова</span></a>`
    : `<a class="btn btn-sm" href="login.html">Войти</a><a class="btn btn-sm btn-primary" href="register.html">Регистрация</a>`;

  // На телефоне левое меню скрыто: в шапке — знак клуба и кнопка меню (меню выезжает слева)
  const topbar = `
    <header class="topbar">
      <button type="button" class="menu-btn" data-open-menu aria-label="Меню">☰</button>
      <a class="topbar-logo" href="index.html" aria-label="Клуб неврологов — на главную"><img src="assets/club-logo.png" alt="Клуб неврологов"></a>
      <div class="crumbs">${trail}</div>
      <button type="button" class="search" data-open-search>⌕ <span>Поиск по клубу и ai-порталу</span><kbd>⌘K</kbd></button>
      ${userBox}
    </header>`;

  const partners = ["roib", "stress", "ros", "spina-bifida", "Sod-2", "medal-gold", "f-sma"]
    .map((p) => `<a href="#"><img src="https://neurology-club.ru/images/${p}.png" alt=""></a>`)
    .join("");

  const footer = `
    <section class="page section">
      <div class="section-head"><h2 class="h2">Партнёры клуба</h2><a class="more" href="#">Все партнёры</a></div>
      <div class="partners">${partners}<a href="#" class="small" style="text-align:center">Стать партнёром</a></div>
    </section>
    <footer class="footer">
      <div class="footer-grid">
        <div>
          <img src="assets/club-logo.png" alt="Клуб неврологов" style="height:44px;width:auto">
          <p class="small mt-16" style="max-width:300px">Профессиональное сообщество неврологов: клинические разборы, шпаргалки, лекции экспертов и мировая неврология на русском языке.</p>
          <a class="btn btn-sm mt-16" href="https://t.me/nevro_club">Telegram-канал @nevro_club</a>
        </div>
        <div><h5>Материалы</h5><ul><li><a href="klinrazbors.html">Клинразборы</a></li><li><a href="cheatsheets.html">Шпаргалки</a></li><li><a href="video.html">Видео</a></li><li><a href="vestnik.html">Вестник неврологии</a></li><li><a href="patients.html">Пациентам</a></li></ul></div>
        <div><h5>Клуб</h5><ul><li><a href="experts.html">Эксперты клуба</a></li><li><a href="programs.html">Образовательные программы</a></li><li><a href="medlibrary.html">Журналы-партнёры</a></li><li><a href="about.html">О клубе</a></li><li><a href="news.html">Новости клуба</a></li></ul></div>
        <div><h5>Документы</h5><ul><li><a href="https://neurology-club.ru/rules/">Правила</a></li><li><a href="https://neurology-club.ru/agreements/">Соглашение</a></li><li><a href="https://neurology-club.ru/PD.pdf">Политика обработки ПД (PDF)</a></li><li><a href="mailto:reklama@icon-media.ru">Публикации и реклама</a></li></ul></div>
      </div>
      <div class="footer-note"><span>© 2026 Клуб неврологов. Информация предназначена для специалистов здравоохранения.</span><span>neurology-club.ru · ai.neurology-club.ru</span></div>
    </footer>`;

  const content = document.getElementById("page");
  const shell = document.createElement("div");
  shell.className = "shell";
  shell.innerHTML = rail + `<div class="main">${topbar}</div>`;
  document.body.prepend(shell);
  const main = shell.querySelector(".main");
  main.appendChild(content);
  if (document.body.dataset.footer !== "0") main.insertAdjacentHTML("beforeend", footer);

  // ─── Мобильное меню: тот же рельс, выезжает поверх страницы
  const railEl = shell.querySelector(".rail");
  shell.insertAdjacentHTML("beforeend", '<div class="rail-scrim" data-close-menu></div>');
  document.querySelectorAll("[data-open-menu]").forEach((b) => b.addEventListener("click", () => shell.classList.add("menu-open")));
  shell.querySelector("[data-close-menu]").addEventListener("click", () => shell.classList.remove("menu-open"));
  railEl.addEventListener("click", (e) => { if (e.target.closest("a")) shell.classList.remove("menu-open"); });

  // ─── Окно поиска (⌘K) — как на ai.neurology-club.ru (components/search/search-dialog.tsx):
  // один поиск по клубу и ai, результаты помечены источником. Данные — примеры для вёрстки.
  const hit = (src, rubric, date, title, text, href) => `
    <a class="sd-hit" href="${href}">
      <div class="label"><b>${rubric}</b><span class="dot">·</span>${date}<span class="sd-src">${src}</span></div>
      <div class="sd-title">${title}</div><div class="sd-text">${text}</div>
    </a>`;
  const dialog = `
    <div class="sd-backdrop" data-search hidden>
      <div class="sd" role="dialog" aria-modal="true" aria-label="Поиск по клубу и ai-порталу">
        <div class="sd-input"><span aria-hidden="true">⌕</span><input type="text" value="энцефалит" placeholder="Препарат, нозология, шкала, исследование…"><button type="button" class="sd-close" data-close-search aria-label="Закрыть">✕</button></div>
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
    if (e.key === "Escape") { close(); shell.classList.remove("menu-open"); }
  });
})();
