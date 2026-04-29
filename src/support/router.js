export function parseRoute() {
  // Routes:
  // #/                       home
  // #/c/<categoryKey>         category page
  // #/q/<id>                  question page
  // #/request                 submit request
  const raw = (location.hash || "#/").replace(/^#/, "");
  const parts = raw.split("/").filter(Boolean);
  if (parts.length === 0) return { name: "home" };
  if (parts[0] === "c" && parts[1]) return { name: "category", key: decodeURIComponent(parts[1]) };
  if (parts[0] === "q" && parts[1]) return { name: "question", id: decodeURIComponent(parts[1]) };
  if (parts[0] === "request") return { name: "request" };
  return { name: "home" };
}

export function setRoute(route) {
  if (route.name === "home") location.hash = "#/";
  if (route.name === "category") location.hash = `#/c/${encodeURIComponent(route.key)}`;
  if (route.name === "question") location.hash = `#/q/${encodeURIComponent(route.id)}`;
  if (route.name === "request") location.hash = "#/request";
}

