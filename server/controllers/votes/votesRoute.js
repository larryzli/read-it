const { vote } = require("./votesController");

module.exports = function(app) {
  app.post("/api/vote", vote);
};
