// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
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
import lockIcon from "../../icons/ic_lock_outline_white_10px.svg";
import defaultThumb from "../../icons/default-thumbnail.svg";
import warningThumb from "../../icons/warning-thumbnail.svg";
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
      score: this.props.score,

      // FAVORITING
      favorited: this.props.saved,

      // HIDING
      hidden: this.props.hidden
    };

    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.cancelvote = this.cancelvote.bind(this);
    this.favorite = this.favorite.bind(this);
    this.unfavorite = this.unfavorite.bind(this);
    this.hide = this.hide.bind(this);
    this.unhide = this.unhide.bind(this);
  }
  toggleControls() {
    this.setState({ showControls: !this.state.showControls });
  }
  upvote() {
    if (this.props.enableControls) {
      axios
        .post("/api/vote", {
          vote: 1,
          id: `${this.props.type}_${this.props.postID}`
        })
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
  }
  downvote() {
    if (this.props.enableControls) {
      axios
        .post("/api/vote", {
          vote: -1,
          id: `${this.props.type}_${this.props.postID}`
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
  }
  cancelvote() {
    if (this.props.enableControls) {
      axios
        .post("/api/vote", {
          vote: 0,
          id: `${this.props.type}_${this.props.postID}`
        })
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
  }
  favorite() {
    if (this.props.enableControls) {
      axios
        .post("/api/favorites/save", {
          id: `${this.props.type}_${this.props.postID}`
        })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ favorited: true });
    } else {
      alert("Please login to use this feature");
    }
  }
  unfavorite() {
    if (this.props.enableControls) {
      axios
        .post("/api/favorites/unsave", {
          id: `${this.props.type}_${this.props.postID}`
        })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ favorited: false });
    } else {
      alert("Please login to use this feature");
    }
  }
  hide() {
    if (this.props.enableControls) {
      axios
        .post("/api/post/hide", {
          id: `${this.props.type}_${this.props.postID}`
        })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ hidden: true });
    } else {
      alert("Please login to use this feature");
    }
  }
  unhide() {
    if (this.props.enableControls) {
      axios
        .post("/api/post/unhide", {
          id: `${this.props.type}_${this.props.postID}`
        })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ hidden: false });
    } else {
      alert("Please login to use this feature");
    }
  }
  render() {
    if (this.state.hidden) {
      return null;
    }
    return (
      // POST
      <div className="card-container">
        <div className="post-container">
          {!this.props.thumbnail ? null : this.props.thumbnail ===
          "self" ? null : this.props.thumbnail === "image" ? (
            <a className="post-link" href={this.props.url}>
              <img
                className="post-thumbnail"
                src={this.props.url}
                alt="post thumbnail"
                onError={e => {
                  e.target.onError = null;
                  e.target.src = defaultThumb;
                }}
              />
            </a>
          ) : this.props.thumbnail === "default" ? (
            <a className="post-link" href={this.props.url}>
              <img
                className="post-thumbnail"
                src={defaultThumb}
                alt="post thumbnail"
              />
            </a>
          ) : this.props.thumbnail === "nsfw" ||
          this.props.thumbnail === "spoiler" ? (
            <a className="post-link" href={this.props.url}>
              <img
                className="post-thumbnail"
                src={warningThumb}
                alt="post thumbnail"
              />
            </a>
          ) : (
            <a className="post-link" href={this.props.url}>
              <img
                className="post-thumbnail"
                src={this.props.thumbnail}
                alt="post thumbnail"
                onError={e => {
                  e.target.onError = null;
                  e.target.src = defaultThumb;
                }}
              />
            </a>
          )}
          <Link
            className="post-route"
            to={`/r/${this.props.subreddit}/post/${
              this.props.type === "t1"
                ? this.props.link_id.split("_")[1]
                : this.props.postID
            }`}
          >
            <div className="post-info">
              <div className="post-title">
                {this.props.title}
                <span className="post-domain"> ({this.props.domain})</span>
              </div>
              <div className="post-details">
                <span className="post-tags">
                  {this.props.over18 ? (
                    <span className="post-tag">
                      <span className="red-tag">NSFW</span>
                      {" • "}
                    </span>
                  ) : null}
                  {this.props.spoiler ? (
                    <span className="post-tag">
                      <span className="red-tag">SPOILER</span>
                      {" • "}
                    </span>
                  ) : null}
                  {this.props.locked ? (
                    <span className="post-tag">
                      <img
                        className="tag-icon"
                        src={lockIcon}
                        alt="locked post"
                      />
                      {" • "}
                    </span>
                  ) : null}
                  {this.props.stickied ? (
                    <span className="post-tag">STICKIED{" • "}</span>
                  ) : null}
                  {this.props.pinned ? (
                    <span className="post-tag">PINNED{" • "}</span>
                  ) : null}
                </span>
                <span className="post-subreddit">{this.props.subreddit}</span>
                {" • "}
                <span className="post-author">{this.props.author}</span>
              </div>
              {this.props.type === "t1" ? (
                <div className="post-comment-body">
                  <ReactMarkdown source={this.props.commentBody} />
                </div>
              ) : null}
              <div className="post-data">
                <span
                  className="post-score"
                  style={
                    this.state.upvoted
                      ? { color: "#06D6A0" }
                      : this.state.downvoted ? { color: "#ff445b" } : null
                  }
                >
                  {this.state.score > 10000
                    ? (this.state.score / 1000).toFixed(1) + "k"
                    : this.state.score}{" "}
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
              {this.props.showSubredditControl ? (
                <Link
                  to={`/r/${this.props.subreddit}`}
                  className="card-control-icon"
                >
                  {" /r/"}
                </Link>
              ) : null}
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
