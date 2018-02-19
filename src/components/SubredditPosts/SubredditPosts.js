// IMPORT DEPENDENCIES
import React, { Component } from "react";
import moment from "moment";
// IMPORT COMPONENTS
import PostCard from "../PostCard/PostCard";

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
        <div className="posts">{posts}</div>
      </div>
    );
  }
}

// EXPORT COMPONENT
export default SubredditPosts;
