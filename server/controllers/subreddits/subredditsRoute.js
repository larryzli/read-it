const {
  pullHot,
  pullBest,
  pullNew,
  pullTop,
  pullRising,
  pullControversial,
  pullRandom,
  getUserSubscriptions,
  getDefault,
  sidebar,
  subscribe,
  subredditAbout,
  subredditRules,
  subredditModerators,
  searchSubreddit
} = require("./subredditsController");

module.exports = function (app) {
  app.get("/api/hot", pullHot);
  app.get("/api/best", pullBest);
  app.get("/api/new", pullNew);
  app.get("/api/top", pullTop);
  app.get("/api/rising", pullRising);
  app.get("/api/controversial", pullControversial);
  app.get("/api/random", pullRandom);
  app.get("/api/subscriptions", getUserSubscriptions);
  app.get("/api/default", getDefault)
  app.get("/api/sidebar/:subreddit_name", sidebar);
  app.get("/api/about/:subreddit_name", subredditAbout)
  app.get("/api/rules/:subreddit_name", subredditRules)
  app.get("/api/moderators/:subreddit_name", subredditModerators)
  app.post("/api/search/:subreddit_name", searchSubreddit)
};
