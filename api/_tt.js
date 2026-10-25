// Shared helpers for the QG Barnabe TikTok backend (Vercel serverless).
const ORIGINS = ["https://r3p0f.github.io"];
export function cors(req, res) {
  const o = req.headers.origin;
  if (ORIGINS.includes(o)) res.setHeader("Access-Control-Allow-Origin", o);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(204).end(); return true; }
  if (req.method !== "POST") { res.status(405).json({ error: "POST only" }); return true; }
  return false;
}
export async function tt(path, token, body) {
  const r = await fetch("https://open.tiktokapis.com" + path, {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(body || {}),
  });
  return r.json();
}
