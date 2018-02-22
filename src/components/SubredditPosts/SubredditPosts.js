// IMPORT DEPENDENCIES
import React, { Component } from "react";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
// IMPORT COMPONENTS
import PostCard from "../PostCard/PostCard";
// IMPORT ICONS
import loading from "../../icons/loading/loading-cylon-red.svg";

// COMPONENT
class SubredditPosts extends Component {
  render() {
    // LOAD SUBREDDIT POSTS
    const posts = [];
    this.props.subredditPosts.forEach((post, index) => {
      posts.push(
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
          likes={post.likes}
          saved={post.saved}
          enableControls={this.props.enableControls}
          hidden={post.hidden}
          clicked={post.clicked}
          visited={post.visited}
          pinned={post.pinned}
          archived={post.archived}
          spoiler={post.spoiler}
          locked={post.locked}
          stickied={post.stickied}
          edited={post.edited}
          gilded={post.gilded}
          isRedditMedia={post.is_reddit_media}
          showSubredditControl={this.props.showSubredditControl}
        />
      );
    });
    const loader = (
      <div className="loader-wrapper" key={"loader"}>
        <img src={loading} className="loader-svg" alt="loading" />
      </div>
    );
    return (
      <div>
        {this.props.navigation}
        {this.props.isLoading ? loader : null}
        <InfiniteScroll
          next={() =>
            this.props.loadContent(
              this.props.filter,
              this.props.filterPeriod,
              this.props.hasMore
            )
          }
          hasMore={this.props.hasMore}
          height={"calc(100vh - 56px)"}
          loader={loader}
          pullDownToRefresh
          pullDownToRefreshContent={
            <h3 className="refresh-message">&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 className="refresh-message">&#8593; Release to refresh</h3>
          }
          refreshFunction={this.props.refreshHandler}
        >
          <div className="posts">{posts}</div>
        </InfiniteScroll>
      </div>
    );
  }
}

// EXPORT COMPONENT
export default SubredditPosts;
