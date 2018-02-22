// IMPORT DEPENDENCIES
import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
// IMPORT ICONS
import loading from "../../icons/loading/loading-cylon-red.svg";
// import dropdownIcon from "../../icons/ic_arrow_drop_down_grey_20px.svg";
// import commentIcon from "../../icons/comment_tiny.svg";
import upvoteIcon from "../../icons/ic_keyboard_arrow_up_white_24px.svg";
import upvoteIconClicked from "../../icons/ic_keyboard_arrow_up_green_24px 2.svg";
import downvoteIcon from "../../icons/ic_keyboard_arrow_down_white_24px.svg";
import downvoteIconClicked from "../../icons/ic_keyboard_arrow_down_red_24px.svg";
import starIconEmpty from "../../icons/ic_star_border_white_20px.svg";
import starIconFilled from "../../icons/ic_star_white_20px.svg";
import profileIcon from "../../icons/ic_person_white_20px.svg";
import replyIcon from "../../icons/ic_reply_white_20px.svg";
// import moreIcon from "../../icons/ic_more_vert_white_20px.svg";

// COMPONENT
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReplies: true,
      moreComments: [],
      showMore: true,
      showControls: false,

      // REPLY INPUT
      showReplyInput: false,
      replySubmitted: false,

      // LOADING
      loading: false,

      // VOTING
      upvoted: this.props.commentData.likes === true,
      downvoted: this.props.commentData.likes === false,

      // FAVORITING
      favorited: this.props.commentData.saved,

      // HIDING
      hidden: false
    };
  }
  // COMMENT REPLY METHODS
  revealReplies = () => {
    this.setState({ showReplies: !this.state.showReplies });
  };
  viewMore = (postID, children) => {
    this.setState({ loading: true });
    children = children.join(",");
    axios
      .get(`/api/post/comments/more/${postID}/${children}`)
      .then(response => {
        this.setState({
          moreComments: response.data.json.data.things,
          showMore: false,
          loading: false
        });
      });
  };
  // COMMENT CONTROLS METHODS
  toggleControls = () => {
    this.setState({ showControls: !this.state.showControls });
  };
  upvote = () => {
    if (this.props.enableControls) {
      axios
        .post("/api/vote", { vote: 1, id: `t1_${this.props.commentData.id}` })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ upvoted: true, downvoted: false });
    } else {
      alert("Please login to use this feature");
    }
  };
  downvote = () => {
    if (this.props.enableControls) {
      axios
        .post("/api/vote", { vote: -1, id: `t1_${this.props.commentData.id}` })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ upvoted: false, downvoted: true });
    } else {
      alert("Please login to use this feature");
    }
  };
  cancelvote = () => {
    if (this.props.enableControls) {
      axios
        .post("/api/vote", { vote: 0, id: `t1_${this.props.commentData.id}` })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ upvoted: false, downvoted: false });
    } else {
      alert("Please login to use this feature");
    }
  };
  favorite = () => {
    if (this.props.enableControls) {
      axios
        .post("/api/favorites/save", { id: `t1_${this.props.commentData.id}` })
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
    if (this.props.enableControls) {
      axios
        .post("/api/favorites/unsave", {
          id: `t1_${this.props.commentData.id}`
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

  render() {
    // COMMENT COLORS
    const borderColors = [
      "#8F6DCE",
      "#06D6A0",
      "#EF476F",
      "#139AC6",
      "#FFD166"
    ];
    // REPLIES
    let replies;
    if (this.props.commentData.replies) {
      replies = this.props.commentData.replies.data.children.map(
        (reply, index) => {
          if (reply.kind !== "more") {
            return (
              <Comment
                postID={this.props.postID}
                key={index}
                commentData={reply.data}
                enableControls={this.props.enableControls}
              />
            );
          } else {
            if (reply.data.children[0]) {
              return this.state.showMore ? (
                <div
                  className="comment-container load-more"
                  style={{
                    borderLeft: `5px solid ${
                      borderColors[(this.props.commentData.depth + 1) % 5]
                    }`,
                    marginLeft: `${5 * this.props.commentData.depth}px`
                  }}
                  key={index}
                  onClick={e =>
                    this.viewMore(this.props.postID, reply.data.children)
                  }
                >
                  View {reply.data.children.length} more
                </div>
              ) : null;
            } else {
              return null;
            }
          }
        }
      );
    }
    // MORE COMMENTS
    let moreComments = this.state.moreComments.map((comment, index) => {
      return (
        <Comment
          postID={this.props.postID}
          key={index}
          commentData={comment.data}
          style={{
            marginLeft: `${5 * comment.data.depth - 5}px`
          }}
        />
      );
    });
    // LOADER
    const loader = (
      <div className="loader-wrapper" key={"loader"}>
        <img src={loading} className="loader-svg" alt="loading" />
      </div>
    );
    return (
      <div className="comment-wrapper">
        <div
          className="comment-container"
          style={
            this.props.commentData.depth !== 0
              ? {
                  borderLeft: `5px solid ${
                    borderColors[this.props.commentData.depth % 5]
                  }`,
                  marginLeft: `${5 * this.props.commentData.depth - 5}px`
                }
              : null
          }
        >
          <div className="comment-text" onClick={e => this.toggleControls()}>
            <div className="comment-data">
              <span className="comment-author">
                {this.props.commentData.author}
              </span>

              <span
                className="comment-score"
                style={
                  this.state.upvoted
                    ? { color: "#06D6A0" }
                    : this.state.downvoted ? { color: "#ff445b" } : null
                }
              >
                {this.props.commentData.score_hidden
                  ? "[score hidden]"
                  : this.props.commentData.score + " points"}
              </span>

              <span className="comment-age">
                {moment(this.props.commentData.created_utc * 1000).fromNow()}
              </span>
            </div>
            <div className="comment-body">{this.props.commentData.body}</div>
          </div>
          {replies ? (
            <div
              className="comment-collapse"
              onClick={e => this.revealReplies()}
            >
              {this.state.showReplies ? <span>–</span> : <span>+</span>}
            </div>
          ) : null}
        </div>
        {this.state.showControls ? (
          <div className="comment-controls">
            <div className="comment-left-controls">
              {this.state.upvoted ? (
                <img
                  className="comment-control-icon"
                  src={upvoteIconClicked}
                  alt="upvoted"
                  onClick={this.cancelvote}
                />
              ) : (
                <img
                  className="comment-control-icon"
                  src={upvoteIcon}
                  alt="upvote"
                  onClick={this.upvote}
                />
              )}
              {this.state.downvoted ? (
                <img
                  className="comment-control-icon"
                  src={downvoteIconClicked}
                  alt="downvote"
                  onClick={this.cancelvote}
                />
              ) : (
                <img
                  className="comment-control-icon"
                  src={downvoteIcon}
                  alt="downvote"
                  onClick={this.downvote}
                />
              )}
              {this.state.favorited ? (
                <img
                  className="comment-control-icon"
                  src={starIconFilled}
                  alt="unfavorite"
                  onClick={this.unfavorite}
                />
              ) : (
                <img
                  className="comment-control-icon"
                  src={starIconEmpty}
                  alt="favorite"
                  onClick={this.favorite}
                />
              )}
              <img className="comment-control-icon" src={profileIcon} alt="" />
              <img className="comment-control-icon" src={replyIcon} alt="" />
            </div>
            {/* <div className="comment-right-controls">
              <img className="comment-control-icon" src={moreIcon} alt="" />
            </div> */}
          </div>
        ) : null}
        {this.state.showReplies && replies ? replies : null}
        {this.state.loading ? loader : null}
        {moreComments}
      </div>
    );
  }
}

// EXPORT COMPONENT
export default Comment;
