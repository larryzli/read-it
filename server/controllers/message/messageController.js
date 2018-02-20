const axios = require("axios");
const querystring = require("querystring");

const sendMessage = (req, res, next) => {
  const { name, subject, text } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/compose",
      querystring.stringify({
        to: name,
        subject: subject,
        text: text,
        api_type: "json"
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

const deleteMessage = (req, res, next) => {
  const { id } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/del_msg",
      querystring.stringify({
        id
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

const getInbox = (req, res, next) => {
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .get("https://oauth.reddit.com/message/inbox", {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
      }
    })
    .then(response => res.status(200).json(response.data.data.children))
    .catch(console.log);
};

const getUnread = (req, res, next) => {
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .get("https://oauth.reddit.com/message/unread", {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
      }
    })
    .then(response => res.status(200).json(response.data.data.children))
    .catch(console.log);
};

const getSent = (req, res, next) => {
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .get("https://oauth.reddit.com/message/sent", {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
      }
    })
    .then(response => res.status(200).json(response.data.data.children))
    .catch(console.log);
};

// NOT TESTED YET
const markUnread = (req, res, next) => {
  const { id } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/unread_message",
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

// NOT TESTED YET
const markRead = (req, res, next) => {
  const { id } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/read_message",
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

const readAllMessages = (req, res, next) => {
  const userAgent = req.user._json.subreddit.display_name_prefixed;
  axios
    .post(
      "https://oauth.reddit.com/api/read_all_messages",
      querystring.stringify({
        filter_types: ""
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
  sendMessage,
  deleteMessage,
  getInbox,
  getUnread,
  getSent,
  markUnread,
  markRead,
  readAllMessages
};
