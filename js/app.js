/* World Cup 2026 — Morocco Lesson Plans Platform */

const SECTION_KEYWORDS = {
  intro: ["introduction", "introducción", "introduccion"],
  lesson1: ["lesson 1", "leçon 1", "leccion 1", "lección 1"],
  lesson2: ["lesson 2", "leçon 2", "leccion 2", "lección 2"],
  lesson3: ["lesson 3", "leçon 3", "leccion 3", "lección 3"],
  lesson4: ["lesson 4", "leçon 4", "leccion 4", "lección 4"],
  lesson5: ["lesson 5", "leçon 5", "leccion 5", "lección 5"],
};

const CONFIG = {
  defaultLang: "fr",
  languages: {
    fr: {
      code: "fr",
      label: "Français",
      flag: "🇫🇷",
      file: "documents/fr.docx",
      downloadName: "Plans_Lecons_CDM2026_Maroc_FR.docx",
      ui: {
        badge: "Éducation · Coupe du Monde 2026",
        heroTitle: "Plans de leçons — Maroc 🇲🇦",
        heroSubtitle:
          "Découvrez 5 leçons interactives sur la Coupe du Monde 2026, la culture footballistique marocaine et le parcours des Lions de l'Atlas.",
        statLessons: "Leçons",
        statLangs: "Langues",
        statTopic: "Thème",
        statTopicVal: "CDM 2026",
        tocTitle: "Sommaire",
        viewerTitle: "Document en cours",
        scrollHint: "Faites défiler pour lire ↓",
        loading: "Chargement du document…",
        loadingSub: "Préparation de votre expérience football ⚽",
        download: "Télécharger",
        footer: "Coupe du Monde FIFA 2026 · Plans de leçons — Maroc",
      },
      toc: [
        { id: "intro", label: "Introduction", num: "★" },
        { id: "lesson1", label: "Leçon 1 : Équipes, groupes et Maroc", num: "1" },
        { id: "lesson2", label: "Leçon 2 : Culture et symboles", num: "2" },
        { id: "lesson3", label: "Leçon 3 : Le parcours du Maroc", num: "3" },
        { id: "lesson4", label: "Leçon 4 : Regarder le match ensemble", num: "4" },
        { id: "lesson5", label: "Leçon 5 : Au match — Encourager le Maroc", num: "5" },
      ],
    },
    en: {
      code: "en",
      label: "English",
      flag: "🇺🇸",
      file: "documents/en.docx",
      downloadName: "Lesson_Plans_WC2026_Morocco_EN.docx",
      ui: {
        badge: "Education · World Cup 2026",
        heroTitle: "Lesson Plans — Morocco 🇲🇦",
        heroSubtitle:
          "Explore 5 interactive lessons about the 2026 World Cup, Moroccan football culture, and the Atlas Lions' journey.",
        statLessons: "Lessons",
        statLangs: "Languages",
        statTopic: "Theme",
        statTopicVal: "WC 2026",
        tocTitle: "Table of Contents",
        viewerTitle: "Current document",
        scrollHint: "Scroll to read ↓",
        loading: "Loading document…",
        loadingSub: "Getting your football experience ready ⚽",
        download: "Download",
        footer: "FIFA World Cup 2026 · Lesson Plans — Morocco",
      },
      toc: [
        { id: "intro", label: "Introduction", num: "★" },
        { id: "lesson1", label: "Lesson 1: Teams, Groups, and Morocco", num: "1" },
        { id: "lesson2", label: "Lesson 2: Culture and Symbols", num: "2" },
        { id: "lesson3", label: "Lesson 3: Morocco's Journey", num: "3" },
        { id: "lesson4", label: "Lesson 4: Watch the Game Together", num: "4" },
        { id: "lesson5", label: "Lesson 5: At the Match — Supporting Morocco", num: "5" },
      ],
    },
    es: {
      code: "es",
      label: "Español",
      flag: "🇪🇸",
      file: "documents/es.docx",
      downloadName: "Planes_Lecciones_CM2026_Marruecos_ES.docx",
      ui: {
        badge: "Educación · Copa Mundial 2026",
        heroTitle: "Planes de lección — Marruecos 🇲🇦",
        heroSubtitle:
          "Descubre 5 lecciones interactivas sobre la Copa Mundial 2026, la cultura futbolística marroquí y el recorrido de los Leones del Atlas.",
        statLessons: "Lecciones",
        statLangs: "Idiomas",
        statTopic: "Tema",
        statTopicVal: "CM 2026",
        tocTitle: "Índice",
        viewerTitle: "Documento actual",
        scrollHint: "Desplázate para leer ↓",
        loading: "Cargando documento…",
        loadingSub: "Preparando tu experiencia futbolística ⚽",
        download: "Descargar",
        footer: "Copa Mundial FIFA 2026 · Planes de lección — Marruecos",
      },
      toc: [
        { id: "intro", label: "Introducción", num: "★" },
        { id: "lesson1", label: "Lección 1: Equipos, grupos y Marruecos", num: "1" },
        { id: "lesson2", label: "Lección 2: Cultura y símbolos", num: "2" },
        { id: "lesson3", label: "Lección 3: El recorrido de Marruecos", num: "3" },
        { id: "lesson4", label: "Lección 4: Ver el partido juntos", num: "4" },
        { id: "lesson5", label: "Lección 5: En el partido — Apoyando a Marruecos", num: "5" },
      ],
    },
  },
};

