// IMPORT DEPENDENCIES
import React, { Component } from "react";
import axios from "axios";
// IMPORT ICONS
import collapseIcon from "../../icons/ic_arrow_drop_down_grey_20px.svg";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReplies: true,
      moreComments: [],
      showMore: true
    };
  }

  revealReplies = () => {
    this.setState({ showReplies: !this.state.showReplies });
  };
  viewMore = (postID, children) => {
    children = children.join(",");
    console.log(children);
    axios
      .get(`/api/post/comments/more/${postID}/${children}`)
      .then(response => {
        console.log(response);
        this.setState({
          moreComments: response.data.json.data.things,
          showMore: false
        });
      });
  };

  render() {
    console.log(this.props);
    const borderColors = [
      "#8F6DCE",
      "#06D6A0",
      "#EF476F",
      "#139AC6",
      "#FFD166"
    ];
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
                    }`
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

    let moreComments = this.state.moreComments.map((comment, index) => {
      return (
        <Comment
          postID={this.props.postID}
          key={index}
          commentData={comment.data}
        />
      );
    });

    return (
      <div
        className="comment-wrapper"
        style={
          this.props.commentData.depth !== 0 &&
          this.props.commentData.depth !== 1
            ? {
                borderLeft: `5px solid #333`
              }
            : null
        }
      >
        <div
          className="comment-container"
          style={
            this.props.commentData.depth !== 0
              ? {
                  borderLeft: `5px solid ${
                    borderColors[this.props.commentData.depth % 5]
                  }`
                }
              : null
          }
        >
          <div className="comment-text">
            <div className="comment-data">
              <span className="comment-author">
                {this.props.commentData.author}
              </span>
              {"   "}
              <span className="comment-score">
                {this.props.commentData.score} points
              </span>
            </div>
            <div className="comment-body">{this.props.commentData.body}</div>
          </div>
          {replies ? (
            <div
              className="comment-collapse"
              onClick={e => this.revealReplies()}
            >
              {this.state.showReplies ? (
                <img src={collapseIcon} alt="collapse icon" />
              ) : (
                <img
                  style={{ transform: "rotate(0.25turn)" }}
                  src={collapseIcon}
                  alt="open icon"
                />
              )}
            </div>
          ) : null}
        </div>
        {this.state.showReplies && replies ? replies : null}
        {moreComments}
      </div>
    );
  }
}

export default Comment;
