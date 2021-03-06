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
  subredditRules,
  subredditModerators,
  searchSubreddit,
  searchSubNames,
  trendingSubreddits
} = require("./subredditsController");

module.exports = function(app) {
  app.get("/api/hot", pullHot);
  app.get("/api/best", pullBest);
  app.get("/api/new", pullNew);
  app.get("/api/top", pullTop);
  app.get("/api/rising", pullRising);
  app.get("/api/controversial", pullControversial);
  app.get("/api/random", pullRandom);
  app.get("/api/subscriptions", getUserSubscriptions);
  app.get("/api/default", getDefault);
  app.get("/api/sidebar/:subreddit_name", sidebar);
  app.get("/api/rules/:subreddit_name", subredditRules);
  app.get("/api/moderators/:subreddit_name", subredditModerators);
  app.get("/api/search/:subreddit_name", searchSubreddit);
  app.get("/api/search/subnames", searchSubNames);
  app.get("/api/subreddits/trending", trendingSubreddits);
};
