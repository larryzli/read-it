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
const path = require("path");

// API WRAPPER IMPORT
// const rawjs = require("raw.js");
// const reddit = new rawjs("raw.js example script");

const masterRouter = require("./masterRouter");

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
// app.use(express.static(`${__dirname}/../build`));

// AUTH REDDIT WRAPPER
// reddit.setupOAuth2(
//   APP_ID,
//   APP_SECRET,
//   `${REACT_APP_HOST}/auth/reddit/callback`
// );

// const url = reddit.authUrl("some_random_state", [
//   "identity",
//   "edit",
//   "flair",
//   "history",
//   "modconfig",
//   "modflair",
//   "modlog",
//   "modposts",
//   "modwiki",
//   "mysubreddits",
//   "privatemessages",
//   "read",
//   "report",
//   "save",
//   "submit",
//   "subscribe",
//   "vote",
//   "wikiedit",
//   "wikiread"
// ]);
// // Redirect the client to this URL. When they return, their authorization code will be passed in the URL as `code`.

// reddit.auth({ code: code }, function(err, response) {
//   if (err) {
//     console.log("Unable to authenticate user: " + err);
//   } else {
//     // The user is now authenticated.
//     // If you want the temporary bearer token, it's available as response.access_token and will be valid
//     // for response.expires_in seconds.
//     // If we requested permanent access to the user's account, raw.js will automatically refresh the bearer token as it expires.
//     // You'll want to save the refresh token (it's available as response.refresh_token) and use it to resume the session on
//     // subsequent application startups. See "Resuming Sessions" below.
//   }
// });

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new RedditStrategy(
    {
      clientID: APP_ID,
      clientSecret: APP_SECRET,
      callbackURL: `/auth/reddit/callback`,
      scope:
        "identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread"
    },
    function(accessToken, refreshToken, profile, done) {
      // CHECK TO SEE IF THERES ALREADY A USER WITH THAT AUTH ID IN OUR DATABASE
      profile.accessToken = accessToken;
      app
        .get("db")
        .getUserById(profile.id)
        .then(response => {
          if (response[0]) {
            app
              .get("db")
              .getFilterInfo(profile.id)
              .then(filter => {
                profile.filter = filter;
                done(null, profile);
              })
              .catch(console.log);
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

app.get("/auth/reddit", function(req, res, next) {
  passport.authenticate("reddit", {
    state: crypto.randomBytes(32).toString("hex"),
    duration: "permanent"
  })(req, res, next);
});

app.get("/auth/reddit/callback", function(req, res, next) {
  passport.authenticate("reddit", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "http://localhost:3000"
  })(req, res, next);
});

masterRouter(app);

// app.get("*", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });

app.listen(port, () => {
  console.log("Server listening on port: ", port);
});
