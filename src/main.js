import "./style.css";
import { categories, faqs } from "./data/supportData.js";
import { parseRoute, setRoute } from "./support/router.js";
import { escapeHtml, highlightHtml, scoreEntry, tokenize } from "./support/search.js";
import nymoFaviconUrl from "./assets/Nymo_logo_white.png?url";

const STORAGE_LANG = "nymo_support_lang";
const STORAGE_REQUEST_DRAFT = "nymo_support_request_draft_v1";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzlpezg";

const categoryIconSvg = {
  "getting-started": `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24h72v16H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V200h72a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40ZM48,56H208a8,8,0,0,1,8,8v80H40V64A8,8,0,0,1,48,56ZM208,184H48a8,8,0,0,1-8-8V160H216v16A8,8,0,0,1,208,184Z"></path></svg>`,
  "account-auth": `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>`,
  "profile-settings": `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M144,157.68a68,68,0,1,0-71.9,0c-20.65,6.76-39.23,19.39-54.17,37.17a8,8,0,1,0,12.24,10.3C50.25,181.19,77.91,168,108,168s57.75,13.19,77.87,37.15a8,8,0,0,0,12.26-10.3C183.18,177.07,164.6,164.44,144,157.68ZM56,100a52,52,0,1,1,52,52A52.06,52.06,0,0,1,56,100Zm196.25,43.07-4.66-2.69a23.6,23.6,0,0,0,0-8.76l4.66-2.69a8,8,0,1,0-8-13.86l-4.67,2.7a23.92,23.92,0,0,0-7.58-4.39V108a8,8,0,0,0-16,0v5.38a23.92,23.92,0,0,0-7.58,4.39l-4.67-2.7a8,8,0,1,0-8,13.86l4.66,2.69a23.6,23.6,0,0,0,0,8.76l-4.66,2.69a8,8,0,0,0,8,13.86l4.67-2.7a23.92,23.92,0,0,0,7.58,4.39V164a8,8,0,0,0,16,0v-5.38a23.92,23.92,0,0,0,7.58-4.39l4.67,2.7a7.92,7.92,0,0,0,4,1.07,8,8,0,0,0,4-14.93ZM216,136a8,8,0,1,1,8,8A8,8,0,0,1,216,136Z"></path></svg>`,
  messaging: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path></svg>`,
  groups: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path></svg>`,
  calls: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M144.27,45.93a8,8,0,0,1,9.8-5.66,86.22,86.22,0,0,1,61.66,61.66,8,8,0,0,1-5.66,9.8A8.23,8.23,0,0,1,208,112a8,8,0,0,1-7.73-5.94,70.35,70.35,0,0,0-50.33-50.33A8,8,0,0,1,144.27,45.93Zm-2.33,41.8c13.79,3.68,22.65,12.54,26.33,26.33A8,8,0,0,0,176,120a8.23,8.23,0,0,0,2.07-.27,8,8,0,0,0,5.66-9.8c-5.12-19.16-18.5-32.54-37.66-37.66a8,8,0,1,0-4.13,15.46Zm81.94,95.35A56.26,56.26,0,0,1,168,232C88.6,232,24,167.4,24,88A56.26,56.26,0,0,1,72.92,32.12a16,16,0,0,1,16.62,9.52l21.12,47.15,0,.12A16,16,0,0,1,109.39,104c-.18.27-.37.52-.57.77L88,129.45c7.49,15.22,23.41,31,38.83,38.51l24.34-20.71a8.12,8.12,0,0,1,.75-.56,16,16,0,0,1,15.17-1.4l.13.06,47.11,21.11A16,16,0,0,1,223.88,183.08Zm-15.88-2s-.07,0-.11,0h0l-47-21.05-24.35,20.71a8.44,8.44,0,0,1-.74.56,16,16,0,0,1-15.75,1.14c-18.73-9.05-37.4-27.58-46.46-46.11a16,16,0,0,1,1-15.7,6.13,6.13,0,0,1,.57-.77L96,95.15l-21-47a.61.61,0,0,1,0-.12A40.2,40.2,0,0,0,40,88,128.14,128.14,0,0,0,168,216,40.21,40.21,0,0,0,208,181.07Z"></path></svg>`,
  notifications: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path></svg>`,
  "media-files": `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M201.54,54.46A104,104,0,0,0,54.46,201.54,104,104,0,0,0,201.54,54.46ZM190.23,65.78a88.18,88.18,0,0,1,11,13.48L167.55,119,139.63,40.78A87.34,87.34,0,0,1,190.23,65.78ZM155.59,133l-18.16,21.37-27.59-5L100.41,123l18.16-21.37,27.59,5ZM65.77,65.78a87.34,87.34,0,0,1,56.66-25.59l17.51,49L58.3,74.32A88,88,0,0,1,65.77,65.78ZM46.65,161.54a88.41,88.41,0,0,1,2.53-72.62l51.21,9.35Zm19.12,28.68a88.18,88.18,0,0,1-11-13.48L88.45,137l27.92,78.18A87.34,87.34,0,0,1,65.77,190.22Zm124.46,0a87.34,87.34,0,0,1-56.66,25.59l-17.51-49,81.64,14.91A88,88,0,0,1,190.23,190.22Zm-34.62-32.49,53.74-63.27a88.41,88.41,0,0,1-2.53,72.62Z"></path></svg>`,
  "privacy-security": `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.3,129.3,0,0,1,128,223.62a128.25,128.25,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56,160,0ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z"></path></svg>`,
  "sync-data": `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Zm0,160H72a48,48,0,0,1,0-96c1.1,0,2.2,0,3.29.11A88,88,0,0,0,72,128a8,8,0,0,0,16,0,72,72,0,1,1,72,72Zm37.66-93.66a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L144,148.69l42.34-42.35A8,8,0,0,1,197.66,106.34Z"></path></svg>`,
  troubleshooting: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M120,136V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0ZM232,91.55v72.9a15.86,15.86,0,0,1-4.69,11.31l-51.55,51.55A15.86,15.86,0,0,1,164.45,232H91.55a15.86,15.86,0,0,1-11.31-4.69L28.69,175.76A15.86,15.86,0,0,1,24,164.45V91.55a15.86,15.86,0,0,1,4.69-11.31L80.24,28.69A15.86,15.86,0,0,1,91.55,24h72.9a15.86,15.86,0,0,1,11.31,4.69l51.55,51.55A15.86,15.86,0,0,1,232,91.55Zm-16,0L164.45,40H91.55L40,91.55v72.9L91.55,216h72.9L216,164.45ZM128,160a12,12,0,1,0,12,12A12,12,0,0,0,128,160Z"></path></svg>`,
  policies: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M120,136V96a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,48a12,12,0,1,0-12-12A12,12,0,0,0,128,184ZM224,56v56c0,52.72-25.52,84.67-46.93,102.19-23.06,18.86-46,25.27-47,25.53a8,8,0,0,1-4.2,0c-1-.26-23.91-6.67-47-25.53C57.52,196.67,32,164.72,32,112V56A16,16,0,0,1,48,40H208A16,16,0,0,1,224,56Zm-16,0L48,56l0,56c0,37.3,13.82,67.51,41.07,89.81A128.25,128.25,0,0,0,128,223.62a129.3,129.3,0,0,0,39.41-22.2C194.34,179.16,208,149.07,208,112Z"></path></svg>`
};

