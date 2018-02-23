const axios = require("axios");
const querystring = require("querystring");
const { USER_AGENT } = process.env;

const getUserInfo = (req, res, next) => {
  if (req.user) {
    req.user._json.filter = req.user.filter;
    res.status(200).json(req.user._json);
  } else {
    res.status(200).json();
  }
};

const logout = (req, res, next) => {
  req.session.destroy();
  res.status(200).json();
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

const friend = (req, res, next) => {
  const { username } = req.body;
  axios
    .put(
      `https://oauth.reddit.com/api/v1/me/friends/${username}`,
      {
        api_type: "json",
        name: `${username}`,
        type: "friend",
        container: ""
      },
      {
        headers: {
          Authorization: `Bearer ${req.user.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
        }
      }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

const unfriend = (req, res, next) => {
  const { username } = req.params;
  axios
    .delete(`https://oauth.reddit.com/api/v1/me/friends/${username}`, {
      headers: {
        Authorization: `Bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    })
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

//GET USER INFO FROM THEIR USERNAME
//NEEDS USERNAME TO WORK
// CAN USE SORT AND T TO CHANGE THE LIST OF THE USER'S COMMENTS
//SORT = "TOP" or "CONTROVERSIAL" AND CAN BE SORTED BY TIME WITH T="HOUR, DAY,WEEK,MONTH,YEAR,ALL"
const getUserAbout = (req, res, next) => {
  const { username, sort, t, after } = req.query;
  let baseURL = `https://www.reddit.com/user/${username}/overview.json?`;
  let baseURL2 = `https://www.reddit.com/user/${username}/about.json?`;
  let baseURL3 = `https://www.reddit.com/user/${username}/saved.json`;
  let headers = {};
  let profileData = {};
  if (req.user) {
    baseURL = `https://oauth.reddit.com/user/${username}/overview?`;
    baseURL2 = `https://oauth.reddit.com/user/${username}/about?`;
    headers = {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    };
  }
  if (sort) {
    baseURL += `sort=${sort}&`;

    if (t) {
      baseURL += `t=${t}&`;
    }
  }
  if (after) {
    baseURL += `after=${after}&`;
  }

  axios
    .get(baseURL, headers)
    .then(response => {
      axios
        .get(baseURL2, headers)
        .then(result => {
          profileData.overview = response.data;
          profileData.about = result.data;
          return res.status(200).json(profileData);
        })
        .catch(console.log);
    })
    .catch(console.log);
};

// SUBSCRIBE TO SUBREDDIT
// NEEDS SR_NAME AND ACTION
// SR_NAME IS A STRING OF THE NAME OF THE SUBREDDIT
// ACTION IS A STRING THAT NEEDS TO BE "SUB" OR "UNSUB"
const subscribe = (req, res, next) => {
  const { sr_name, action } = req.body;

  axios
    .post(
      `https://oauth.reddit.com/api/subscribe`,
      querystring.stringify({
        api_type: "json",
        action: action,
        sr_name: sr_name
      }),
      {
        headers: {
          Authorization: `bearer ${req.user.accessToken}`
        }
      }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

const blockUser = (req, res, next) => {
  const { id } = req.body;
  axios
    .post(
      `https://oauth.reddit.com/api/block_user`,
      querystring.stringify({
        account_id: id
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

const addFilter = (req, res, next) => {
  const { filter_name } = req.body;
  const { id } = req.user;
  const db = req.app.get("db");
  db
    .addFilter([filter_name, id])
    .then(response => res.status(200).json(response))
    .catch(console.log);
};

const removeFilter = (req, res, next) => {
  const { id } = req.body;
  const db = req.app.get("db");
  db
    .removeFilter([id, req.user.id])
    .then(response => res.status(200).json(response))
    .catch(console.log);
};

const editFilter = (req, res, next) => {
  const { id, filter_name } = req.body;
  const db = req.app.get("db");
  db
    .editFilter([id, filter_name, req.user.id])
    .then(response => res.status(200).json(response))
    .catch(console.log);
};

module.exports = {
  getUserInfo,
  getAllFriends,
  getUserAbout,
  friend,
  unfriend,
  subscribe,
  blockUser,
  addFilter,
  removeFilter,
  editFilter,
  logout
};
