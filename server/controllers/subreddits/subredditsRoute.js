const { pullHot, pullBest } = require("./subredditsController");

module.exports = function(app) {
  app.get("/api/hot", pullHot);
  app.get("/api/best", pullBest);
};
