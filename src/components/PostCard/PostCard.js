// IMPORT DEPENDENCIES
import React from "react";
// IMPORT ICONS
import commentIcon from "../../icons/comment_tiny.svg";
import upvoteIcon from "../../icons/ic_keyboard_arrow_up_white_24px.svg";
import downvoteIcon from "../../icons/ic_keyboard_arrow_down_white_24px.svg";
// import './PostCard.css';

const PostCard = ({
    postID = null,
    url = "",
    title = "test",
    thumbnail = "",
    author = "test",
    domain = "",
    subreddit = "r/all",
    subredditID = null,
    created = null,
    comments = 0,
    score = 0,
    vote = 0,
    over18 = false
}) => {
    return (
        // POST
        <div className="post-container">
            {thumbnail === "self" ? null : thumbnail === "image" ? (
                <a className="post-link" href={url}>
                    <img className="post-thumbnail" src={url} alt="" />
                </a>
            ) : (
                <a className="post-link" href={url}>
                    <img className="post-thumbnail" src={thumbnail} alt="" />
                </a>
            )}
            <div className="post-info">
                <div className="post-title">
                    {title}
                    <span className="post-domain"> ({domain})</span>
                </div>
                <div className="post-details">
                    <span className="post-subreddit">r/{subreddit}</span>
                    {" • "}
                    <span className="post-author">{author}</span>
                </div>
                <div className="post-data">
                    <span className="post-age">{created}</span>
                    {" • "}
                    <span className="post-comments">
                        <span className="post-comment-count">{comments}</span>
                        <img src={commentIcon} alt="comment icon" />
                    </span>
                </div>
            </div>
            <div className="post-score-container">
                <img
                    className="post-upvote"
                    src={upvoteIcon}
                    alt="upvote icon"
                />
                <div className="post-score">
                    {score > 10000 ? (score / 1000).toFixed(1) + "k" : score}
                </div>
                <img
                    className="post-downvote"
                    src={downvoteIcon}
                    alt="downvote icon"
                />
            </div>
        </div>
    );
};

export default PostCard;
