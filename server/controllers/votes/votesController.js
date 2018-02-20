const axios = require("axios");
const querystring = require("querystring");
const { USER_AGENT } = process.env;

const vote = (req, res, next) => {
  const { vote, id } = req.body;
  // Can also include rank (integer greater than 1)
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
          "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
        }
      }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

module.exports = {
  vote
};
