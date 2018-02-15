const { getUserInfo } = require("./userAccountController");

module.exports = function(app) {
  app.get("/api/user/info", getUserInfo);
};
