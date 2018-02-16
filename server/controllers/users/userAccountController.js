const axios = require("axios");

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

// const reply = (req, res, next) => {
//   const { id, text } = req.body;
//   axios
//     .post(`https://oauth.reddit.com/api/comment?thing_id=${id}&text=${text}`, {
//       headers: {
//         Authorization: `bearer ${req.user.accessToken}`
//       }
//     })
//     .then(response => console.log(response))
//     .catch(console.log);
// };

// const compose = (req, res, next) => {
//   const { name, text } = req.body;
//   axios
//     .post(
//       "https://oauth.reddit.com/api/compose",
//       {
//         to: "domoKing",
//         subject: "test",
//         text: "Hello",
//         api_type: "json",
//         from_sr: "t5_856xw"
//       },
//       {
//         headers: {
//           Authorization: `bearer ${req.user.accessToken}`
//         }
//       }
//     )
//     .then(response => console.log(response.data))
//     .catch(console.log);
// };

module.exports = {
  getUserInfo,
  getAllFriends
  // reply,
  // compose
};
