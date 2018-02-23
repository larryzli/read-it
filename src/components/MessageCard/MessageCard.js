// IMPORT DEPENDENCIES
import React, { Component } from "react";
// IMPORT ICONS
import dropdownIcon from "../../icons/ic_arrow_drop_down_grey_20px.svg";
import readIcon from "../../icons/ic_drafts_white_20px.svg";
import unreadIcon from "../../icons/ic_markunread_white_20px.svg";
import profileIcon from "../../icons/ic_person_white_20px.svg";
import deleteIcon from "../../icons/ic_clear_white_20px.svg";

// COMPONENT
class MessageCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showControls: false
    };

    this.toggleControls = this.toggleControls.bind(this);
  }
  // TOGGLE CONTROLS
  toggleControls() {
    this.setState({ showControls: !this.state.showControls });
  }
  render() {
    return (
      <div className="card-container">
        <div className="post-container">
          <div className="message-card-info">
            <div className="message-subject">{this.props.subject}</div>
            {this.props.linkTitle ? (
              <div className="message-link-title">{this.props.linkTitle}</div>
            ) : null}
            <div className="message-author">From: {this.props.author}</div>
            <div className="message-dest">To: {this.props.dest}</div>
            {this.props.subreddit ? (
              <div className="message-subreddit">{this.props.subreddit}</div>
            ) : null}
            <div className="message-body">{this.props.body}</div>
            <div className="message-age">{this.props.age}</div>
          </div>
          <div
            className="message-dropdown"
            onClick={e => this.toggleControls()}
          >
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
          {/* <img className="post-store-container" src={moreIcon} alt="more icon" /> */}
        </div>
        {this.state.showControls ? (
          <div className="card-controls">
            <div className="card-left-controls">
              {this.props.new ? (
                <img
                  className="card-control-icon"
                  src={readIcon}
                  alt="mark read"
                  onClick={e => this.props.read(this.props.name)}
                />
              ) : (
                <img
                  className="card-control-icon"
                  src={unreadIcon}
                  alt="mark unread"
                  onClick={e => this.props.unread(this.props.name)}
                />
              )}
              <img
                className="card-control-icon"
                src={profileIcon}
                alt="author profile"
                onClick={e => this.props.visitAuthor(this.props.author)}
              />
            </div>
            {this.props.comment ? null : (
              <div className="card-right-controls">
                <img
                  className="card-control-icon"
                  src={deleteIcon}
                  alt="delete message"
                  onClick={e => this.props.delete(this.props.name)}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default MessageCard;
