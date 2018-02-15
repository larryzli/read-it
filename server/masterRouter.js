const usersRoute = require("./controllers/users/usersRoute");
const subredditsRoute = require("./controllers/subreddits/subredditsRoute");
const postsRoute = require("./controllers/posts/postsRoute");

module.exports = function(app) {
  usersRoute(app);
  subredditsRoute(app);
  postsRoute(app);
};
