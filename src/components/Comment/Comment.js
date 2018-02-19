// IMPORT DEPENDENCIES
import React, { Component } from "react";
import axios from "axios";
// IMPORT ICONS
import collapseIcon from "../../icons/ic_arrow_drop_down_grey_20px.svg";
import dropdownIcon from "../../icons/ic_arrow_drop_down_grey_20px.svg";
import commentIcon from "../../icons/comment_tiny.svg";
import upvoteIcon from "../../icons/ic_keyboard_arrow_up_white_24px.svg";
// import upvoteIconClicked from "../../icons/ic_keyboard_arrow_up_green_24px 2.svg";
import downvoteIcon from "../../icons/ic_keyboard_arrow_down_white_24px.svg";
// import downvoteIconClicked from "../../icons/ic_keyboard_arrow_down_red_24px.svg";
import starIconEmpty from "../../icons/ic_star_border_white_20px.svg";
// import starIconFilled from "../../icons/ic_star_white_20px.svg";
import moreIcon from "../../icons/ic_more_vert_white_20px.svg";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReplies: true,
      moreComments: [],
      showMore: true,
      showControls: false
    };
  }

  revealReplies = () => {
    this.setState({ showReplies: !this.state.showReplies });
  };
  toggleControls = () => {
    this.setState({ showControls: !this.state.showControls });
  };
  viewMore = (postID, children) => {
    children = children.join(",");
    axios
      .get(`/api/post/comments/more/${postID}/${children}`)
      .then(response => {
        this.setState({
          moreComments: response.data.json.data.things,
          showMore: false
        });
      });
  };

  render() {
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
                // <img src={collapseIcon} alt="collapse icon" />
                <span>–</span>
              ) : (
                // <img
                //   style={{ transform: "rotate(0.25turn)" }}
                //   src={collapseIcon}
                //   alt="open icon"
                // />
                <span>+</span>
              )}
            </div>
          ) : null}
        </div>
        {this.state.showControls ? (
          <div className="comment-controls">
            <div className="comment-left-controls">
              <img className="comment-control-icon" src={upvoteIcon} alt="" />
              <img className="comment-control-icon" src={downvoteIcon} alt="" />
              <img
                className="comment-control-icon"
                src={starIconEmpty}
                alt=""
              />
            </div>
            <div className="comment-right-controls">
              <img className="comment-control-icon" src={moreIcon} alt="" />
            </div>
          </div>
        ) : null}
        {this.state.showReplies && replies ? replies : null}
        {moreComments}
      </div>
    );
  }
}

export default Comment;