const i18n = {
  uk: {
    brand: "NYMO",
    support: "Support",
    submit: "Submit a request",
    site: "nymo.com",
    searchPlaceholder: "Start typing your search…",
    promoted: "Promoted articles",
    results: "Результати",
    noResults: "Нічого не знайдено. Спробуйте інші ключові слова.",
    back: "Назад",
    inCategory: "У розділі",
    allCategories: "Усі розділи",
    requestTitle: "Submit a request",
    requestHint:
      "Опиши проблему коротко. Додай версію застосунку/ОС та час, коли це сталося — так ми швидше допоможемо."
  },
  en: {
    brand: "NYMO",
    support: "Support",
    submit: "Submit a request",
    site: "nymo.com",
    searchPlaceholder: "Start typing your search…",
    promoted: "Promoted articles",
    results: "Results",
    noResults: "No results. Try different keywords.",
    back: "Back",
    inCategory: "In section",
    allCategories: "All sections",
    requestTitle: "Submit a request",
    requestHint:
      "Describe your issue briefly. Add app/OS version and the time it happened — it helps us resolve it faster."
  }
};

const state = {
  lang: "uk",
  query: "",
  categoryFilter: "all",
  lastQueryForHighlight: ""
};

function clearSearchUI() {
  state.query = "";
  state.lastQueryForHighlight = "";
  state.categoryFilter = "all";
  const input = document.querySelector("#search");
  if (input) input.value = "";
}

