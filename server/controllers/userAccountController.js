const axios = require("axios");

const getUserInfo = (req, res, next) => {
    if (req.user) {
        res.status(200).json(req.user._json);
    } else {
        res.status(200).json();
    }
};

const pullHot = (req, res, next) => {
    let baseURL = "https://www.reddit.com/hot.json?";
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

const getPost = (req, res, next) => {
    const { subreddit_title, post_id } = req.params;
    axios
        .get(`https://www.reddit.com/r/${subreddit_title}/${post_id}.json`)
        .then(response => {
            let r = response.data[0].data.children[0].data;
            res.status(200).json({
                post: {
                    domain: r.domain,
                    subreddit_title: subreddit_title,
                    post_id: post_id,
                    post_title: r.title,
                    created_at: r.created_utc,
                    author: r.author,
                    body: r.selftext
                },
                comments: response.data[1].data.children.map(el => {
                    return {
                        comment_id: el.data.id,
                        author: el.data.author,
                        body: el.data.body,
                        votes: el.data.score,
                        depth: el.data.depth,
                        replies: el.data.replies
                    };
                })
            });
        })
        .catch(console.log);
};

const getMoreComments = (req, res, next) => {
    const { post_id, children } = req.params;
    axios
        .get(
            `https://www.reddit.com/api/morechildren.json?link_id=t3_${post_id}&children=${children}&api_type=json`
        )
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(console.log);
};

module.exports = {
    getUserInfo,
    pullHot,
    pullBest,
    getPost,
    getMoreComments
};
