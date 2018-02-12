require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const massive = require("massive");
//const session = require('express-session')
const { CONNECTION_STRING, PORT } = process.env;

const {
  register,
  login,
  getUserById
} = require("./controllers/userAccountController");

const port = PORT || 3005;
const app = express();
// app.use(session(config.session) );

massive(CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(cors());
app.use(json());
app.use("/", express.static(__dirname));

// REGISTER A USER - EXPECTS ( username, name, password, email, birthday )
app.post("/api/users/register", register);

// LOGIN USER - EXPECTS ( email, password )
app.post("/api/users/login", login);

// GET USER BY ID LOCAL STORAGE REQUEST
app.get("/api/users/:id", getUserById);

app.listen(port, () => {
  console.log("Server listening on port: ", port);
});
