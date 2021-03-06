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
  compareNames = (a, b) => {
    if (a.data.display_name.toLowerCase() < b.data.display_name.toLowerCase())
      return -1;
    if (a.data.display_name.toLowerCase() > b.data.display_name.toLowerCase())
      return 1;
    return 0;
  };
  axios
    .get(baseURL)
    .then(response => {
      const subs = response.data.data.children;
      subs.sort(compareNames);
      res.status(200).json(
        subs.map(sub => {
          return {
            display_name: sub.data.display_name,
            url: sub.data.url,
            id: sub.data.name
          };
        })
      );
    })
    .catch(console.log);
};

//GET HOT POSTS FROM A SUBREDDIT
const pullHot = (req, res, next) => {
  let baseURL = "https://www.reddit.com/hot.json?";
  let headers = {};
  if (req.user) {
    baseURL = "https://oauth.reddit.com/hot?";
    headers = {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    };
  }
  const { subreddit, limit, after } = req.query;
  if (req.query) {
    if (subreddit) {
      baseURL = `https://www.reddit.com/r/${subreddit}/hot.json?`;
      if (req.user) {
        baseURL = `https://oauth.reddit.com/r/${subreddit}/hot?`;
      }
    }
    if (limit) {
      baseURL += `limit=${limit}&`;
    }
    if (after) {
      baseURL += `after=${after}&`;
    }
  }
  axios
    .get(baseURL, headers)
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
            permalink: o.permalink,
            saved: o.saved,
            likes: o.likes,
            hidden: o.hidden,
            clicked: o.clicked,
            visited: o.visited,
            pinned: o.pinned,
            archived: o.archived,
            spoiler: o.spoiler,
            locked: o.locked,
            stickied: o.stickied,
            edited: o.edited,
            gilded: o.gilded,
            reddit_media: o.is_reddit_media_domain
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
  let headers = {};
  if (req.user) {
    baseURL = "https://oauth.reddit.com/best?";
    headers = {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    };
  }
  const { limit, after } = req.query;
  if (req.query) {
    if (limit) {
      baseURL += `limit=${limit}&`;
    } else if (after) {
      baseURL += `after=${after}&`;
    }
  }
  axios
    .get(baseURL, headers)
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
            saved: o.saved,
            likes: o.likes,
            hidden: o.hidden,
            clicked: o.clicked,
            visited: o.visited,
            pinned: o.pinned,
            archived: o.archived,
            spoiler: o.spoiler,
            locked: o.locked,
            stickied: o.stickied,
            edited: o.edited,
            gilded: o.gilded,
            reddit_media: o.is_reddit_media_domain
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
  let headers = {};
  if (req.user) {
    baseURL = "https://oauth.reddit.com/new?";
    headers = {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    };
  }
  const { subreddit, limit, after } = req.query;
  if (req.query) {
    if (subreddit) {
      baseURL = `https://www.reddit.com/r/${subreddit}/new.json?`;
      if (req.user) {
        baseURL = `https://oauth.reddit.com/r/${subreddit}/new?`;
      }
    }
    if (limit) {
      baseURL += `limit=${limit}&`;
    }
    if (after) {
      baseURL += `after=${after}&`;
    }
  }
  axios
    .get(baseURL, headers)
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
            permalink: o.permalink,
            saved: o.saved,
            likes: o.likes,
            hidden: o.hidden,
            clicked: o.clicked,
            visited: o.visited,
            pinned: o.pinned,
            archived: o.archived,
            spoiler: o.spoiler,
            locked: o.locked,
            stickied: o.stickied,
            edited: o.edited,
            gilded: o.gilded,
            reddit_media: o.is_reddit_media_domain
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
  let headers = {};
  if (req.user) {
    baseURL = "https://oauth.reddit.com/top?";
    headers = {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    };
  }
  const { subreddit, t, limit, after } = req.query;
  if (req.query) {
    if (subreddit) {
      baseURL = `https://www.reddit.com/r/${subreddit}/top.json?`;
      if (req.user) {
        baseURL = `https://oauth.reddit.com/r/${subreddit}/top?`;
      }
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
    .get(baseURL, headers)
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
            permalink: o.permalink,
            saved: o.saved,
            likes: o.likes,
            hidden: o.hidden,
            clicked: o.clicked,
            visited: o.visited,
            pinned: o.pinned,
            archived: o.archived,
            spoiler: o.spoiler,
            locked: o.locked,
            stickied: o.stickied,
            edited: o.edited,
            gilded: o.gilded,
            reddit_media: o.is_reddit_media_domain
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
  let headers = {};
  if (req.user) {
    baseURL = "https://oauth.reddit.com/controversial?";
    headers = {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    };
  }
  const { subreddit, t, limit, after } = req.query;

  if (req.query) {
    if (subreddit) {
      baseURL = `https://www.reddit.com/r/${subreddit}/controversial.json?`;
      if (req.user) {
        baseURL = `https://oauth.reddit.com/r/${subreddit}/controversial?`;
      }
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
    .get(baseURL, headers)
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
            permalink: o.permalink,
            saved: o.saved,
            likes: o.likes,
            hidden: o.hidden,
            clicked: o.clicked,
            visited: o.visited,
            pinned: o.pinned,
            archived: o.archived,
            spoiler: o.spoiler,
            locked: o.locked,
            stickied: o.stickied,
            edited: o.edited,
            gilded: o.gilded,
            reddit_media: o.is_reddit_media_domain
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
  let headers = {};
  if (req.user) {
    baseURL = "https://oauth.reddit.com/rising?";
    headers = {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
      }
    };
  }
  const { subreddit, limit, after } = req.query;
  if (req.query) {
    if (subreddit) {
      baseURL = `https://www.reddit.com/r/${subreddit}/rising.json?`;
      if (req.user) {
        baseURL = `https://oauth.reddit.com/r/${subreddit}/rising?`;
      }
    }
    if (limit) {
      baseURL += `limit=${limit}&`;
    }
    if (after) {
      baseURL += `after=${after}&`;
    }
  }
  axios
    .get(baseURL, headers)
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
            permalink: o.permalink,
            saved: o.saved,
            likes: o.likes,
            hidden: o.hidden,
            clicked: o.clicked,
            visited: o.visited,
            pinned: o.pinned,
            archived: o.archived,
            spoiler: o.spoiler,
            locked: o.locked,
            stickied: o.stickied,
            edited: o.edited,
            gilded: o.gilded,
            is_reddit_media: o.is_reddit_media_domain
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
  // let headers = {};
  // if (req.user) {
  //   baseURL = "https://oauth.reddit.com/random?";
  //   headers = {
  //     headers: {
  //       Authorization: `bearer ${req.user.accessToken}`,
  //       "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
  //     }
  //   };
  // }
  const { subreddit, t, limit, after } = req.query;

  if (req.query) {
    if (subreddit) {
      baseURL = `https://www.reddit.com/r/${subreddit}/random.json?`;
      // if (req.user) {
      //   baseURL = `https://oauth.reddit.com/r/${subreddit}/random?`;
      // }
    }
    // if (t) {
    //   baseURL += `sort=top&t=${t}&`;
    // }

    // if (limit) {
    //   baseURL += `limit=${limit}&`;
    // }
    // if (after) {
    //   baseURL += `after=${after}&`;
    // }
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
    if (a.data.display_name.toLowerCase() < b.data.display_name.toLowerCase())
      return -1;
    if (a.data.display_name.toLowerCase() > b.data.display_name.toLowerCase())
      return 1;
    return 0;
  };
  recursiveSubs(url);
};

const sidebar = (req, res, next) => {
  const { subreddit_name } = req.params;
  if (req.user) {
    axios
      .get(`https://oauth.reddit.com/r/${subreddit_name}/about`, {
        headers: {
          Authorization: `bearer ${req.user.accessToken}`,
          "User-Agent": `web-app:navit:v0.0.1 (by /${USER_AGENT})`
        }
      })
      .then(response => res.status(200).json(response.data));
  } else {
    axios
      .get(`https://www.reddit.com/r/${subreddit_name}/about.json`)
      .then(response => res.status(200).json(response.data))
      .catch(console.log);
  }
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
// SEARCH_TERMS IS THE INPUT BEING SEARCHED,
//SORT IS HOW TO SORT THE POSTS : "relevance","top","comments","new"
// TIME IS THE TIME PERIOD TO SORT : "hour","day","week","month","year","all")
//RESTRICT_SR RESTRICTS THE SEARCH TO JUST THE SUBREDDIT : "on"
const searchSubreddit = (req, res, next) => {
  const { search_terms, restrict, sort, time } = req.query;
  const { subreddit_name } = req.params;
  let baseURL = `https://www.reddit.com/search.json?q=${search_terms}`;

  if (subreddit_name) {
    baseURL = `https://www.reddit.com/r/${subreddit_name}/search.json?q=${search_terms}`;
  }
  if (restrict) {
    baseURL += "&restrict_sr=on";
  }
  if (sort) {
    baseURL += `&sort=${sort}`;
  }
  if (time) {
    baseURL += `&t=${time}`;
  }
  console.log(baseURL);
  axios.get(baseURL).then(response => res.status(200).json(response.data));
};

// SEARCH THE NAMES OF SUBREDDITS
// QUERY IS THE SEAARCHED NAME
//INCLUDE_OVER_18 IS IF NSFW SUBREDDITS ARE TO BE INCLUDED : (true or false)
const searchSubNames = (req, res, next) => {
  const { query, include_over_18 } = req.query;
  let baseURL = `https://www.reddit.com/api/search_reddit_names.json?query=${query}`;
  if (include_over_18) {
    baseURL += `&include_over_18=${include_over_18}`;
  }
  axios.get(baseURL).then(response => res.status(200).json(response.data));
};

const trendingSubreddits = (req, res, next) => {
  axios
    .get("http://www.reddit.com/api/trending_subreddits.json")
    .then(response => res.status(200).json(response.data.subreddit_names))
    .catch(console.log);
};

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
  subredditRules,
  subredditModerators,
  searchSubreddit,
  searchSubNames,
  trendingSubreddits
};
