// IMPORT DEPENDENCIES
import React, { Component } from "react";
import moment from "moment";
import ReactPullToRefresh from "react-pull-to-refresh";
// IMPORT COMPONENTS
import PostCard from "../PostCard/PostCard";
// IMPORT ICONS
import upIcon from "../../icons/ic_keyboard_arrow_up_white_24px.svg";

// COMPONENT
class SubredditPosts extends Component {
  render() {
    // LOAD SUBREDDIT POSTS
    const posts = this.props.subredditPosts.map((post, index) => {
      return (
        <PostCard
          key={index}
          title={post.post_title}
          domain={post.domain}
          subreddit={post.subreddit_title}
          author={post.author}
          thumbnail={post.post_thumbnail}
          comments={post.num_comments}
          score={post.score}
          subredditID={post.subreddit_id}
          created={moment(post.created_utc * 1000).fromNow()}
          url={post.url}
          over18={post.over_18}
          postID={post.post_id}
        />
      );
    });
    return (
      <div>
        {this.props.navigation}
        <ReactPullToRefresh
          onRefresh={this.props.refreshHandler}
          icon={
            <span className="genericon genericon-next">
              <img className="loading-icon" src={upIcon} alt="" />
              <br />
              <span className="preload-text">Pull down to refresh</span>
              <span className="load-text">Release to refresh</span>
            </span>
          }
          distanceToRefresh={60}
        >
          <div className="posts" id="content">
            {posts}
          </div>
        </ReactPullToRefresh>
      </div>
    );
  }
}

// EXPORT COMPONENT
export default SubredditPosts;
