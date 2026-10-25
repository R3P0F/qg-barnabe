// Content Posting API (video.publish): Direct Post of the owner's own video, pulled from the verified domain.
import { cors, tt } from "./_tt.js";
export default async function handler(req, res) {
  if (cors(req, res)) return;
  const b = req.body || {};
  if (!String(b.video_url || "").startsWith("https://r3p0f.github.io/qg-barnabe/")) return res.status(400).json({ error: "video must come from the verified domain" });
  const body = {
    post_info: {
      title: b.title, privacy_level: b.privacy_level,
      disable_comment: !!b.disable_comment, disable_duet: !!b.disable_duet, disable_stitch: !!b.disable_stitch,
      brand_content_toggle: !!b.brand_content_toggle, brand_organic_toggle: !!b.brand_organic_toggle,
      is_aigc: !!b.is_aigc, video_cover_timestamp_ms: b.video_cover_timestamp_ms || 1000,
    },
    source_info: { source: "PULL_FROM_URL", video_url: b.video_url },
  };
  res.json(await tt("/v2/post/publish/video/init/", b.token, body));
}
