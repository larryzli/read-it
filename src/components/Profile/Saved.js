// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
// IMPORT ICONS
import loading from "../../icons/loading/loading-cylon-red.svg";
//IMPORT COMPONENTS
import SavedNavigation from "../../components/Navigation/SavedNavigation";
import PostCard from "../PostCard/PostCard";
import { getUserInfo } from "../../ducks/userReducer";

class Saved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // LOADING
      loading: true,
      loadingMore: false,
      loggedIn: true,

      // FILTERS
      filter: "Saved",

      // USER INFO
      username: "Guest",
      showSortDrawer: false,
      created: "",
      commentKarma: 0,
      linkKarma: 0,
      isFriend: true,

      // USER POSTS
      posts: [],
      after: ""
    };
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    this.props.getUserInfo().then(response => {
      if (this.props.user.user.id) {
        this.setState({
          username: this.props.user.user.name
        });
        this.loadContent(this.state.filter);
      } else {
        this.setState({ loggedIn: false, loading: false });
      }
    });
  }

  refreshHandler = () => {
    if (this.state.loggedIn) {
      this.setState({ loading: true, after: "", posts: [] });

      let url = `/api/user/saved?username=${this.state.username}`;

      axios.get(url).then(response => {
        console.log(response);
        this.setState({
          posts: response.data.data.children,
          after: response.data.data.after,
          loading: false
        });
      });
    }
  };

  loadContent = (filter, loadMore) => {
    if (!loadMore) {
      this.setState({ loading: true, posts: [], after: "" });
    }
    let url = `/api/user/saved?username=${this.state.username}&`;

    if (this.state.after && loadMore) {
      url += `after=${this.state.after}&`;
    }

    console.log(url);
    axios.get(url).then(response => {
      console.log(response);
      this.setState({
        posts: loadMore
          ? this.state.posts.concat(response.data.data.children)
          : response.data.data.children,
        after: response.data.data.after,
        loading: false
      });
    });
  };

  goHome() {
    this.props.history.goBack();
  }

  render() {
    console.log(this.props);
    // LOADER
    const loader = (
      <div className="loader-wrapper" key={"loader"}>
        <img src={loading} className="loader-svg" alt="loading" />
      </div>
    );
    // EMPTY POSTS
    const emptyPosts = (
      <div className="end-message">
        {this.state.loggedIn
          ? "There doesn't seem to be anything here"
          : "Please log in to use this feature"}
      </div>
    );
    // END OF SAVED
    const end = <div className="end-message">End of saved</div>;
    // PROFILE COMMENTS AND POSTS
    const posts = [];
    this.state.posts.forEach((post, index) => {
      posts.push(
        <PostCard
          key={index}
          title={post.data.title ? post.data.title : post.data.link_title}
          domain={post.data.domain ? post.data.domain : post.data.subreddit}
          subreddit={post.data.subreddit}
          author={post.kind === "t1" ? post.data.link_author : post.data.author}
          thumbnail={post.data.thumbnail ? post.data.thumbnail : null}
          comments={post.data.num_comments}
          score={post.data.score}
          subredditID={post.data.subreddit_id}
          created={moment(post.data.created_utc * 1000).fromNow()}
          url={post.data.url}
          over18={post.data.over_18}
          postID={post.data.id}
          likes={post.data.likes}
          saved={post.data.saved}
          enableControls={true}
          hidden={post.data.hidden}
          clicked={post.data.clicked}
          visited={post.data.visited}
          pinned={post.data.pinned}
          archived={post.data.archived}
          spoiler={post.data.spoiler}
          locked={post.data.locked}
          stickied={post.data.stickied}
          edited={post.data.edited}
          gilded={post.data.gilded}
          isRedditMedia={post.data.is_reddit_media}
          showSubredditControl={true}
          type={post.kind}
          link_id={post.data.link_id || ""}
          commentBody={post.data.body}
        />
      );
    });

    return (
      <div className="profile-page">
        <SavedNavigation
          title={this.state.username}
          filterName={this.state.filter}
          goHome={this.goHome}
        />
        {this.state.loading ? loader : null}
        <InfiniteScroll
          next={() =>
            this.loadContent(this.state.filter, this.state.after ? true : false)
          }
          hasMore={this.state.after ? true : false}
          height={"calc(100vh - 56px)"}
          loader={loader}
          pullDownToRefresh
          pullDownToRefreshContent={
            <h3 className="refresh-message">&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 className="refresh-message">&#8593; Release to refresh</h3>
          }
          refreshFunction={this.refreshHandler}
        >
          <div className="posts">
            {posts.length > 0 || this.state.loading ? posts : emptyPosts}
          </div>
          {this.state.posts.length && !this.state.after ? end : null}
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { getUserInfo })(Saved);
