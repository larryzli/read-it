// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
// IMPORT COMPONENTS
import PostNavigation from "../Navigation/PostNavigation";
import PostData from "../Post/PostData";
import Comment from "../Comment/Comment";
// IMPORT ICONS
import loading from "../../icons/loading/loading-cylon-red.svg";

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

      postData: {},
      comments: [],
      filter: "TOP"
    };

    this.goHome = this.goHome.bind(this);
  }
  goHome() {
    this.props.history.goBack();
  }
  componentDidMount() {
    const { post, subreddit } = this.props.match.params;
    axios.get(`/api/post/${subreddit}/${post}`).then(response => {
      this.setState({
        postData: response.data.post,
        comments: response.data.comments,
        loading: false
      });
    });
  }
  render() {
    console.log(this.state);
    const comments = this.state.comments.map((comment, index) => {
      return (
        <Comment
          postID={this.state.postData.post_id}
          key={index}
          commentData={comment.data}
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
        <PostNavigation
          title={this.state.postData.subreddit_title}
          filterName={this.state.filter}
          goHome={this.goHome}
        />
        {this.state.loading ? (
          loader
        ) : (
          <div>
            <PostData
              postData={this.state.postData}
              upvoted={this.state.upvoted}
              downvoted={this.state.downvoted}
              favorited={this.state.favorited}
              hidden={this.state.hidden}
              enableControls={this.props.user.user.id ? true : false}
            />
            <div className="comments-wrapper">{comments}</div>
          </div>
        )}
      </div>
    );
  }
}

// CONNECT TO REDUX
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Post);
