// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// IMPORT ICONS
import dropdownIcon from "../../icons/ic_arrow_drop_down_grey_20px.svg";
import commentIcon from "../../icons/comment_tiny.svg";
import upvoteIcon from "../../icons/ic_keyboard_arrow_up_white_24px.svg";
import upvoteIconClicked from "../../icons/ic_keyboard_arrow_up_green_24px 2.svg";
import downvoteIcon from "../../icons/ic_keyboard_arrow_down_white_24px.svg";
import downvoteIconClicked from "../../icons/ic_keyboard_arrow_down_red_24px.svg";
import starIconEmpty from "../../icons/ic_star_border_white_20px.svg";
import starIconFilled from "../../icons/ic_star_white_20px.svg";
import hideIcon from "../../icons/ic_visibility_off_white_20px.svg";
import unhideIcon from "../../icons/ic_visibility_white_20px.svg";
// import moreIcon from "../../icons/ic_more_vert_white_20px.svg";

// COMPONENT
class PostCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showControls: false,

      // VOTING
      upvoted: this.props.likes === true ? true : false,
      downvoted: this.props.likes === false ? true : false,

      // FAVORITING
      favorited: this.props.saved,

      // HIDING
      hidden: this.props.hidden
    };
  }
  toggleControls = () => {
    this.setState({ showControls: !this.state.showControls });
  };
  upvote = () => {
    if (this.props.enableControls) {
      axios
        .post("/api/vote", { vote: 1, id: `t3_${this.props.postID}` })
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
        .post("/api/vote", { vote: -1, id: `t3_${this.props.postID}` })
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
        .post("/api/vote", { vote: 0, id: `t3_${this.props.postID}` })
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
        .post("/api/favorites/save", { id: `t3_${this.props.postID}` })
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
        .post("/api/favorites/unsave", { id: `t3_${this.props.postID}` })
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
    if (this.props.enableControls) {
      axios
        .post("/api/post/hide", { id: `t3_${this.props.postID}` })
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
    if (this.props.enableControls) {
      axios
        .post("/api/post/unhide", { id: `t3_${this.props.postID}` })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ hidden: false });
    } else {
      alert("Please login to use this feature");
    }
  };
  // openMore = () => {};
  render() {
    // console.log(this.props);
    if (this.state.hidden) {
      return null;
    }
    return (
      // POST
      <div className="card-container">
        <div className="post-container">
          {this.props.thumbnail === "self" ? null : this.props.thumbnail ===
          "image" ? (
            <a className="post-link" href={this.props.url}>
              <img className="post-thumbnail" src={this.props.url} alt="" />
            </a>
          ) : (
            <a className="post-link" href={this.props.url}>
              <img
                className="post-thumbnail"
                src={this.props.thumbnail}
                alt=""
              />
            </a>
          )}
          <Link
            className="post-route"
            to={`/r/${this.props.subreddit}/${this.props.postID}`}
          >
            <div className="post-info">
              <div className="post-title">
                {this.props.title}
                <span className="post-domain"> ({this.props.domain})</span>
              </div>
              <div className="post-details">
                <span className="post-subreddit">r/{this.props.subreddit}</span>
                {" • "}
                <span className="post-author">{this.props.author}</span>
              </div>
              <div className="post-data">
                <span
                  className="post-score"
                  style={
                    this.state.upvoted
                      ? { color: "#06D6A0" }
                      : this.state.downvoted ? { color: "#ff445b" } : null
                  }
                >
                  {this.props.score > 10000
                    ? (this.props.score / 1000).toFixed(1) + "k"
                    : this.props.score}{" "}
                  points
                </span>
                {" • "}
                <span className="post-age">{this.props.created}</span>
                {" • "}
                <span className="post-comments">
                  <span className="post-comment-count">
                    {this.props.comments}
                  </span>
                  <img src={commentIcon} alt="comment icon" />
                </span>
              </div>
            </div>
          </Link>
          <div className="post-dropdown" onClick={e => this.toggleControls()}>
            {this.state.showControls ? (
              <img
                src={dropdownIcon}
                alt=""
                style={{ transform: "rotate(-0.5turn)" }}
              />
            ) : (
              <img src={dropdownIcon} alt="" />
            )}
          </div>
        </div>
        {this.state.showControls ? (
          <div className="card-controls">
            <div className="card-left-controls">
              {this.state.upvoted ? (
                <img
                  className="card-control-icon"
                  src={upvoteIconClicked}
                  alt="upvoted"
                  onClick={this.cancelvote}
                />
              ) : (
                <img
                  className="card-control-icon"
                  src={upvoteIcon}
                  alt="upvote"
                  onClick={this.upvote}
                />
              )}
              {this.state.downvoted ? (
                <img
                  className="card-control-icon"
                  src={downvoteIconClicked}
                  alt="downvoted"
                  onClick={this.cancelvote}
                />
              ) : (
                <img
                  className="card-control-icon"
                  src={downvoteIcon}
                  alt="downvote"
                  onClick={this.downvote}
                />
              )}
              {this.state.favorited ? (
                <img
                  className="card-control-icon"
                  src={starIconFilled}
                  alt="favorited"
                  onClick={this.unfavorite}
                />
              ) : (
                <img
                  className="card-control-icon"
                  src={starIconEmpty}
                  alt="favorite"
                  onClick={this.favorite}
                />
              )}
              {this.state.hidden ? (
                <img
                  className="card-control-icon"
                  src={unhideIcon}
                  alt="unhide"
                  onClick={this.unhide}
                />
              ) : (
                <img
                  className="card-control-icon"
                  src={hideIcon}
                  alt="hide"
                  onClick={this.hide}
                />
              )}
              <span className="card-control-icon">{" /r/"}</span>
            </div>
            {/* <div className="card-right-controls">
              <img className="card-control-icon" src={moreIcon} alt="" />
            </div> */}
          </div>
        ) : null}
      </div>
    );
  }
}

export default PostCard;
