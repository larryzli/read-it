const {
  getPost,
  getMoreComments,
  reply,
  compose,
  deleteComment,
  editComment,
  lockPost,
  unlockPost
} = require("./postsController");

module.exports = function(app) {
  app.get("/api/post/:subreddit_title/:post_id", getPost);
  app.get("/api/post/comments/more/:post_id/:children", getMoreComments);
  // REPLY EXPECTS (parentId, text) EXAMPLE ('t1_nfj43n', 'Hello world')
  app.post("/api/reply", reply);
  // COMPOSE EXPECTS (name, subject, text) EXAMPLE ('domoKing, 'Important', 'Hello')
  app.post("/api/compose", compose);
  // COMMENT DELETE EXPECTS (id) EXAMPLE ('t1_duckn4b') NOTE: on reddits data, this id can be found on the property 'name'
  app.post("/api/comment/delete", deleteComment);
  // COMMENT EDIT EXPECTS (id, text) EXAMPLE ('t1_duckn4b', 'Test Edit') NOTE: on reddits data, this id can be found on the property 'name'
  app.post("/api/comment/edit", editComment);
  // LOCK AND UNLOCK A POST FROM RECEIVING NEW COMMENTS EXPECTS (ID) EXAMPLE (t3_nsdk4)
  app.post("/api/post/lock", lockPost);
  app.post("/api/post/unlock", unlockPost);
};
