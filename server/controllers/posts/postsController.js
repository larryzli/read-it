const axios = require("axios");
const querystring = require("querystring");

const getPost = (req, res, next) => {
  const { subreddit_title, post_id } = req.params;
  axios
    .get(`https://www.reddit.com/r/${subreddit_title}/${post_id}.json`)
    .then(response => {
      let r = response.data[0].data.children[0].data;
      console.log(r);
      res.status(200).json({
        post: {
          domain: r.domain,
          subreddit_title: subreddit_title,
          post_id: post_id,
          post_title: r.title,
          created_at: r.created_utc,
          author: r.author,
          body: r.selftext,
          score: r.score,
          url: r.url,
          created: r.created,
          comments_num: r.num_comments,
          image: r.preview
            ? r.preview.images[0].source.url.split("amp;").join("")
            : "",
          upvote_ratio: r.upvote_ratio,
          is_self: r.is_self,
          over_18: r.over_18,
          thumbnail: r.thumbnail,
          video: r.preview
            ? r.preview.reddit_video_preview
              ? r.preview.reddit_video_preview.fallback_url
              : false
            : false
        },
        comments: response.data[1].data.children
      });
    })
    .catch(console.log);
};

const getMoreComments = (req, res, next) => {
  const { post_id, children } = req.params;
  axios
    .get(
      `https://www.reddit.com/api/morechildren.json?link_id=t3_${post_id}&children=${children}&api_type=json`
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(console.log);
};

const reply = (req, res, next) => {
  const { parentId, text } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      `https://oauth.reddit.com/api/comment`,
      querystring.stringify({
        api_type: "json",
        thing_id: `${parentId}`,
        text: `${text}`
      }),
      {
        headers: {
          Authorization: `Bearer ${req.body.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
        }
      }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

const deleteComment = (req, res, next) => {
  const { id } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/del",
      querystring.stringify({
        id: id
      }),
      {
        headers: {
          Authorization: `bearer ${req.user.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
        }
      }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

const editComment = (req, res, next) => {
  const { id, text } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/editusertext",
      querystring.stringify({
        thing_id: id,
        text: text,
        api_type: "json"
      }),
      {
        headers: {
          Authorization: `bearer ${req.user.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
        }
      }
    )
    .then(response => console.log(response))
    .catch(console.log);
};

const lockPost = (req, res, next) => {
  const { id } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/lock",
      querystring.stringify({
        id: id
      }),
      {
        headers: {
          Authorization: `bearer ${req.user.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
        }
      }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

const unlockPost = (req, res, next) => {
  const { id } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/unlock",
      querystring.stringify({
        id: id
      }),
      {
        headers: {
          Authorization: `bearer ${req.user.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
        }
      }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

const report = (req, res, next) => {
  const { reason, id } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/report",
      querystring.stringify({
        api_type: "json",
        reason: reason,
        thing_id: id
      }),
      {
        headers: {
          Authorization: `bearer ${req.user.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
        }
      }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

const hide = (req, res, next) => {
  const { id } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/hide",
      querystring.stringify({
        id: id
      }),
      {
        headers: {
          Authorization: `bearer ${req.user.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
        }
      }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

const unhide = (req, res, next) => {
  const { id } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/unhide",
      querystring.stringify({
        id: id
      }),
      {
        headers: {
          Authorization: `bearer ${req.user.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
        }
      }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

const submit = (req, res, next) => {
  const { kind, title, text, sr, url } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/submit",
      querystring.stringify({
        api_type: "json",
        kind: kind,
        title: title,
        text: text,
        sr: sr,
        url: url
      }),
      {
        headers: {
          Authorization: `bearer ${req.user.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
        }
      }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

module.exports = {
  getPost,
  getMoreComments,
  reply,
  deleteComment,
  editComment,
  lockPost,
  unlockPost,
  report,
  hide,
  unhide,
  submit
};
