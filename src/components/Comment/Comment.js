// IMPORT DEPENDENCIES
import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import ReactMarkdown from "react-markdown";
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
      showContinue: true,

      // REPLY INPUT
      showReplyInput: false,
      replySubmitted: false,
      replyText: "",

      // LOADING
      loading: false,
      loadingContinue: false,

      // VOTING
      upvoted: this.props.commentData.likes === true,
      downvoted: this.props.commentData.likes === false,
      score: this.props.commentData.score,

      // FAVORITING
      favorited: this.props.commentData.saved,

      // HIDING
      hidden: false
    };
  }
  // COMMENT REPLY INPUT METHODS
  toggleInput = () => {
    if (this.props.enableControls) {
      this.setState({ showReplyInput: !this.state.showReplyInput });
    } else {
      alert("Please log in to leave a reply");
    }
  };
  inputChange = value => {
    this.setState({ replyText: value });
  };
  submitReply = () => {
    axios
      .post("/api/reply", {
        parentId: `${this.props.commentData.name}`,
        text: this.state.replyText
      })
      .then(response => {
        const newReply = [{}];
        newReply[0].data = response.data.json.data.things[0].data;
        newReply[0].data.depth = this.props.commentData.depth + 1;
        newReply[0].enableControls = true;
        newReply[0].postID = this.props.postID;
        console.log(newReply);
        this.setState({
          replyText: "",
          showReplyInput: false,
          moreComments: newReply.concat(this.state.moreComments)
        });
      })
      .catch(console.log);
  };
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
  continueThread = (parent_id, depth) => {
    this.setState({ loadingContinue: true });
    parent_id = parent_id.split("_")[1];
    const url = this.props.commentData.permalink.split("/");
    const title = url[url.length - 3];
    axios
      .get(
        `/api/post/${this.props.commentData.subreddit}/${
          this.props.postID
        }/${title}/${parent_id}?sort=${this.props.filter}`
      )
      .then(response => {
        // console.log(response.data.comments[0].data.replies.data.children);
        const newReplies = response.data.comments[0].data.replies.data.children;
        newReplies.forEach(function increaseDepth(el) {
          el.data.depth += 9;
          if (el.data.replies) {
            increaseDepth(el.data.replies.data.children[0]);
          }
        });
        // console.log(this.state.moreComments);
        const index = this.state.moreComments.findIndex(el => {
          return el.data.id === parent_id;
        });
        // console.log(index);
        const newMoreComments = this.state.moreComments;
        newMoreComments.splice(index + 1, newReplies.length, ...newReplies);
        this.setState({ moreComments: newMoreComments });
      })
      .catch(console.log);
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
    if (this.props.enableControls) {
      axios
        .post("/api/vote", { vote: -1, id: `t1_${this.props.commentData.id}` })
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
    if (this.props.enableControls) {
      axios
        .post("/api/vote", { vote: 0, id: `t1_${this.props.commentData.id}` })
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
    // console.log(this.props);
    // COMMENT COLORS
    const borderColors = [
      "#8F6DCE",
      "#06D6A0",
      "#EF476F",
      "#139AC6",
      "#FFD166"
    ];
    // REPLIES
    const replyInput = (
      <div className="reply-container">
        <textarea
          type="text"
          className="reply-input"
          value={this.state.replyText}
          onChange={e => this.inputChange(e.target.value)}
          placeholder={`Reply to ${this.props.commentData.author}`}
        />
        <button className="reply-submit" onClick={e => this.submitReply()}>
          POST REPLY
        </button>
      </div>
    );
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
                filter={this.props.filter}
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
      if (comment.data.id !== "_") {
        return (
          <Comment
            postID={this.props.postID}
            key={index}
            commentData={comment.data}
            filter={this.props.filter}
            style={{
              marginLeft: `${5 * comment.data.depth - 5}px`
            }}
          />
        );
      } else {
        console.log(comment);
        console.log(this.state, this.props);
        return this.state.showContinue ? (
          <div
            className="comment-container load-more"
            style={{
              borderLeft: `5px solid ${borderColors[comment.data.depth % 5]}`,
              marginLeft: `${5 * (comment.data.depth - 1)}px`
            }}
            key={index}
            onClick={e =>
              this.continueThread(comment.data.parent_id, comment.data.depth)
            }
          >
            Continue this thread
          </div>
        ) : null;
      }
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
              <span
                className="comment-author"
                style={
                  this.props.commentData.is_submitter
                    ? {
                        backgroundColor: "#4a90e2",
                        padding: "0 5px",
                        color: "#ffffff",
                        borderRadius: "3px"
                      }
                    : null
                }
              >
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
                  : this.state.score > 10000
                    ? (this.state.score / 1000).toFixed(1) + "k"
                    : this.state.score + " points"}
              </span>

              <span className="comment-age">
                {moment(this.props.commentData.created_utc * 1000).fromNow()}
              </span>
            </div>
            <div className="comment-body">
              <ReactMarkdown source={this.props.commentData.body} />
            </div>
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
              <img
                className="comment-control-icon"
                src={profileIcon}
                alt="view author profile"
              />
              <img
                className="comment-control-icon"
                src={replyIcon}
                alt="reply to comment"
                onClick={e => this.toggleInput()}
              />
            </div>
            {/* <div className="comment-right-controls">
              <img className="comment-control-icon" src={moreIcon} alt="" />
            </div> */}
          </div>
        ) : null}
        {this.state.showReplyInput ? replyInput : null}
        {this.state.showReplies && replies ? replies : null}
        {this.state.loading ? loader : null}
        {moreComments}
      </div>
    );
  }
}

// EXPORT COMPONENT
export default Comment;
