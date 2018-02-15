const {
  getUserInfo,
  getAllFriends,
  reply
} = require("./userAccountController");

module.exports = function(app) {
  app.get("/api/user/info", getUserInfo);
  app.get("/api/friends/get", getAllFriends);
  app.post("/api/reply", reply);
};
