const axios = require("axios");
const querystring = require("querystring");
const { USER_AGENT } = process.env;

//GET DEFAULT SUBSCRIBED SUBREDDITS
const getDefault = (req, res, next) => {
  let baseURL = "https://www.reddit.com/subreddits/default.json?";
  const { limit, after } = req.query;
  if (req.query) {
    if (limit) {
      baseURL += `limit=${limit}&`;
    }
    if (after) {
      baseURL += `after=${after}&`;
    }
  }
  axios
    .get(baseURL)
    .then(response => res.status(200).json({
      posts: response.data.data.children.map(sub => {
        return {
          display_name: sub.data.display_name,
          url: sub.data.url,
          id: sub.data.name
        }
      })
    })
    )
    .catch(console.log);
};

//GET HOT POSTS FROM A SUBREDDIT
const pullHot = (req, res, next) => {
  let baseURL = "https://www.reddit.com/hot.json?";
  const { subreddit, limit, after } = req.query;
  if (req.query) {
    if (subreddit) {
      baseURL = `https://www.reddit.com/r/${subreddit}/hot.json?`;
    }
    if (limit) {
      baseURL += `limit=${limit}&`;
    }
    if (after) {
      baseURL += `after=${after}&`;
    }
  }
  axios
    .get(baseURL)
    .then(response =>
      res.status(200).json({
        posts: response.data.data.children.map(el => {
          let o = el.data;
          return {
            domain: o.domain,
            subreddit_title: o.subreddit,
            subreddit_id: o.subreddit_id,
            author: o.author,
            post_title: o.title,
            num_comments: o.num_comments,
            score: o.score,
            created_utc: o.created_utc,
            post_id: o.id,
            post_thumbnail: o.thumbnail,
            over_18: o.over_18,
            url: o.url,
            permalink: o.permalink
          };
        }),
        after: response.data.data.after
      })
    )
    .catch(console.log);
};

//GET BEST
const pullBest = (req, res, next) => {
  let baseURL = "https://www.reddit.com/best.json?";
  const { limit, after } = req.query;
  if (req.query) {
    if (limit) {
      baseURL += `limit=${limit}&`;
    } else if (after) {
      baseURL += `after=${after}&`;
    }
  }
  axios
    .get(baseURL)
    .then(response =>
      res.status(200).json({
        posts: response.data.data.children.map(el => {
          let o = el.data;
          return {
            domain: o.domain,
            subreddit_title: o.subreddit,
            subreddit_id: o.subreddit_id,
            author: o.author,
            post_title: o.title,
            num_comments: o.num_comments,
            score: o.score,
            created_utc: o.created_utc,
            post_id: o.id,
            post_thumbnail: o.thumbnail,
            over_18: o.over_18
          };
        }),
        after: response.data.data.after
      })
    )
    .catch(console.log);
};

//GET NEW POSTS FROM A SUBREDDIT
const pullNew = (req, res, next) => {
  let baseURL = `https://www.reddit.com/new.json?`;
  const { subreddit, limit, after } = req.query;
  if (req.query) {
    if (subreddit) {
      baseURL = `https://www.reddit.com/r/${subreddit}/new.json?`;
    }
    if (limit) {
      baseURL += `limit=${limit}&`;
    }
    if (after) {
      baseURL += `after=${after}&`;
    }
  }
  axios
    .get(baseURL)
    .then(response =>
      res.status(200).json({
        posts: response.data.data.children.map(el => {
          let o = el.data;
          return {
            domain: o.domain,
            subreddit_title: o.subreddit,
            subreddit_id: o.subreddit_id,
            author: o.author,
            post_title: o.title,
            num_comments: o.num_comments,
            score: o.score,
            created_utc: o.created_utc,
            post_id: o.id,
            post_thumbnail: o.thumbnail,
            over_18: o.over_18,
            url: o.url,
            permalink: o.permalink
          };
        }),
        after: response.data.data.after
      })
    )
    .catch(console.log);
};

