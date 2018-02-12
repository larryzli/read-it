const getUserById = (req, res, next) => {
  const db = req.app.get("db");
  const { user_id } = req.params;
  db
    .getUserById(user_id)
    .then(response => {
      res.status(200).json(response[0]);
    })
    .catch(console.log);
};

const createUserById = (req, res, next) => {
  const db = req.app.get("db");
  const { user_id } = req.params;
  db
    .createUserById(user_id)
    .then(response => {
      res.status(200).json(response[0]);
    })
    .catch(console.log);
};

module.exports = {
  getUserById,
  createUserById
};
