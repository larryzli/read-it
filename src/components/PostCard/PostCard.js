// IMPORT DEPENDENCIES
import React from "react";
// IMPORT ICONS
import commentIcon from "../../icons/comment_tiny.svg";
// import './PostCard.css';

const PostCard = ({
    postID = null,
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
        <div className="post-container">
            {thumbnail ? (
                <img className="post-thumbnail" src={thumbnail} alt="" />
            ) : null}
            <div className="post-info">
                <div className="post-title">
                    {title}
                    <span className="post-domain"> ({domain})</span>
                </div>
                <div className="post-details">
                    <span className="post-subreddit">r/{subreddit}</span>
                    {" • "}
                    <span className="post-author">{author}</span>
                    {" • "}
                    <span className="post-age">{created}</span>
                    {" • "}
                    <span className="post-comments">
                        {comments} <img src={commentIcon} alt="comment icon" />
                    </span>
                </div>
            </div>
            <div className="post-score-container" />
        </div>
    );
};

export default PostCard;
