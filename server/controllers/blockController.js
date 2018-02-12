const createBlock = (req, res, next) => {
  const db = req.app.get("db");
  const { user_id, name, title, description, rules, age } = req.body;
  db
    .createBlock([user_id, name, title, description, rules, age])
    .then(response => {
      res.status(200).json(response[0]);
    })
    .catch(console.log);
};

const getBlockById = (req, res, next) => {
  const db = req.app.get("db");
  const { block_id } = req.params;
  db
    .getBlockById(block_id)
    .then(response => {
      res.status(200).json(response[0]);
    })
    .catch(console.log);
};

module.exports = {
  createBlock,
  getBlockById
};
