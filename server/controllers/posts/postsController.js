const axios = require("axios");

const getPost = (req, res, next) => {
  const { subreddit_title, post_id } = req.params;
  axios
    .get(`https://www.reddit.com/r/${subreddit_title}/${post_id}.json`)
    .then(response => {
      let r = response.data[0].data.children[0].data;
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
          image: r.preview.images[0].source.url,
          upvote_ratio: r.upvote_ratio,
          is_self: r.is_self,
          over_18: r.over_18,
          thumbnail: r.thumbnail,
          video: () => {
            if (r.preview.reddit_video_preview.fallback_url) {
              return r.preview.reddit_video_preview.fallback_url;
            } else {
              return false;
            }
          }
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

module.exports = {
  getPost,
  getMoreComments
};