//GET TOP FROM A SUBREDDIT
const pullTop = (req, res, next) => {
  let baseURL = `https://www.reddit.com/top.json?`;
  const { subreddit, t, limit, after } = req.query;
  console.log(req.query)
  if (req.query) {
    if (subreddit) {
      baseURL = `https://www.reddit.com/r/${subreddit}/top.json?`;
    }
    if (t) {
      baseURL += `sort=top&t=${t}&`;
    }

    if (limit) {
      baseURL += `limit=${limit}&`;
    }
    if (after) {
      baseURL += `after=${after}&`;
    }
  }
  axios
    .get(baseURL)
    .then(response =>
      res.status(200).json({
        posts: response.data.data.children.map(el => {
          let o = el.data;
          return {
            domain: o.domain,
            subreddit_title: o.subreddit,
            subreddit_id: o.subreddit_id,
            author: o.author,
            post_title: o.title,
            num_comments: o.num_comments,
            score: o.score,
            created_utc: o.created_utc,
            post_id: o.id,
            post_thumbnail: o.thumbnail,
            over_18: o.over_18,
            url: o.url,
            permalink: o.permalink
          };
        }),
        after: response.data.data.after
      })
    )
    .catch(console.log);
};

//GET CONTROVERSIAL FROM A SUBREDDIT
const pullControversial = (req, res, next) => {
  let baseURL = `https://www.reddit.com/controversial.json?`;
  const { subreddit, t, limit, after } = req.query;

  if (req.query) {
    if (subreddit) {
      baseURL = `https://www.reddit.com/r/${subreddit}/controversial.json?`;
    }
    if (t) {
      baseURL += `sort=top&t=${t}&`;
    }
    if (limit) {
      baseURL += `limit=${limit}&`;
    }
    if (after) {
      baseURL += `after=${after}&`;
    }
  }
  axios
    .get(baseURL)
    .then(response =>
      res.status(200).json({
        posts: response.data.data.children.map(el => {
          let o = el.data;
          return {
            domain: o.domain,
            subreddit_title: o.subreddit,
            subreddit_id: o.subreddit_id,
            author: o.author,
            post_title: o.title,
            num_comments: o.num_comments,
            score: o.score,
            created_utc: o.created_utc,
            post_id: o.id,
            post_thumbnail: o.thumbnail,
            over_18: o.over_18,
            url: o.url,
            permalink: o.permalink
          };
        }),
        after: response.data.data.after
      })
    )
    .catch(console.log);
};

//GET RISING POSTS FROM A SUBREDDIT
const pullRising = (req, res, next) => {
  let baseURL = `https://www.reddit.com/rising.json?`;
  const { subreddit, limit, after } = req.query;
  if (req.query) {
    if (subreddit) {
      baseURL = `https://www.reddit.com/r/${subreddit}/rising.json?`;
    }
    if (limit) {
      baseURL += `limit=${limit}&`;
    }
    if (after) {
      baseURL += `after=${after}&`;
    }
  }
  axios
    .get(baseURL)
    .then(response =>
      res.status(200).json({
        posts: response.data.data.children.map(el => {
          let o = el.data;
          return {
            domain: o.domain,
            subreddit_title: o.subreddit,
            subreddit_id: o.subreddit_id,
            author: o.author,
            post_title: o.title,
            num_comments: o.num_comments,
            score: o.score,
            created_utc: o.created_utc,
            post_id: o.id,
            post_thumbnail: o.thumbnail,
            over_18: o.over_18,
            url: o.url,
            permalink: o.permalink
          };
        }),
        after: response.data.data.after
      })
    )
    .catch(console.log);
};

