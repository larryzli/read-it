// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
// IMPORT COMPONENTS
import PostNavigation from "../Navigation/PostNavigation";
import PostData from "../Post/PostData";
import Comment from "../Comment/Comment";
// IMPORT ICONS
import loading from "../../icons/loading/loading-cylon-red.svg";
import replyIcon from "../../icons/ic_reply_white_20px.svg";
import commentIcon from "../../icons/comment_large.svg";
// IMPORT REDUX FUNCTION
import { getUserInfo } from "../../ducks/userReducer";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // LOADING
      loading: true,

      // VOTING
      upvoted: false,
      downvoted: false,

      // FAVORITING
      favorited: false,

      // HIDING
      hidden: false,

      // CONTROLS
      enableControls: false,

      // DATA
      postData: {},
      score: 0,
      comments: [],
      filter: this.props.match.params.filter || "best",

      // SORT
      showSortDrawer: false
    };

    this.goHome = this.goHome.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.cancelvote = this.cancelvote.bind(this);
    this.favorite = this.favorite.bind(this);
    this.unfavorite = this.unfavorite.bind(this);
    this.hide = this.hide.bind(this);
    this.unhide = this.unhide.bind(this);
    this.loadContent = this.loadContent.bind(this);
  }
  goHome() {
    this.props.history.goBack();
  }
  upvote = () => {
    if (this.state.enableControls) {
      axios
        .post("/api/vote", { vote: 1, id: `t3_${this.state.postData.post_id}` })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({
        upvoted: true,
        downvoted: false,
        score: this.state.score + 1
      });
    } else {
      alert("Please login to use this feature");
    }
  };
  downvote = () => {
    if (this.state.enableControls) {
      axios
        .post("/api/vote", {
          vote: -1,
          id: `t3_${this.state.postData.post_id}`
        })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({
        upvoted: false,
        downvoted: true,
        score: this.state.score - 1
      });
    } else {
      alert("Please login to use this feature");
    }
  };
  cancelvote = () => {
    if (this.state.enableControls) {
      axios
        .post("/api/vote", { vote: 0, id: `t3_${this.state.postData.post_id}` })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({
        upvoted: false,
        downvoted: false,
        score: this.state.upvoted ? this.state.score - 1 : this.state.score + 1
      });
    } else {
      alert("Please login to use this feature");
    }
  };
  favorite = () => {
    if (this.state.enableControls) {
      axios
        .post("/api/favorites/save", {
          id: `t3_${this.state.postData.post_id}`
        })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ favorited: true });
    } else {
      alert("Please login to use this feature");
    }
  };
  unfavorite = () => {
    if (this.state.enableControls) {
      axios
        .post("/api/favorites/unsave", {
          id: `t3_${this.state.postData.post_id}`
        })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ favorited: false });
    } else {
      alert("Please login to use this feature");
    }
  };
  hide = () => {
    if (this.state.enableControls) {
      axios
        .post("/api/post/hide", { id: `t3_${this.state.postData.post_id}` })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ hidden: true });
    } else {
      alert("Please login to use this feature");
    }
  };
  unhide = () => {
    if (this.state.enableControls) {
      axios
        .post("/api/post/unhide", { id: `t3_${this.state.postData.post_id}` })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ hidden: false });
    } else {
      alert("Please login to use this feature");
    }
  };
  changeFilter = filterVal => {
    this.setState({
      filter: filterVal,
      loading: true
    });
    // this.props.history.push(
    //   `/r/${this.props.match.params.subreddit}/post/${
    //     this.props.match.params.post
    //   }/${filterVal}`
    // );
    if (filterVal === "best") {
      filterVal = "confidence";
    }
    this.loadContent(filterVal);
  };
  toggleSort = () => {
    this.setState({ showSortDrawer: !this.state.showSortDrawer });
  };
  loadContent = filter => {
    this.setState({ loading: true });
    const { post, subreddit } = this.props.match.params;
    axios
      .get(`/api/post/${subreddit}/${post}?sort=${filter}`)
      .then(response => {
        this.setState({
          postData: response.data.post,
          score: response.data.post.score,
          comments: response.data.comments,
          loading: false,
          upvoted: response.data.post.likes === true,
          downvoted: response.data.post.likes === false,
          favorited: response.data.post.saved,
          hidden: response.data.post.hidden
        });
      });
  };
  componentDidMount() {
    this.props.getUserInfo().then(response => {
      this.setState({ enableControls: this.props.user.user.id ? true : false });
    });
    this.loadContent(this.state.filter);
  }
  render() {
    const newCommentButton = (
      <div className="new-post-container" onClick={this.toggleNewPost}>
        <div
          className="new-post-icon"
          style={{
            paddingTop: "14px",
            paddingLeft: "13px",
            paddingRight: "13px",
            paddingBottom: "10px"
          }}
        >
          <img src={commentIcon} alt="add new post" />
        </div>
      </div>
    );
    const sortDrawer = (
      <div className="drawer-wrapper" onClick={e => this.toggleSort()}>
        <div className="drawer-container">
          <div className="drawer-item" onClick={e => this.changeFilter("top")}>
            Top
          </div>
          <div className="drawer-item" onClick={e => this.changeFilter("best")}>
            Best
          </div>
          <div className="drawer-item" onClick={e => this.changeFilter("new")}>
            New
          </div>
          <div className="drawer-item" onClick={e => this.changeFilter("old")}>
            Old
          </div>
          <div
            className="drawer-item"
            onClick={e => this.changeFilter("random")}
          >
            Random
          </div>
          <div
            className="drawer-item"
            onClick={e => this.changeFilter("controversial")}
          >
            Controversial
          </div>
          <div className="drawer-item" onClick={e => this.changeFilter("qa")}>
            Q&A
          </div>
        </div>
      </div>
    );
    const comments = this.state.comments.map((comment, index) => {
      return (
        <Comment
          postID={this.state.postData.post_id}
          key={index}
          commentData={comment.data}
          enableControls={this.state.enableControls}
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
        {this.state.showSortDrawer ? sortDrawer : null}
        <PostNavigation
          title={this.state.postData.subreddit_title}
          filterName={this.state.filter}
          goHome={this.goHome}
          sortAction={this.toggleSort}
        />
        {this.state.loading ? loader : null}
        <InfiniteScroll
          height={"calc(100vh - 56px)"}
          pullDownToRefresh
          pullDownToRefreshContent={
            <h3 className="refresh-message">&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 className="refresh-message">&#8593; Release to refresh</h3>
          }
          refreshFunction={e => this.loadContent(this.state.filter)}
        >
          {this.state.loading ? null : (
            <div>
              <PostData
                postData={this.state.postData}
                score={this.state.score}
                upvoted={this.state.upvoted}
                downvoted={this.state.downvoted}
                favorited={this.state.favorited}
                hidden={this.state.hidden}
                enableControls={this.state.enableControls}
                upvote={this.upvote}
                downvote={this.downvote}
                cancelvote={this.cancelvote}
                favorite={this.favorite}
                unfavorite={this.unfavorite}
                hide={this.hide}
                unhide={this.unhide}
              />
              <div className="comments-wrapper">{comments}</div>
            </div>
          )}
        </InfiniteScroll>
        {newCommentButton}
      </div>
    );
  }
}

// CONNECT TO REDUX
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, { getUserInfo })(Post);
