// Content Posting API: follow the publishing status of a post.
import { cors, tt } from "./_tt.js";
export default async function handler(req, res) {
  if (cors(req, res)) return;
  const { token, publish_id } = req.body || {};
  res.json(await tt("/v2/post/publish/status/fetch/", token, { publish_id }));
}
