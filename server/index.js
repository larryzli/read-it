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
  REACT_APP_HOST,
  SESSION_SECRET
} = process.env;
const session = require("express-session");

const passport = require("passport");

const crypto = require("crypto");
const RedditStrategy = require("passport-reddit").Strategy;
const axios = require("axios");

const {
    getUserInfo,
  pullHot,
  pullBest,
  getPost,
  getMoreComments
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
      callbackURL: `${REACT_APP_HOST}/auth/reddit/callback`
    },
    function (accessToken, refreshToken, profile, done) {
      // CHECK TO SEE IF THERES ALREADY A USER WITH THAT AUTH ID IN OUR DATABASE
      app
        .get("db")
        .getUserById(profile.id)
        .then(response => {
          console.log(response);
          if (response[0]) {
            done(null, profile);
          } else {
            app
              .get("db")
              .createUserById(profile.id)
              .then(response => {
                done(null, profile);
              })
              .catch(console.log);
          }
        })
        .catch(console.log);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("/auth/reddit", function (req, res, next) {
  console.log("hit api");
  passport.authenticate("reddit", {
    state: crypto.randomBytes(32).toString("hex"),
    duration: "permanent"
  })(req, res, next);
});

app.get("/auth/reddit/callback", function (req, res, next) {
  passport.authenticate("reddit", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/"
  })(req, res, next);
});

app.get("/api/hot", pullHot);
app.get("/api/best", pullBest);
app.get("/api/user/info", getUserInfo);
app.get("/api/post/:subreddit_title/:post_id", getPost);
app.get("/api/post/comments/more/:post_id/:children", getMoreComments);

app.listen(port, () => {
  console.log("Server listening on port: ", port);
});
