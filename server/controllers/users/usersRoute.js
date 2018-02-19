const { getUserInfo, getAllFriends } = require("./userAccountController");

module.exports = function(app) {
  app.get("/api/user/info", getUserInfo);
  app.get("/api/friends/get", getAllFriends);
};
