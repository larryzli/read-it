const axios = require("axios");

const pullHot = (req, res, next) => {
  let baseURL = "https://www.reddit.com/hot.json?";
  const { limit, after } = req.query;
  if (req.query) {
    if (limit) {
      baseURL += `limit=${limit}&`;
    }
    if (after) {
      baseURL += `after=${after}&`;
    }
  }
  axios
    .get(baseURL)
    .then(response =>
      res.status(200).json({
        posts: response.data.data.children.map(el => {
          let o = el.data;
          return {
            domain: o.domain,
            subreddit_title: o.subreddit,
            subreddit_id: o.subreddit_id,
            author: o.author,
            post_title: o.title,
            num_comments: o.num_comments,
            score: o.score,
            created_utc: o.created_utc,
            post_id: o.id,
            post_thumbnail: o.thumbnail,
            over_18: o.over_18,
            url: o.url,
            permalink: o.permalink
          };
        }),
        after: response.data.data.after
      })
    )
    .catch(console.log);
};

const pullBest = (req, res, next) => {
  let baseURL = "https://www.reddit.com/best.json?";
  const { limit, after } = req.query;
  if (req.query) {
    if (limit) {
      baseURL += `limit=${limit}&`;
    } else if (after) {
      baseURL += `after=${after}&`;
    }
  }
  axios
    .get(baseURL)
    .then(response =>
      res.status(200).json({
        posts: response.data.data.children.map(el => {
          let o = el.data;
          return {
            domain: o.domain,
            subreddit_title: o.subreddit,
            subreddit_id: o.subreddit_id,
            author: o.author,
            post_title: o.title,
            num_comments: o.num_comments,
            score: o.score,
            created_utc: o.created_utc,
            post_id: o.id,
            post_thumbnail: o.thumbnail,
            over_18: o.over_18
          };
        }),
        after: response.data.data.after
      })
    )
    .catch(console.log);
};

module.exports = {
  pullHot,
  pullBest
};
