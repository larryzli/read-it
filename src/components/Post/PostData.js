// IMPORT DEPENDENCIES
import React from "react";
import moment from "moment";

// COMPONENT
const PostData = ({ postData }) => {
  return (
    <div className="postdata-container">
      <div>{/* <img src="" alt=""/> */} IMAGE AND LINK AND DOMAIN</div>
      <div className="postdata-info-container">
        <div className="postdata-title">{postData.post_title}</div>
        <div className="postdata-data">
          <span>{postData.author}</span>
          {" • "}
          <span>{moment(postData.created_at * 1000).fromNow()}</span>
          {" • "}
          <span># COMMENTS</span>
        </div>
      </div>
    </div>
  );
};

// EXPORT COMPONENT
export default PostData;
