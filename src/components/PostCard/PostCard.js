// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { Link } from "react-router-dom";
// IMPORT COMPONENTS

// IMPORT ICONS
import dropdownIcon from "../../icons/ic_arrow_drop_down_grey_20px.svg";
import commentIcon from "../../icons/comment_tiny.svg";
import upvoteIcon from "../../icons/ic_keyboard_arrow_up_white_24px.svg";
// import upvoteIconClicked from "../../icons/ic_keyboard_arrow_up_green_24px 2.svg";
import downvoteIcon from "../../icons/ic_keyboard_arrow_down_white_24px.svg";
// import downvoteIconClicked from "../../icons/ic_keyboard_arrow_down_red_24px.svg";
import starIconEmpty from "../../icons/ic_star_border_white_20px.svg";
// import starIconFilled from "../../icons/ic_star_white_20px.svg";
import moreIcon from "../../icons/ic_more_vert_white_20px.svg";
import clearIcon from "../../icons/ic_clear_white_20px.svg";

class PostCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showControls: false
    };
  }
  toggleControls = () => {
    this.setState({ showControls: !this.state.showControls });
  };
  upvote = () => {};
  downvote = () => {};
  cancelvote = () => {};
  favorite = () => {};
  unfavorite = () => {};
  hide = () => {};
  openMore = () => {};
  render() {
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
                <span className="post-score">
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
              <img className="card-control-icon" src={upvoteIcon} alt="" />
              <img className="card-control-icon" src={downvoteIcon} alt="" />
              <img className="card-control-icon" src={starIconEmpty} alt="" />
              <img className="card-control-icon" src={clearIcon} alt="" />
              <span className="card-control-icon">{" /r/"}</span>
            </div>
            <div className="card-right-controls">
              <img className="card-control-icon" src={moreIcon} alt="" />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PostCard;
