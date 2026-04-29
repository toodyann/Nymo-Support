export function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[`"'’“”]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(query) {
  const q = normalize(query);
  if (!q) return [];
  // Keep short tokens too (e.g., "2fa", "vpn") but ignore 1-letter noise.
  return q
    .split(" ")
    .map((t) => t.trim())
    .filter((t) => t.length >= 2)
    .slice(0, 10);
}

export function scoreEntry(entry, lang, query) {
  const tokens = tokenize(query);
  if (tokens.length === 0) return 0;

  const qText = normalize(entry.q?.[lang] || "");
  const aText = normalize(entry.a?.[lang] || "");
  const tags = normalize((entry.tags || []).join(" "));

  let score = 0;
  for (const t of tokens) {
    if (qText.includes(t)) score += 5;
    if (tags.includes(t)) score += 3;
    if (aText.includes(t)) score += 1;
  }

  // Slightly bias by popularity when score ties.
  const pop = Number.isFinite(entry.popularityRank) ? entry.popularityRank : 999;
  score += Math.max(0, 40 - pop) * 0.02;

  return score;
}

export function escapeHtml(unsafe) {
  return String(unsafe)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function highlightHtml(text, query) {
  const tokens = tokenize(query);
  if (tokens.length === 0) return escapeHtml(text);

  let html = escapeHtml(text);
  for (const t of tokens) {
    const safe = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(${safe})`, "ig");
    html = html.replace(re, "<mark>$1</mark>");
  }
  return html;
}

