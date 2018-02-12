// IMPORTING PACKAGE USED TO HASH PASSWORD
const bcrypt = require("bcryptjs");
// IMPORTING SECRET SALT FROM ENV FILE
const { SALT } = process.env;

// CREATE A USER - API: '/api/users/register'
const register = (req, res, next) => {
  const db = req.app.get("db");
  const { username, name, password, email, birthday } = req.body;
  // CREATING A NEW HASHED PASSWORD TAKING IN THE UNHASHED PASSWORD
  bcrypt.hash(password, parseInt(SALT, 10), function(err, hash) {
    // HASH VARIABLE IS NOW THE HASHED PASSWORD
    db
      .register([username, name, hash, email, birthday])
      .then(response => res.status(200).json(response[0]))
      .catch(console.log);
  });
};

// LOGIN USER - API: '/api/users/login'
const login = (req, res, next) => {
  const db = req.app.get("db");
  const { email, password } = req.body;
  db.login(email).then(response => {
    // TAKE IN THE PASSWORD UNHASHED AND
    // CHECK TO SEE IF IT MATCHES THE HASHED PASSWORD
    bcrypt.compare(password, response[0].password, function(err, confirm) {
      if (confirm == true) {
        res.status(200).json(response[0]);
      } else {
        return null;
      }
    });
  });
};

const getUserById = (req, res, next) => {
  const db = req.app.get("db");
  const { user_id } = req.params;
  db
    .getUserById(id)
    .then(response => {
      res.status(200).json(response[0]);
    })
    .catch(console.log);
};

module.exports = {
  register,
  login,
  getUserById
};
