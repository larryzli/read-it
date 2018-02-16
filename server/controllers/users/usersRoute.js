const {
  getUserInfo,
  getAllFriends
  // reply,
  // compose
} = require("./userAccountController");

module.exports = function(app) {
  app.get("/api/user/info", getUserInfo);
  app.get("/api/friends/get", getAllFriends);
  // app.post("/api/reply", reply);
  // app.post("/api/compose", compose);
};