function go(route, { clearSearch = false } = {}) {
  if (clearSearch) clearSearchUI();
  setRoute(route);
}

function getCategoryIconSvg(categoryKey) {
  if (categoryIconSvg[categoryKey]) return categoryIconSvg[categoryKey];

  // Alias new sections to closest existing icon the user provided.
  const aliasTo = {
    contacts: "account-auth",
    search: "messaging",
    "voice-messages": "calls",
    "stickers-emoji": "messaging",
    storage: "media-files",
    "desktop-web": "sync-data",
    personalization: "profile-settings",

    "username-id": "profile-settings",
    verification: "account-auth",
    "sessions-devices": "privacy-security",
    "two-factor": "privacy-security",
    "blocking-spam": "privacy-security",
    "links-invites": "groups",
    "status-presence": "privacy-security",
    "message-formatting": "messaging",
    attachments: "media-files",
    "data-usage": "media-files",
    accessibility: "profile-settings",
    updates: "troubleshooting",
    "billing-subscriptions": "policies",
    enterprise: "groups",
    moderation: "policies",
    "privacy-requests": "policies",
    "keyboard-shortcuts": "profile-settings",
    "network-connection": "troubleshooting",
    "backup-restore": "sync-data",
    migration: "sync-data",
    "safety-tips": "privacy-security"
  };

  const mapped = aliasTo[categoryKey];
  if (mapped && categoryIconSvg[mapped]) return categoryIconSvg[mapped];
  return categoryIconSvg.messaging;
}

function getCat(key) {
  return categories.find((c) => c.key === key) || null;
}

function getFaq(id) {
  return faqs.find((f) => String(f.id) === String(id)) || null;
}

function getPromoted(lang) {
  return faqs
    .slice()
    .sort((a, b) => (a.popularityRank || 999) - (b.popularityRank || 999))
    .slice(0, 9)
    .map((f) => ({ id: f.id, title: f.q[lang] }));
}

