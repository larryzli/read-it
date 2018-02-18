const { save, unsave } = require("./favoritesController");

module.exports = function(app) {
  // SAVES/UNSAVES POST/COMMENT TO FAVORITES EXPECTS: (id) EXAMPLE ('t1_due1qyg')
  app.post("/api/favorites/save", save);
  app.post("/api/favorites/unsave", unsave);
};
