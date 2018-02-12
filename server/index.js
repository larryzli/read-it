require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const massive = require("massive");
const {
  CONNECTION_STRING,
  NODE_PORT,
  APP_ID,
  APP_SECRET,
  API_HOST,
  SESSION_SECRET
} = process.env;
const session = require("express-session");

const passport = require("passport");

const crypto = require("crypto");
const RedditStrategy = require("passport-reddit").Strategy;
const axios = require("axios");

const {
  getUserById,
  createUserById
} = require("./controllers/userAccountController");

const port = NODE_PORT || 3005;
const app = express();

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 9999999999
    }
  })
);
massive(CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(cors());
app.use(json());
app.use("/", express.static(__dirname));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new RedditStrategy(
    {
      clientID: APP_ID,
      clientSecret: APP_SECRET,
      callbackURL: `${API_HOST}/auth/reddit/callback`
    },
    function (accessToken, refreshToken, profile, done) {
      // CHECK TO SEE IF THERES ALREADY A USER WITH THAT AUTH ID IN OUR DATABASE
      axios
        .get(`${API_HOST}/api/users/${profile.id}`)
        .then(response => {
          // IF THERES ONE, JUST PUT IT ON SESSION
          if (response.data.user_id) {
            done(null, profile);
          } else {
            // IF THERE ISNT ONE, CREATE ONE
            axios
              .get(`${API_HOST}/api/user/create/${profile.id}`)
              .then(userResponse => {
                // PUT USER ON SESSION
                if (userResponse.data.user_id) {
                  done(null, profile);
                }
              })
              .catch(() => console.log("1st"));
          }
        })
        .catch(() => console.log("2nd"));
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("/auth/reddit", function (req, res, next) {
  passport.authenticate("reddit", {
    state: crypto.randomBytes(32).toString("hex"),
    duration: "permanent"
  })(req, res, next);
});

app.get("/auth/reddit/callback", function (req, res, next) {
  passport.authenticate("reddit", {
    successRedirect: "/",
    failureRedirect: "/"
  })(req, res, next);
});

app.get("/api/users/:user_id", getUserById);
app.get("/api/users/create", createUserById);

app.listen(port, () => {
  console.log("Server listening on port: ", port);
});
