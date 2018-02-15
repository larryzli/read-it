const { getPost, getMoreComments } = require("./postsController");

module.exports = function(app) {
  app.get("/api/post/:subreddit_title/:post_id", getPost);
  app.get("/api/post/comments/more/:post_id/:children", getMoreComments);
};
