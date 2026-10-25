// Content Posting API: query creator info (nickname, privacy options, interaction settings, max duration).
import { cors, tt } from "./_tt.js";
export default async function handler(req, res) {
  if (cors(req, res)) return;
  res.json(await tt("/v2/post/publish/creator_info/query/", (req.body || {}).token));
}
