const {
  getPost,
  getMoreComments,
  continueThread,
  reply,
  deleteComment,
  editComment,
  lockPost,
  unlockPost,
  report,
  hide,
  unhide,
  submit
} = require("./postsController");

module.exports = function(app) {
  app.get("/api/post/:subreddit_title/:post_id", getPost);
  app.get("/api/post/comments/more/:post_id/:children", getMoreComments);
  app.get(
    "/api/post/:subreddit_title/:post_id/:title/:parent_id",
    continueThread
  );
  // REPLY EXPECTS (parentId, text) EXAMPLE ('t1_nfj43n', 'Hello world')
  app.post("/api/reply", reply);
  // COMMENT DELETE EXPECTS (id) EXAMPLE ('t1_duckn4b') NOTE: on reddits data, this id can be found on the property 'name'
  app.post("/api/comment/delete", deleteComment);
  // COMMENT EDIT EXPECTS (id, text) EXAMPLE ('t1_duckn4b', 'Test Edit') NOTE: on reddits data, this id can be found on the property 'name'
  app.post("/api/comment/edit", editComment);
  // LOCK AND UNLOCK A POST FROM RECEIVING NEW COMMENTS EXPECTS (id) EXAMPLE (t3_nsdk4)
  app.post("/api/post/lock", lockPost);
  app.post("/api/post/unlock", unlockPost);
  // REPORTS A POST/COMMENT, EXPECTS (reason, id) EXAMPLE ('This comment sucks', 't1_duckn4b')
  app.post("/api/post/report", report);
  // HIDES A POST, EXPECTS (id)
  app.post("/api/post/hide", hide);
  // UNHIDES A POST, EXPECTS (id)
  app.post("/api/post/unhide", unhide);
  // SUBMITS A NEW POST, EXPECTS (kind, title, text, sr, url) EXAMPLE ('link', 'This is a Title', 'Text body', 'readitTestit', 'No idea what this is for')
  app.post("/api/post/submit", submit);
};
