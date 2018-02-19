const { getUserInfo, getAllFriends, friend, unfriend } = require("./userAccountController");

module.exports = function (app) {
  app.get("/api/user/info", getUserInfo);
  app.get("/api/friends/get", getAllFriends);
  app.post("/api/user/friend", friend);
  app.post("/api/user/unfriend", unfriend);
};
