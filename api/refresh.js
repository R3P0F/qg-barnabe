// Renew an access token from a refresh token (client secret stays server-side).
import { cors } from "./_tt.js";
export default async function handler(req, res) {
  if (cors(req, res)) return;
  const { refresh_token } = req.body || {};
  if (!refresh_token) return res.status(400).json({ error: "refresh_token required" });
  const r = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY, client_secret: process.env.TIKTOK_CLIENT_SECRET,
      grant_type: "refresh_token", refresh_token,
    }),
  });
  const j = await r.json();
  if (!j.access_token) return res.status(400).json(j);
  res.json({ access_token: j.access_token, open_id: j.open_id, scope: j.scope, expires_in: j.expires_in,
    refresh_token: j.refresh_token, refresh_expires_in: j.refresh_expires_in });
}