//GET RANDOM POST FROM SUBREDDIT
const pullRandom = (req, res, next) => {
  let baseURL = `https://www.reddit.com/random.json?`;
  const { subreddit, t, limit, after } = req.query;

  if (req.query) {
    if (subreddit) {
      baseURL = `https://www.reddit.com/r/${subreddit}/random.json?`;
    }
    if (t) {
      baseURL += `sort=top&t=${t}&`;
    }

    if (limit) {
      baseURL += `limit=${limit}&`;
    }
    if (after) {
      baseURL += `after=${after}&`;
    }
  }
  axios
    .get(baseURL)
    .then(response => res.status(200).json(response.data))
    .catch(console.log);
};

//GET USER SUBSCRIBED SUBREDDITS
const getUserSubscriptions = (req, res, next) => {
  let url = "https://oauth.reddit.com/subreddits/mine/subscriber?limit=100&";
  let allSubs = [];
  recursiveSubs = url => {
    axios
      .get(url, {
        headers: {
          Authorization: `bearer ${req.user.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
        }
      })
      .then(response => {
        if (response.data.data.after) {
          allSubs.push(response.data.data.children);
          url = url.split("after=");
          url = url[0];
          recursiveSubs(url + "after=" + response.data.data.after);
        } else {
          allSubs.push(response.data.data.children);
          const mergedSubs = [].concat.apply([], allSubs);
          mergedSubs.sort(compareNames);
          res.status(200).json(
            mergedSubs.map(sub => {
              return {
                display_name: sub.data.display_name,
                url: sub.data.url,
                id: sub.data.name
              };
            })
          );
        }
      })
      .catch(console.log);
  };
  compareNames = (a, b) => {
    if (a.data.display_name < b.data.display_name) return -1;
    if (a.data.display_name > b.data.display_name) return 1;
    return 0;
  };
  recursiveSubs(url);
};

// NOT WORKING
const sidebar = (req, res, next) => {
  const { subreddit_name } = req.params;
  axios
    .get(`https://oauth.reddit.com/r/${subreddit_name}/sidebar`, {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    })
    .then(response => console.log(response))
    .catch(console.log);
};

//GET SUBREDDIT INFORMATION- SUB COUNT, DESCRIPTION, HEADER IMAGE
//JUST NEEDS SUBREDDIT NAME
const subredditAbout = (req, res, next) => {
  const { subreddit_name } = req.params;
  axios
    .get(`https://oauth.reddit.com/r/${subreddit_name}/about`, {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    })
    .then(response => res.status(200).json(response.data));
};

//GET SUBREDDIT RULES
//JUST NEEDS SUBREDDIT NAME
const subredditRules = (req, res, next) => {
  const { subreddit_name } = req.params;
  axios
    .get(`https://oauth.reddit.com/r/${subreddit_name}/about/rules`, {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    })
    .then(response => res.status(200).json(response.data));
};

//GET SUBREDDIT MODERATORS
//JUST NEEDS SUBREDDIT NAME
const subredditModerators = (req, res, next) => {
  const { subreddit_name } = req.params;
  axios
    .get(`https://oauth.reddit.com/r/${subreddit_name}/about/moderators`, {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    })
    .then(response => res.status(200).json(response.data));
};

//SEARCH A SUBREDDIT
// NEEDS A SUBREDDIT NAME
// SEARCHTERMS IS THE INPUT BEING SEARCHED,
// t IS THE TIME PERIOD TO SORT(hour,day,week,month,year,all)
// const searchSubreddit = (req, res, next) => {
//   const { subreddit_name, searchTerms, t, sort, restrict_sr } = req.query;
//   console.log(req.query)
//   axios
//     .get(`https://oauth.reddit.com/r/${subreddit_name}/q=${searchTerms}`,
//     {
//       headers: {
//         Authorization: `bearer ${req.user.accessToken}`
//       }
//     }
//       .then(response => res.status(200).json(response.data));
// };

module.exports = {
  pullNew,
  pullHot,
  pullBest,
  pullTop,
  pullControversial,
  pullRising,
  pullRandom,
  getUserSubscriptions,
  getDefault,
  sidebar,
  subredditAbout,
  subredditRules,
  subredditModerators
  // searchSubreddit
};
