const axios = require("axios");
const querystring = require("querystring");

const save = (req, res, next) => {
  const { id } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/save",
      querystring.stringify({
        id: id
      }),
      {
        headers: {
          Authorization: `bearer ${req.user.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
        }
      }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

const unsave = (req, res, next) => {
  const { id } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/unsave",
      querystring.stringify({
        id: id
      }),
      {
        headers: {
          Authorization: `bearer ${req.user.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
        }
      }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

module.exports = {
  save,
  unsave
};
