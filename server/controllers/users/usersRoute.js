const {
  getUserInfo,
  getAllFriends,
  friend,
  unfriend,
  getUserAbout,
  subscribe,
  blockUser,
  addFilter,
  removeFilter
} = require("./userAccountController");

module.exports = function(app) {
  app.get("/api/user/info", getUserInfo);
  app.get("/api/friends/get", getAllFriends);
  app.get("/api/user/about", getUserAbout);
  app.post("/api/user/friend", friend);
  app.delete("/api/user/unfriend/:username", unfriend);
  app.post("/api/subscribe", subscribe);
  app.post("/api/user/block", blockUser);
  app.post("/api/user/filter/add", addFilter);
  app.post("/api/user/filter/remove", removeFilter);
};
