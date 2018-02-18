const axios = require("axios");
const querystring = require("querystring");

const vote = (req, res, next) => {
  const { vote, id } = req.body;
  // Can also include rank (integer greater than 1)
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/vote",
      querystring.stringify({
        id: id,
        //rank: rank
        dir: vote
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
  vote
};
