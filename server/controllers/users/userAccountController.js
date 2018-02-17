const axios = require("axios");
const querystring = require("querystring");

const getUserInfo = (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user._json);
  } else {
    res.status(200).json();
  }
};

const getAllFriends = (req, res, next) => {
  axios
    .get("https://oauth.reddit.com/api/v1/me/friends", {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`
      }
    })
    .then(response => res.status(200).json(response.data.data.children))
    .catch(console.log);
};

const reply = (req, res, next) => {
  axios
    .post(
      `https://oauth.reddit.com/api/comment`,
      {
        api_type: "json",
        thing_id: "t1_ducdr6e",
        text: "this is a test reply"
      },
      {
        headers: {
          Authorization: `Bearer ${req.body.accessToken}`
        }
      }
    )
    .then(response => console.log(response))
    .catch(console.log);
};

const compose = (req, res, next) => {
  const { name, text } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/compose",
      querystring.stringify({
        to: "domoKing",
        subject: "test1",
        text: "dfgdfgdfgdf",
        api_type: "json"
      }),
      {
        headers: {
          Authorization: `bearer ${req.user.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
        }
      }
    )
    .then(response => console.log(response.data))
    .catch(console.log);
};

module.exports = {
  getUserInfo,
  getAllFriends,
  reply,
  compose
};
