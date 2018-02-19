// IMPORT DEPENDENCIES
import React from "react";
import moment from "moment";
import upvoteIcon from "../../icons/ic_keyboard_arrow_up_white_24px.svg";
// import upvoteIconClicked from "../../icons/ic_keyboard_arrow_up_green_24px 2.svg";
import downvoteIcon from "../../icons/ic_keyboard_arrow_down_white_24px.svg";
// import downvoteIconClicked from "../../icons/ic_keyboard_arrow_down_red_24px.svg";
import starIconEmpty from "../../icons/ic_star_border_white_20px.svg";
// import starIconFilled from "../../icons/ic_star_white_20px.svg";
import profileIcon from "../../icons/ic_person_white_20px.svg";
import moreIcon from "../../icons/ic_more_vert_white_20px.svg";

// COMPONENT
const PostData = ({ postData }) => {
  return (
    <div className="postdata-container">
      <div>
        {postData.image ? (
          <a className="postdata-link" href={postData.url}>
            <img
              className="postdata-image"
              src={postData.image}
              alt="link preview"
            />

            <div className="postdata-link-info-container">
              <div className="postdata-link-info">{postData.domain}</div>
              <div className="postdata-link-info">{postData.url}</div>
            </div>
          </a>
        ) : null}
      </div>
      <div className="postdata-info-container">
        <div className="postdata-title">{postData.post_title}</div>
        <div className="postdata-info">
          <span className="postdata-subreddit">
            /r/{postData.subreddit_title}
          </span>
          {" • "}
          <span className="postdata-author">{postData.author}</span>
        </div>
        <div className="postdata-data">
          <span className="postdata-score">
            {postData.score > 10000
              ? (postData.score / 1000).toFixed(1) + "k"
              : postData.score}{" "}
            points
          </span>
          {" • "}
          <span>{moment(postData.created_at * 1000).fromNow()}</span>
          {" • "}
          <span>{postData.comments_num} comments</span>
        </div>
      </div>
      <div className="postdata-controls">
        <div className="postdata-left-controls">
          <img className="postdata-control-icon" src={upvoteIcon} alt="" />
          <img className="postdata-control-icon" src={downvoteIcon} alt="" />
          <img className="postdata-control-icon" src={starIconEmpty} alt="" />
          <img className="postdata-control-icon" src={profileIcon} alt="" />
          <span className="postdata-control-icon">{" /r/"}</span>
        </div>
        <div className="postdata-right-controls">
          <img className="postdata-control-icon" src={moreIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

// EXPORT COMPONENT
export default PostData;
