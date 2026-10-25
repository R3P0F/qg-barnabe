// Exchange the Login Kit authorization code for an access token (client secret stays server-side).
import { cors } from "./_tt.js";
export default async function handler(req, res) {
  if (cors(req, res)) return;
  const { code, redirect_uri } = req.body || {};
  const r = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY, client_secret: process.env.TIKTOK_CLIENT_SECRET,
      code, grant_type: "authorization_code", redirect_uri,
    }),
  });
  const j = await r.json();
  if (!j.access_token) return res.status(400).json(j);
  res.json({ access_token: j.access_token, open_id: j.open_id, scope: j.scope, expires_in: j.expires_in });
}
