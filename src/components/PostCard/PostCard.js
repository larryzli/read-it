import React from "react";
// import './PostCard.css';

const PostCard = ({
    title = "test",
    imgURL = "",
    poster = "test",
    link = "",
    subreddit = "r/all",
    timeAgo = 0,
    comments = 0,
    score = 0,
    vote = 0
}) => {
    return <div className="post">PostCard</div>;
};

export default PostCard;
