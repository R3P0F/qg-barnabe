// user.info.basic + user.info.profile + user.info.stats + video.list : profile and video statistics.
import { cors } from "./_tt.js";
export default async function handler(req, res) {
  if (cors(req, res)) return;
  const { token } = req.body || {};
  const H = { Authorization: "Bearer " + token };
  const u = await (await fetch("https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name,username,bio_description,profile_deep_link,is_verified,follower_count,following_count,likes_count,video_count", { headers: H })).json();
  const v = await (await fetch("https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,cover_image_url,share_url,view_count,like_count,comment_count,share_count,create_time", {
    method: "POST", headers: { ...H, "Content-Type": "application/json" }, body: JSON.stringify({ max_count: 20 }) })).json();
  res.json({ user: u.data && u.data.user, videos: (v.data && v.data.videos) || [], error: u.error });
}
