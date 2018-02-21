// IMPORT DEPENDENCIES
import React, { Component } from "react";
import moment from "moment";
// import ReactPullToRefresh from "react-pull-to-refresh";
import InfiniteScroll from "react-infinite-scroll-component";
// IMPORT COMPONENTS
import PostCard from "../PostCard/PostCard";
// IMPORT ICONS
// import upIcon from "../../icons/ic_keyboard_arrow_up_white_24px.svg";
import loading from "../../icons/loading/loading-cylon-red.svg";

// COMPONENT
class SubredditPosts extends Component {
  loadMore = () => {
    console.log("LOADING MORE");
    this.props.loadContent(
      this.props.filter,
      this.props.filterPeriod,
      this.props.hasMore
    );
  };
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
        {/* <ReactPullToRefresh
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
        > */}
        {/* <div className="posts"> */}
        <InfiniteScroll
          next={() => setTimeout(this.loadMore, 500)}
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
        {/* </div> */}
        {/* </ReactPullToRefresh> */}
      </div>
    );
  }
}

// EXPORT COMPONENT
export default SubredditPosts;
