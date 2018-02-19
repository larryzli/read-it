const { getUserInfo, getAllFriends, friend, unfriend, getUserAbout } = require("./userAccountController");

module.exports = function (app) {
  app.get("/api/user/info", getUserInfo);
  app.get("/api/friends/get", getAllFriends);
  app.get("/api/user/about", getUserAbout);
  app.post("/api/user/friend", friend);
  app.delete("/api/user/unfriend/:username", unfriend);
};
