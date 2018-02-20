const usersRoute = require("./controllers/users/usersRoute");
const subredditsRoute = require("./controllers/subreddits/subredditsRoute");
const postsRoute = require("./controllers/posts/postsRoute");
const favoritesRoute = require("./controllers/favorites/favoritesRoute");
const votesRoute = require("./controllers/votes/votesRoute");
const messageRoute = require("./controllers/message/messageRoute");

module.exports = function(app) {
  usersRoute(app);
  subredditsRoute(app);
  postsRoute(app);
  favoritesRoute(app);
  votesRoute(app);
  messageRoute(app);
};