let currentLang = CONFIG.defaultLang;
let isLoading = false;
let sectionElements = {};
let scrollSaveTimer = null;
let activeSectionId = null;

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function scrollKey(lang) {
  return `wc2026-scroll-${lang}`;
}

function sectionKey(lang) {
  return `wc2026-section-${lang}`;
}

function normalizeText(text) {
  return (text || "").toLowerCase().replace(/\s+/g, " ").trim();
}

/* ── Floating balls ── */
function initBalls() {
  const container = $("#floating-balls");
  if (!container) return;
  const emojis = ["⚽", "🏆", "🇲🇦", "⚽", "🌍", "⚽"];
  for (let i = 0; i < 12; i++) {
    const el = document.createElement("span");
    el.className = "ball";
    el.textContent = emojis[i % emojis.length];
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${12 + Math.random() * 18}s`;
    el.style.animationDelay = `${Math.random() * 15}s`;
    container.appendChild(el);
  }
}

/* ── UI updates ── */
function updateUIText(lang) {
  const cfg = CONFIG.languages[lang];
  const ui = cfg.ui;

  $("#hero-badge").textContent = ui.badge;
  $("#hero-title").textContent = ui.heroTitle;
  $("#hero-subtitle").textContent = ui.heroSubtitle;
  $("#stat-lessons-label").textContent = ui.statLessons;
  $("#stat-langs-label").textContent = ui.statLangs;
  $("#stat-topic-label").textContent = ui.statTopic;
  $("#stat-topic-val").textContent = ui.statTopicVal;
  $("#sidebar-title").textContent = ui.tocTitle;
  $("#viewer-title").textContent = ui.viewerTitle;
  $("#scroll-hint").textContent = ui.scrollHint;
  $("#loading-text").textContent = ui.loading;
  $("#loading-sub").textContent = ui.loadingSub;
  $("#footer-text").textContent = ui.footer;
  $("#download-btn span").textContent = ui.download;

  const dl = $("#download-btn");
  dl.href = cfg.file;
  dl.download = cfg.downloadName;

  buildTOC(cfg);
}

/* ── Table of contents ── */
function buildTOC(cfg) {
  const list = $("#toc-list");
  list.innerHTML = "";

  cfg.toc.forEach((item) => {
    const li = document.createElement("li");
    li.className = "toc-item";
    li.innerHTML = `
      <a href="#section-${item.id}" data-section="${item.id}">
        <span class="toc-num">${item.num}</span>
        <span>${item.label}</span>
      </a>`;
    list.appendChild(li);
  });

  list.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      goToSection(a.dataset.section);
      closeSidebar();
    });
  });

  highlightTOC(activeSectionId);
}

/* ── Section indexing ── */
function matchesSectionHead(text, sectionId, labelNorm) {
  if (!text) return false;
  const head = text.slice(0, 120);
  const keywords = SECTION_KEYWORDS[sectionId] || [];
  const labelStart = labelNorm.split(":")[0].trim();

  if (head.startsWith(labelStart)) return true;
  if (keywords.some((k) => {
    const idx = head.indexOf(k);
    return idx >= 0 && idx < 40;
  })) return true;

  return false;
}

function isSectionCandidate(el) {
  if (!el || el.closest("table")) return false;
  const tag = el.tagName;
  return tag === "H1" || tag === "H2" || tag === "H3" || tag === "H4" || tag === "P";
}

function indexSections() {
  const viewer = $("#viewer");
  if (!viewer) return;

  viewer.querySelectorAll('[id^="section-"]').forEach((el) => el.removeAttribute("id"));
  sectionElements = {};

  const cfg = CONFIG.languages[currentLang];
  const candidates = [...viewer.querySelectorAll("h1, h2, h3, h4, p")].filter(isSectionCandidate);
  let searchFrom = 0;

  for (const item of cfg.toc) {
    const labelNorm = normalizeText(item.label);

    for (let i = searchFrom; i < candidates.length; i++) {
      const el = candidates[i];
      const text = normalizeText(el.textContent || "");
      if (!text || text.length > 800) continue;

      if (matchesSectionHead(text, item.id, labelNorm)) {
        el.id = `section-${item.id}`;
        sectionElements[item.id] = el;
        searchFrom = i + 1;
        break;
      }
    }
  }
}

function getSectionLabel(sectionId) {
  if (!sectionId) return "";
  const cfg = CONFIG.languages[currentLang];
  const item = cfg.toc.find((t) => t.id === sectionId);
  return item ? item.label : "";
}

/* ── Navigation ── */
function getElementScrollTop(el, viewer) {
  const viewerRect = viewer.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return elRect.top - viewerRect.top + viewer.scrollTop;
}

function scrollViewerToSection(sectionId, smooth = true) {
  const target = sectionElements[sectionId] || document.getElementById(`section-${sectionId}`);
  const viewer = $("#viewer");
  if (!target || !viewer) return false;

  if (!sectionElements[sectionId]) sectionElements[sectionId] = target;

  const offset = getElementScrollTop(target, viewer) - 24;
  viewer.scrollTo({ top: Math.max(0, offset), behavior: smooth ? "smooth" : "auto" });
  setActiveSection(sectionId);
  updateProgressBar();
  return true;
}

function goToSection(sectionId) {
  if (isLoading) return;

  const tryScroll = () => {
    indexSections();
    return scrollViewerToSection(sectionId, true);
  };

  if (tryScroll()) return;

  let tries = 0;
  const retry = setInterval(() => {
    tries += 1;
    if (tryScroll() || tries >= 20) clearInterval(retry);
  }, 150);
}

function setActiveSection(sectionId) {
  activeSectionId = sectionId;
  highlightTOC(sectionId);

  const label = getSectionLabel(sectionId);
  const el = $("#viewer-section-label");
  if (el) el.textContent = label || "";

  try {
    localStorage.setItem(sectionKey(currentLang), sectionId);
  } catch (_) {}
}

function highlightTOC(sectionId) {
  $$("#toc-list a").forEach((a) => {
    a.classList.toggle("active", a.dataset.section === sectionId);
  });
}

/* ── Scroll progress & spy ── */
function updateProgressBar() {
  const viewer = $("#viewer");
  const fill = $("#progress-fill");
  if (!viewer || !fill) return;

  const max = viewer.scrollHeight - viewer.clientHeight;
  const pct = max > 0 ? (viewer.scrollTop / max) * 100 : 0;
  fill.style.width = `${Math.min(100, Math.max(0, pct))}%`;
}

function detectActiveSectionOnScroll() {
  const viewer = $("#viewer");
  if (!viewer || Object.keys(sectionElements).length === 0) return;

  const scrollTop = viewer.scrollTop + 60;
  let current = "intro";

  for (const id of Object.keys(SECTION_KEYWORDS)) {
    const el = sectionElements[id];
    if (!el) continue;
    if (scrollTop >= getElementScrollTop(el, viewer) - 30) current = id;
  }

  if (current !== activeSectionId) setActiveSection(current);
}

function saveScrollPosition() {
  const viewer = $("#viewer");
  if (!viewer || isLoading) return;
  try {
    localStorage.setItem(scrollKey(currentLang), String(viewer.scrollTop));
  } catch (_) {}
}

function onViewerScroll() {
  updateProgressBar();
  detectActiveSectionOnScroll();

  clearTimeout(scrollSaveTimer);
  scrollSaveTimer = setTimeout(saveScrollPosition, 200);
}

function setupViewerScrollListener() {
  const viewer = $("#viewer");
  if (!viewer) return;
  viewer.removeEventListener("scroll", onViewerScroll);
  viewer.addEventListener("scroll", onViewerScroll, { passive: true });
}

function restoreReadingState() {
  const viewer = $("#viewer");
  if (!viewer) return;

  indexSections();

  let savedSection = null;
  try {
    savedSection = localStorage.getItem(sectionKey(currentLang));
  } catch (_) {}

  if (savedSection && sectionElements[savedSection]) {
    scrollViewerToSection(savedSection, false);
    return;
  }

  let savedScroll = null;
  try {
    savedScroll = localStorage.getItem(scrollKey(currentLang));
  } catch (_) {}

  if (savedScroll) {
    viewer.scrollTop = parseInt(savedScroll, 10) || 0;
    detectActiveSectionOnScroll();
    updateProgressBar();
  }
}

/* ── Load document ── */
async function loadDocument(lang) {
  if (isLoading) return;
  isLoading = true;

  saveScrollPosition();

  const cfg = CONFIG.languages[lang];
  const viewer = $("#viewer");
  const overlay = $("#loading-overlay");

  overlay.classList.remove("hidden");
  overlay.style.display = "flex";
  viewer.innerHTML = "";
  $("#progress-fill").style.width = "0%";
  $("#viewer-section-label").textContent = "";
  sectionElements = {};

  try {
    const response = await fetch(cfg.file);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();

    await docx.renderAsync(blob, viewer, null, {
      className: "docx",
      inWrapper: true,
      ignoreWidth: false,
      ignoreHeight: false,
      breakPages: true,
      ignoreLastRenderedPageBreak: true,
      experimental: true,
      trimXmlDeclaration: true,
      useBase64URL: true,
      renderHeaders: true,
      renderFooters: true,
      renderFootnotes: true,
      renderEndnotes: true,
    });

    requestAnimationFrame(() => {
      indexSections();
      setupViewerScrollListener();
      restoreReadingState();
      updateProgressBar();
    });
  } catch (err) {
    viewer.innerHTML = `
      <div style="padding:3rem;text-align:center;color:#c1272d;font-family:sans-serif;">
        <p style="font-size:2rem;margin-bottom:1rem;">⚠️</p>
        <p style="font-weight:600;margin-bottom:0.5rem;">Impossible de charger le document.</p>
        <p style="color:#666;font-size:0.9rem;">Lancez le serveur local avec <code>start.bat</code> puis ouvrez <a href="http://localhost:8080">http://localhost:8080</a></p>
        <p style="color:#999;font-size:0.8rem;margin-top:1rem;">${err.message}</p>
      </div>`;
  } finally {
    setTimeout(() => {
      overlay.classList.add("hidden");
      isLoading = false;
    }, 400);
  }
}

/* ── Language switch ── */
function switchLanguage(lang) {
  if (lang === currentLang && !isLoading) return;

  if (!isLoading && currentLang !== lang) saveScrollPosition();

  currentLang = lang;
  activeSectionId = null;

  $$(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
  });

  updateUIText(lang);
  loadDocument(lang);

  try {
    localStorage.setItem("wc2026-lang", lang);
  } catch (_) {}
}

/* ── Sidebar mobile ── */
function toggleSidebar() {
  $("#sidebar").classList.toggle("open");
  $("#sidebar-backdrop").classList.toggle("open");
}

function closeSidebar() {
  $("#sidebar").classList.remove("open");
  $("#sidebar-backdrop").classList.remove("open");
}

/* ── Init ── */
document.addEventListener("DOMContentLoaded", () => {
  initBalls();

  let savedLang = CONFIG.defaultLang;
  try {
    savedLang = localStorage.getItem("wc2026-lang") || CONFIG.defaultLang;
  } catch (_) {}
  if (!CONFIG.languages[savedLang]) savedLang = CONFIG.defaultLang;

  $$(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchLanguage(btn.dataset.lang));
  });

  $("#menu-toggle").addEventListener("click", toggleSidebar);
  $("#sidebar-backdrop").addEventListener("click", closeSidebar);

  switchLanguage(savedLang);
});
