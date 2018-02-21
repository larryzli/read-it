const axios = require("axios");
const querystring = require("querystring");
const { USER_AGENT } = process.env;

const sendMessage = (req, res, next) => {
  const { name, subject, text } = req.body;
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
          "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
        }
      }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

const deleteMessage = (req, res, next) => {
  const { id } = req.body;
  axios
    .post(
      "https://oauth.reddit.com/api/del_msg",
      querystring.stringify({
        id: id
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

const getInbox = (req, res, next) => {
  axios
    .get("https://oauth.reddit.com/message/inbox", {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    })
    .then(response => res.status(200).json(response.data.data.children))
    .catch(console.log);
};

const getUnread = (req, res, next) => {
  axios
    .get("https://oauth.reddit.com/message/unread", {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    })
    .then(response => res.status(200).json(response.data.data.children))
    .catch(console.log);
};

const getSent = (req, res, next) => {
  axios
    .get("https://oauth.reddit.com/message/sent", {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    })
    .then(response => res.status(200).json(response.data.data.children))
    .catch(console.log);
};

const markUnread = (req, res, next) => {
  const { id } = req.body;
  axios
    .post(
      "https://oauth.reddit.com/api/unread_message",
      querystring.stringify({
        id: id
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

const markRead = (req, res, next) => {
  const { id } = req.body;
  axios
    .post(
      "https://oauth.reddit.com/api/read_message",
      querystring.stringify({
        id: id
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

const readAllMessages = (req, res, next) => {
  axios
    .post(
      "https://oauth.reddit.com/api/read_all_messages",
      {},
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
  sendMessage,
  deleteMessage,
  getInbox,
  getUnread,
  getSent,
  markUnread,
  markRead,
  readAllMessages
};
