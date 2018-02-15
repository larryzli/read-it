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
          body: r.selftext
        },
        comments: response.data[1].data.children.map(el => {
          return {
            comment_id: el.data.id,
            author: el.data.author,
            body: el.data.body,
            votes: el.data.score,
            depth: el.data.depth,
            replies: el.data.replies
          };
        })
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