function searchFaqs({ query, lang, category = "all" }) {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  return faqs
    .filter((f) => (category === "all" ? true : f.category === category))
    .map((f) => ({ f, s: scoreEntry(f, lang, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.f);
}

function renderShell() {
  const t = i18n[state.lang];
  document.querySelector("#app").innerHTML = `
    <header class="topbar">
      <div class="wrap topbar-inner">
        <a class="brand" href="#/" aria-label="Home">
          <span class="brand-name">${escapeHtml(t.brand)}</span>
          <span class="brand-sub">${escapeHtml(t.support)}</span>
        </a>
        <nav class="topbar-nav" aria-label="Top navigation">
          <a href="#/request" class="topbar-link">${escapeHtml(t.submit)}</a>
          <a href="https://toodyann.github.io/Nymo/" target="_blank" rel="noreferrer" class="topbar-link subtle">${escapeHtml(
            t.site
          )}</a>
          <button class="topbar-link subtle" type="button" id="langBtn" style="background:transparent;border:0;cursor:pointer;padding:0;">
            ${state.lang === "uk" ? "UA" : "EN"}
          </button>
        </nav>
      </div>
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="wrap hero">
        <div class="hero-search">
          <span class="search-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10.8 18a7.2 7.2 0 1 1 0-14.4a7.2 7.2 0 0 1 0 14.4Z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16.6 16.6 21 21"/></svg>
          </span>
          <input id="search" class="search-input" value="${escapeHtml(state.query)}" placeholder="${escapeHtml(
    t.searchPlaceholder
  )}" autocomplete="off" />
        </div>
      </div>
    </header>

    <main id="main" class="page"></main>

    <button class="help-fab" type="button" id="helpBtn" aria-label="Help">Help</button>
    <dialog class="help-dialog" id="helpDialog">
      <form method="dialog" class="help-card">
        <div class="help-head">
          <strong>Help</strong>
          <button class="help-close" value="close" aria-label="Close">✕</button>
        </div>
        <p class="help-text">${escapeHtml(i18n[state.lang].requestHint)}</p>
        <textarea class="help-input" id="helpDraft" placeholder="${escapeHtml(
    state.lang === "uk" ? "Напр.: не приходять сповіщення у фоні…" : "E.g. notifications don’t arrive in background…"
  )}" required></textarea>
        <div class="help-actions">
          <button class="help-primary" value="send">${escapeHtml(state.lang === "uk" ? "Продовжити" : "Continue")}</button>
          <button class="help-secondary" value="close">${escapeHtml(state.lang === "uk" ? "Close" : "Close")}</button>
        </div>
      </form>
    </dialog>
  `;

  bindShellEvents();
}

function renderHome() {
  const t = i18n[state.lang];
  const promoted = getPromoted(state.lang);

  const main = document.querySelector("#main");
  main.innerHTML = `
    <section class="notice">
      <div class="wrap notice-inner">
        <span class="notice-text">Nymo requires a recent OS version for best performance. <a href="#/c/troubleshooting" class="notice-link">Learn more</a></span>
      </div>
    </section>

    <section class="wrap cards" aria-label="Support sections">
      ${categories
        .map((c) => {
          return `
            <article class="card" data-cat="${escapeHtml(c.key)}" tabindex="0" role="button">
              <div class="card-ic">${getCategoryIconSvg(c.key)}</div>
              <h3 class="card-title">${escapeHtml(c.title[state.lang])}</h3>
              <p class="card-sub">${escapeHtml(c.subtitle[state.lang])}</p>
            </article>
          `;
        })
        .join("")}
    </section>

    <section class="wrap promoted" aria-label="${escapeHtml(t.promoted)}">
      <h4 class="promoted-title">${escapeHtml(t.promoted)}</h4>
      <div class="promoted-grid">
        ${splitCols(promoted, 3)
          .map(
            (col) => `
              <ul class="promoted-col">
                ${col.map((a) => `<li><a class="promoted-link" href="#/q/${escapeHtml(a.id)}">${escapeHtml(a.title)}</a></li>`).join("")}
              </ul>
            `
          )
          .join("")}
      </div>
    </section>

    <footer class="footer">
      <div class="wrap footer-inner">
        <div class="footer-left"><span class="footer-brand">Nymo · Support</span></div>
        <div class="footer-mid">
          <button class="footer-lang" type="button" id="footerLangBtn">${escapeHtml(
            state.lang === "uk" ? "Українська (UA)" : "English (EN)"
          )}</button>
          <span class="footer-dot">•</span>
          <a class="footer-link" href="#/request">Log in to Support</a>
        </div>
        <div class="footer-right"><span class="footer-copy">© ${new Date().getFullYear()}</span></div>
      </div>
    </footer>
  `;

  // cards to category route
  document.querySelectorAll(".card").forEach((el) => {
    el.addEventListener("click", () => go({ name: "category", key: el.dataset.cat }, { clearSearch: true }));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    });
  });

  // Promoted articles should open the question page (clear search first).
  document.querySelectorAll(".promoted-link").forEach((a) => {
    a.addEventListener("click", () => clearSearchUI());
  });

  const footerLangBtn = document.querySelector("#footerLangBtn");
  if (footerLangBtn) {
    footerLangBtn.addEventListener("click", () => {
      state.lang = state.lang === "uk" ? "en" : "uk";
      localStorage.setItem(STORAGE_LANG, state.lang);
      renderApp();
    });
  }
}

function renderCategory(key) {
  const t = i18n[state.lang];
  const cat = getCat(key);
  const main = document.querySelector("#main");
  const title = cat ? cat.title[state.lang] : key;

  const list = faqs
    .filter((f) => f.category === key)
    .slice()
    .sort((a, b) => (a.popularityRank || 999) - (b.popularityRank || 999));

  main.innerHTML = `
    <section class="wrap" style="padding: 22px 0;">
      <div style="display:flex; align-items:center; gap: 10px; justify-content: space-between; flex-wrap: wrap;">
        <a href="#/" class="back-link">← ${escapeHtml(t.back)}</a>
        <div style="display:flex; align-items:center; gap: 10px;">
          <span style="color: rgba(0,0,0,0.55); font-size: 14px;">${escapeHtml(t.inCategory)}:</span>
          <strong style="font-size: 16px;">${escapeHtml(title)}</strong>
        </div>
        <div></div>
      </div>
      <div style="height: 14px;"></div>
      ${
        list.length === 0
          ? `<div style="border: 1px solid var(--line); border-radius: 10px; background: #fff; padding: 16px; color: rgba(0,0,0,0.7);">
              ${escapeHtml(state.lang === "uk" ? "Поки що в цьому розділі немає статей." : "No articles in this section yet.")}
              <div style="height: 8px;"></div>
              <a href="#/request" style="color: rgba(0,0,0,0.8); text-decoration: underline;">${escapeHtml(
                state.lang === "uk" ? "Написати в підтримку" : "Submit a request"
              )}</a>
            </div>`
          : `<div style="border: 1px solid var(--line); border-radius: 10px; background: #fff; overflow:hidden;">
              ${list
                .map(
                  (f) => `
                  <a href="#/q/${escapeHtml(f.id)}" style="display:block; padding: 14px 16px; border-top: 1px solid var(--line); text-decoration:none; color: inherit;">
                    <div style="font-size: 15px; font-weight: 600;">${escapeHtml(f.q[state.lang])}</div>
                    <div style="margin-top: 6px; color: rgba(0,0,0,0.72); font-size: 14px; line-height: 1.5;">
                      ${escapeHtml(excerpt(f.a[state.lang] || "", 160))}
                    </div>
                    <div style="margin-top: 4px; color: rgba(0,0,0,0.62); font-size: 13px;">
                      #${escapeHtml(f.id)} · ${(f.tags || []).slice(0, 4).map(escapeHtml).join(" · ")}
                    </div>
                  </a>
                `
                )
                .join("")
                .replace('border-top: 1px solid var(--line);', "")}
            </div>`
      }
    </section>
  `;
}

function renderQuestion(id) {
  const t = i18n[state.lang];
  const f = getFaq(id);
  const main = document.querySelector("#main");

  if (!f) {
    main.innerHTML = `<section class="wrap" style="padding: 26px 0; color: rgba(0,0,0,0.7);">Not found</section>`;
    return;
  }

  const cat = getCat(f.category);
  main.innerHTML = `
    <section class="wrap" style="padding: 22px 0 40px;">
      <div style="display:flex; align-items:center; gap: 10px; justify-content: space-between; flex-wrap: wrap;">
        <a href="#/c/${escapeHtml(f.category)}" class="back-link">← ${escapeHtml(t.back)}</a>
        <div style="color: rgba(0,0,0,0.55); font-size: 14px;">${escapeHtml(cat ? cat.title[state.lang] : f.category)} · #${escapeHtml(f.id)}</div>
      </div>
      <div style="height: 14px;"></div>
      <div style="border: 1px solid var(--line); border-radius: 10px; background: #fff; padding: 18px 18px;">
        <h1 style="margin: 0; font-size: 17px; line-height: 1.25;">${highlightHtml(
          f.q[state.lang],
          state.lastQueryForHighlight || ""
        )}</h1>
        <div style="margin-top: 10px; color: rgba(0,0,0,0.62); font-size: 13px;">
          ${(f.tags || []).slice(0, 8).map((tag) => `<span style="display:inline-block; margin-right: 10px;">#${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div style="height: 14px;"></div>
        <div style="color: rgba(0,0,0,0.85); font-size: 16px; line-height: 1.6;">
          ${String(f.a[state.lang] || "")
            .split(/\n\s*\n/g)
            .map((p) => `<p style="margin: 10px 0;">${highlightHtml(p, state.lastQueryForHighlight || "")}</p>`)
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderRequest() {
  const t = i18n[state.lang];
  const main = document.querySelector("#main");
  const draft = localStorage.getItem(STORAGE_REQUEST_DRAFT) || "";
  main.innerHTML = `
    <section class="wrap" style="padding: 22px 0 48px;">
      <a href="#/" class="back-link">← ${escapeHtml(t.back)}</a>
      <div style="height: 12px;"></div>
      <h2 style="margin:0; font-size: 17px;">${escapeHtml(t.requestTitle)}</h2>
      <p style="margin: 10px 0 0; color: rgba(0,0,0,0.65);">${escapeHtml(t.requestHint)}</p>
      <div style="height: 16px;"></div>
      <div style="border: 1px solid var(--line); border-radius: 10px; background: #fff; padding: 16px;">
        <div id="r_success" class="alert success" style="display:none;">
          <div class="alert-text"></div>
          <button class="alert-close" type="button" aria-label="Close">✕</button>
        </div>
        <div id="r_error" class="alert error" style="display:none;">
          <div class="alert-text"></div>
          <button class="alert-close" type="button" aria-label="Close">✕</button>
        </div>

        <form id="support-form" novalidate>
          <input type="hidden" name="lang" value="${escapeHtml(state.lang)}" />
          <input type="hidden" name="page" value="${escapeHtml(location.href)}" />
          <input type="hidden" name="userAgent" value="${escapeHtml(navigator.userAgent)}" />

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <label style="display:flex; flex-direction:column; gap: 6px; font-size: 13px; color: rgba(0,0,0,0.7);">
            Email
            <input id="r_email" name="email" style="border:1px solid var(--line); border-radius:10px; padding:12px; font-size: 15px;" type="email" autocomplete="email" required />
            <span id="r_email_err" style="color: rgba(239, 68, 68, 0.9); font-size: 12px;"></span>
          </label>
          <label style="display:flex; flex-direction:column; gap: 6px; font-size: 13px; color: rgba(0,0,0,0.7);">
            ${escapeHtml(state.lang === "uk" ? "Пристрій / ОС" : "Device / OS")}
            <input id="r_device" name="device" style="border:1px solid var(--line); border-radius:10px; padding:12px; font-size: 15px;" placeholder="${escapeHtml(
              state.lang === "uk" ? "Напр.: iPhone 14, iOS 17.5" : "E.g. iPhone 14, iOS 17.5"
            )}" />
            <span id="r_device_err" style="color: rgba(239, 68, 68, 0.9); font-size: 12px;"></span>
          </label>
          <label style="display:flex; flex-direction:column; gap: 6px; font-size: 13px; color: rgba(0,0,0,0.7); grid-column: 1 / -1;">
            ${escapeHtml(state.lang === "uk" ? "Опишіть проблему" : "Describe the issue")}
            <textarea id="r_msg" name="message" style="border:1px solid var(--line); border-radius:10px; padding:12px; font-size: 15px; min-height: 160px;" required>${escapeHtml(
              draft
            )}</textarea>
            <span id="r_msg_err" style="color: rgba(239, 68, 68, 0.9); font-size: 12px;"></span>
          </label>
        </div>
        <div style="height: 12px;"></div>
        <button class="help-primary" id="r_submit" type="submit">${escapeHtml(
          state.lang === "uk" ? "Відправити" : "Send"
        )}</button>
        </form>
      </div>
    </section>
  `;

  // Clear draft after we've rendered it into the form.
  if (draft) localStorage.removeItem(STORAGE_REQUEST_DRAFT);

  const form = document.querySelector("#support-form");
  const submitBtn = document.querySelector("#r_submit");
  const successBox = document.querySelector("#r_success");
  const errorBox = document.querySelector("#r_error");
  const emailErr = document.querySelector("#r_email_err");
  const deviceErr = document.querySelector("#r_device_err");
  const msgErr = document.querySelector("#r_msg_err");

  const setBox = (el, text) => {
    if (!el) return;
    const textEl = el.querySelector(".alert-text");
    const msg = String(text || "").trim();
    if (textEl) textEl.textContent = msg;
    el.style.display = msg ? "flex" : "none";
  };

  const clearFieldErrors = () => {
    if (emailErr) emailErr.textContent = "";
    if (deviceErr) deviceErr.textContent = "";
    if (msgErr) msgErr.textContent = "";
  };

  // close buttons
  [successBox, errorBox].forEach((box) => {
    const btn = box?.querySelector(".alert-close");
    if (btn) btn.addEventListener("click", () => setBox(box, ""));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearFieldErrors();
    setBox(errorBox, "");
    setBox(successBox, "");

    const fd = new FormData(form);
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    let hasError = false;
    if (!email) {
      hasError = true;
      if (emailErr) emailErr.textContent = state.lang === "uk" ? "Вкажіть email." : "Email is required.";
    }
    if (!message) {
      hasError = true;
      if (msgErr) msgErr.textContent = state.lang === "uk" ? "Опишіть проблему." : "Message is required.";
    }
    if (hasError) return;

    const prevLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = state.lang === "uk" ? "Відправляємо…" : "Sending…";

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        form.reset();
        setBox(
          successBox,
          state.lang === "uk"
            ? "Дякуємо! Запит відправлено. Ми відповімо на email."
            : "Thanks! Your request was sent. We’ll reply by email."
        );
        return;
      }

      let data = null;
      try {
        data = await res.json();
      } catch {
        // ignore
      }

      const fallback =
        state.lang === "uk"
          ? "Не вдалося відправити. Спробуйте ще раз пізніше."
          : "Failed to submit. Please try again later.";

      if (data && Array.isArray(data.errors) && data.errors.length) {
        // Example: [{field:"email", message:"..."}]
        const fieldMsgs = {};
        data.errors.forEach((err) => {
          const field = String(err.field || "").trim();
          const msg = String(err.message || "").trim();
          if (!field) return;
          fieldMsgs[field] = msg || fieldMsgs[field] || "";
        });

        if (fieldMsgs.email && emailErr) emailErr.textContent = fieldMsgs.email;
        if (fieldMsgs.device && deviceErr) deviceErr.textContent = fieldMsgs.device;
        if (fieldMsgs.message && msgErr) msgErr.textContent = fieldMsgs.message;

        const formLevel = data.errors
          .filter((x) => !x.field)
          .map((x) => x.message)
          .filter(Boolean)
          .join("\n");
        setBox(errorBox, formLevel || fallback);
      } else {
        setBox(errorBox, fallback);
      }
    } catch {
      setBox(
        errorBox,
        state.lang === "uk"
          ? "Проблема з мережею. Перевірте інтернет і спробуйте ще раз."
          : "Network error. Check your connection and try again."
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = prevLabel;
    }
  });
}

function renderSearchResults() {
  const t = i18n[state.lang];
  const main = document.querySelector("#main");
  const results = searchFaqs({ query: state.query, lang: state.lang, category: state.categoryFilter });

  const catFilterLabel =
    state.categoryFilter === "all"
      ? t.allCategories
      : (getCat(state.categoryFilter)?.title[state.lang] || state.categoryFilter);

  main.innerHTML = `
    <section class="wrap" style="padding: 18px 0 40px;">
      <div style="display:flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
        <div style="font-size: 16px; font-weight: 700;">${escapeHtml(t.results)} (${results.length})</div>
        <div style="display:flex; align-items:center; gap: 10px; color: rgba(0,0,0,0.62); font-size: 14px;">
          <span>${escapeHtml(catFilterLabel)}</span>
          <select id="catFilter" style="border: 1px solid var(--line); border-radius: 10px; padding: 10px 10px; font-size: 14px;">
            <option value="all"${state.categoryFilter === "all" ? " selected" : ""}>${escapeHtml(t.allCategories)}</option>
            ${categories
              .map(
                (c) =>
                  `<option value="${escapeHtml(c.key)}"${
                    state.categoryFilter === c.key ? " selected" : ""
                  }>${escapeHtml(c.title[state.lang])}</option>`
              )
              .join("")}
          </select>
        </div>
      </div>
      <div style="height: 14px;"></div>
      ${
        results.length === 0
          ? `<div style="color: rgba(0,0,0,0.65);">${escapeHtml(t.noResults)}</div>`
          : `<div style="border: 1px solid var(--line); border-radius: 10px; background: #fff; overflow:hidden;">
              ${results
                .slice(0, 30)
                .map((f, idx) => {
                  const cat = getCat(f.category);
                  const preview = excerpt(f.a[state.lang] || "", 170);
                  return `
                    <a href="#/q/${escapeHtml(f.id)}" style="display:block; padding: 14px 16px; border-top: 1px solid var(--line); text-decoration:none; color: inherit;">
                      <div style="font-size: 15px; font-weight: 700;">${highlightHtml(f.q[state.lang], state.query)}</div>
                      <div style="margin-top: 6px; color: rgba(0,0,0,0.72); font-size: 14px; line-height: 1.5;">
                        ${highlightHtml(preview, state.query)}
                      </div>
                      <div style="margin-top: 4px; color: rgba(0,0,0,0.62); font-size: 13px;">
                        ${escapeHtml(cat ? cat.title[state.lang] : f.category)} · #${escapeHtml(f.id)}
                      </div>
                    </a>
                  `;
                })
                .join("")
                .replace('border-top: 1px solid var(--line);', "")}
            </div>`
      }
    </section>
  `;

  const sel = document.querySelector("#catFilter");
  if (sel) {
    sel.addEventListener("change", () => {
      state.categoryFilter = sel.value || "all";
      renderApp();
    });
  }

  // If user clicks a result, we want to actually open the question page.
  // Clear search to avoid search overlay "winning" the route render.
  document.querySelectorAll('a[href^="#/q/"]').forEach((a) => {
    a.addEventListener("click", () => {
      // Let hash navigation happen, but clear query first.
      clearSearchUI();
    });
  });
}

function excerpt(text, maxLen) {
  const s = String(text || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!s) return "";
  if (s.length <= maxLen) return s;
  return s.slice(0, Math.max(0, maxLen - 1)).trimEnd() + "…";
}

function splitCols(items, cols) {
  const out = Array.from({ length: cols }, () => []);
  items.forEach((item, idx) => out[idx % cols].push(item));
  return out;
}

function bindShellEvents() {
  const input = document.querySelector("#search");
  let timer = null;
  input.addEventListener("input", () => {
    state.query = input.value || "";
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      state.lastQueryForHighlight = state.query;
      // Search always shows results in the main area while query is non-empty.
      renderApp();
    }, 120);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      clearSearchUI();
      renderApp();
    }
  });

  const langBtn = document.querySelector("#langBtn");
  langBtn.addEventListener("click", () => {
    state.lang = state.lang === "uk" ? "en" : "uk";
    localStorage.setItem(STORAGE_LANG, state.lang);
    renderApp();
  });

  // Help dialog
  const helpBtn = document.querySelector("#helpBtn");
  const dlg = document.querySelector("#helpDialog");
  helpBtn.addEventListener("click", () => {
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
  });

  // If user submits draft from the dialog, forward to the request page
  // and prefill the message.
  const helpForm = dlg.querySelector("form");
  const helpDraft = dlg.querySelector("#helpDraft");
  const helpSendBtn = helpForm.querySelector('button[value="send"]');
  if (helpForm && helpDraft && helpSendBtn) {
    helpSendBtn.addEventListener("click", () => {
      const text = String(helpDraft.value || "").trim();
      if (text) localStorage.setItem(STORAGE_REQUEST_DRAFT, text);
      if (typeof dlg.close === "function") dlg.close();
      go({ name: "request" }, { clearSearch: true });
    });
  }
}

function renderApp() {
  if (!document.querySelector("#main")) renderShell();

  const route = parseRoute();
  // If user is explicitly navigating to a page, let the route win.
  // Search is a "home overlay" experience.
  if (route.name === "home" && tokenize(state.query).length > 0) {
    renderSearchResults();
    return;
  }
  if (route.name === "home") return renderHome();
  if (route.name === "category") return renderCategory(route.key);
  if (route.name === "question") return renderQuestion(route.id);
  if (route.name === "request") return renderRequest();
  return renderHome();
}

function init() {
  const saved = localStorage.getItem(STORAGE_LANG);
  if (saved === "uk" || saved === "en") state.lang = saved;
  window.addEventListener("hashchange", () => renderApp());
  renderShell();
  renderApp();

  // Force branded favicon (avoids aggressive browser favicon cache).
  const head = document.head || document.querySelector("head");
  if (head) {
    let link = head.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "icon");
      head.appendChild(link);
    }
    link.setAttribute("type", "image/png");
    link.setAttribute("href", nymoFaviconUrl);
  }
}

init();
