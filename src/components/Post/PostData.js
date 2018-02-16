// IMPORT DEPENDENCIES
import React from "react";
import moment from "moment";

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
        <div className="postdata-data">
          <span>
            {postData.score > 10000
              ? (postData.score / 1000).toFixed(1) + "k"
              : postData.score}{" "}
            points
          </span>
          {" • "}
          <span>{postData.author}</span>
          {" • "}
          <span>{moment(postData.created_at * 1000).fromNow()}</span>
          {" • "}
          <span>{postData.comments_num} comments</span>
        </div>
      </div>
    </div>
  );
};

// EXPORT COMPONENT
export default PostData;
