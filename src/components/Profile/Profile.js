// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
// IMPORT ICONS
import loading from "../../icons/loading/loading-cylon-red.svg";
import rightArrow from "../../icons/ic_arrow_drop_down_grey_20px.svg";
import newMessageIcon from "../../icons/ic_create_white_24px.svg";
// IMPORT COMPONENTS
import PostNavigation from "../../components/Navigation/PostNavigation";
import PostCard from "../PostCard/PostCard";
// IMPORT REDUX FUNCTIONS
import { getUserInfo } from "../../ducks/userReducer";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // LOADING
      loading: true,
      loadingMore: false,

      // FILTERS
      filter: "new",
      filterPeriod: "",

      // USER INFO
      username: `${this.props.match.params.username}`,
      created: "",
      commentKarma: 0,
      linkKarma: 0,
      isFriend: true,

      // USER POSTS
      posts: [],
      after: "",

      // SORT
      showSortDrawer: false,
      showSortPeriodDrawer: false
    };
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    this.props.getUserInfo().then(response => {
      this.loadContent(this.state.filter);
    });
  }

  refreshHandler = () => {
    this.setState({ loading: true, after: "" });

    let url = `/api/user/about?username=${
      this.props.match.params.username
    }&sort=${this.state.filter}&`;

    if (this.state.filterPeriod) {
      url += `t=${this.state.filterPeriod}&`;
    }

    axios.get(url).then(response => {
      console.log(response);
      this.setState({
        posts: response.data.overview.data.children,
        after: response.data.overview.data.after,
        created: response.data.about.data.created_utc,
        linkKarma: response.data.about.data.link_karma,
        commentKarma: response.data.about.data.comment_karma,
        loading: false
      });
    });
  };

  loadContent = (filter, timeFrame, loadMore) => {
    if (!loadMore) {
      this.setState({ loading: true, posts: [], after: "" });
    }
    let url = `/api/user/about?username=${
      this.props.match.params.username
    }&sort=${filter}&`;

    if (this.state.after && loadMore) {
      url += `after=${this.state.after}&`;
    }
    if (timeFrame) {
      url += `t=${timeFrame}&`;
    }

    axios.get(url).then(response => {
      this.setState({
        posts: loadMore
          ? this.state.posts.concat(response.data.overview.data.children)
          : response.data.overview.data.children,
        after: response.data.overview.data.after,
        created: response.data.about.data.created_utc,
        linkKarma: response.data.about.data.link_karma,
        commentKarma: response.data.about.data.comment_karma,
        loading: false
      });
    });
  };

  changeFilter = (filterVal, filterPeriod) => {
    if (filterVal === "hot" || filterVal === "new") {
      this.setState({
        filter: filterVal,
        filterPeriod: "",
        loading: true
      });
      this.loadContent(filterVal);
    } else {
      this.setState({
        filter: filterVal,
        filterPeriod: filterPeriod,
        loading: false
      });
      this.loadContent(filterVal, filterPeriod);
    }
  };
  goHome() {
    this.props.history.goBack();
  }

  toggleSort = () => {
    this.setState({ showSortDrawer: !this.state.showSortDrawer });
  };

  toggleSortPeriod = periodTitle => {
    this.setState({
      showSortPeriodDrawer: !this.state.showSortPeriodDrawer,
      filterPeriodTitle: periodTitle
    });
  };

  createMessage = username => {
    this.props.history.push(`/createmessage/${username}`);
  };
  render() {
    // LOADER
    const loader = (
      <div className="loader-wrapper" key={"loader"}>
        <img src={loading} className="loader-svg" alt="loading" />
      </div>
    );
    // CREATE MESSAGE BUTTON
    const newMessageButton = (
      <div
        className="new-post-container"
        onClick={e => this.createMessage(this.props.match.params.username)}
      >
        <div className="new-post-icon">
          <img src={newMessageIcon} alt="send message to user" />
        </div>
      </div>
    );
    // SORT DRAWER
    const sortDrawer = (
      <div className="drawer-wrapper" onClick={e => this.toggleSort()}>
        <div className="drawer-container">
          <div className="drawer-item" onClick={e => this.changeFilter("hot")}>
            Hot
          </div>
          <div className="drawer-item" onClick={e => this.changeFilter("new")}>
            New
          </div>
          <div
            className="drawer-item"
            onClick={e => this.toggleSortPeriod("top")}
          >
            Top
            <img
              src={rightArrow}
              alt=""
              style={{ transform: "rotate(-90deg)" }}
            />
          </div>
          <div
            className="drawer-item"
            onClick={e => this.toggleSortPeriod("controversial")}
          >
            Controversial
            <img
              src={rightArrow}
              alt=""
              style={{ transform: "rotate(-90deg)" }}
            />
          </div>
        </div>
      </div>
    );
    // TIME DRAWER
    const sortPeriodDrawer = (
      <div className="drawer-wrapper" onClick={e => this.toggleSortPeriod()}>
        <div className="drawer-container">
          <div className="drawer-title">{this.state.filterPeriodTitle}</div>
          <div
            className="drawer-item"
            onClick={e =>
              this.changeFilter(this.state.filterPeriodTitle, "hour")
            }
          >
            Hour
          </div>
          <div
            className="drawer-item"
            onClick={e =>
              this.changeFilter(this.state.filterPeriodTitle, "day")
            }
          >
            Day
          </div>
          <div
            className="drawer-item"
            onClick={e =>
              this.changeFilter(this.state.filterPeriodTitle, "week")
            }
          >
            Week
          </div>
          <div
            className="drawer-item"
            onClick={e =>
              this.changeFilter(this.state.filterPeriodTitle, "month")
            }
          >
            Month
          </div>
          <div
            className="drawer-item"
            onClick={e =>
              this.changeFilter(this.state.filterPeriodTitle, "year")
            }
          >
            Year
          </div>
          <div
            className="drawer-item"
            onClick={e =>
              this.changeFilter(this.state.filterPeriodTitle, "all")
            }
          >
            All
          </div>
        </div>
      </div>
    );
    // EMPTY POSTS
    const emptyPosts = <div>There doesn't seem to be anything here</div>;
    //PROFILE COMMENTS AND POSTS
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
          enableControls={this.props.user.user.id ? true : false}
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
        {this.state.showSortDrawer ? sortDrawer : null}
        {this.state.showSortPeriodDrawer ? sortPeriodDrawer : null}
        <PostNavigation
          title={this.state.username}
          filterName={this.state.filter}
          goHome={this.goHome}
          sortAction={this.toggleSort}
        />
        {this.state.loading ? loader : null}

        <InfiniteScroll
          next={() =>
            this.loadContent(
              this.state.filter,
              this.state.filterPeriod,
              this.state.after ? true : false
            )
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
          <div className="profile-karma-container">
            <div className="profile-karma link-karma">
              <div className="karma-value">
                {this.state.linkKarma > 1000000
                  ? (this.state.linkKarma / 1000000).toFixed(1) + "m"
                  : this.state.linkKarma > 10000
                    ? (this.state.linkKarma / 1000).toFixed(1) + "k"
                    : this.state.linkKarma}
              </div>
              <div className="karma-label">Link Karma</div>
            </div>
            <div className="profile-karma comment-karma">
              <div className="karma-value">
                {this.state.commentKarma > 1000000
                  ? (this.state.commentKarma / 1000000).toFixed(1) + "m"
                  : this.state.commentKarma > 10000
                    ? (this.state.commentKarma / 1000).toFixed(1) + "k"
                    : this.state.commentKarma}
              </div>
              <div className="karma-label">Comment Karma</div>
            </div>
          </div>
          <div className="posts">
            {posts.length > 0 || this.state.loading ? posts : emptyPosts}
          </div>
        </InfiniteScroll>
        {this.props.user.user.name &&
        this.props.match.params.username !== this.props.user.user.name
          ? newMessageButton
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { getUserInfo })(Profile);
