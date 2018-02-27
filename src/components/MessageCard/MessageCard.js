// IMPORT DEPENDENCIES
import React, { Component } from "react";
// IMPORT ICONS
import dropdownIcon from "../../icons/ic_arrow_drop_down_grey_20px.svg";
import unreadIcon from "../../icons/ic_drafts_white_20px.svg";
import readIcon from "../../icons/ic_markunread_white_20px.svg";
import profileIcon from "../../icons/ic_person_white_20px.svg";
import deleteIcon from "../../icons/ic_clear_white_20px.svg";
import replyIcon from "../../icons/ic_reply_white_20px.svg";
import findIcon from "../../icons/ic_find_in_page_white_20px.svg";

// COMPONENT
class MessageCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showControls: false,
      messageType:
        this.props.subject === "post reply"
          ? "Post reply"
          : this.props.subject === "comment reply"
            ? "Comment reply"
            : this.props.subject === "username mention" ? "Mention" : "Message"
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
          <div
            className="message-card-info"
            onClick={e => this.toggleControls()}
          >
            <div className="message-title">
              <span className="message-type">{this.state.messageType}</span>
              {this.props.filter === "inbox" ||
              this.props.filter === "unread" ? (
                <span className="message-author">
                  {"from "}
                  <span className="message-author-name">
                    {this.props.author}
                  </span>
                </span>
              ) : null}
              {this.props.filter === "sent" ? (
                <span className="message-author">
                  {"to "}
                  <span className="message-author-name">{this.props.dest}</span>
                </span>
              ) : null}
              <span className="message-age">{this.props.age}</span>
            </div>
            {this.props.linkTitle ? (
              <div className="message-post">
                <div>{"Post: "}</div>
                <div className="message-post-title">
                  <div className="message-post-title-text">
                    {this.props.linkTitle}
                  </div>
                  <div className="message-subreddit">
                    {"in "}
                    <div className="message-subreddit-name">
                      {this.props.subreddit}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {this.state.messageType === "Message" ? (
              <div className="message-subject">
                <div>{"Subj: "}</div>
                <div className="message-subject-title">
                  {this.props.subject}
                </div>
              </div>
            ) : null}
            <div className="message-body">
              <div>{"Body: "}</div>
              <div className="message-body-text">{this.props.body}</div>
            </div>
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
                  style={{ marginRight: "7px" }}
                />
              ) : (
                <img
                  className="card-control-icon"
                  src={unreadIcon}
                  alt="mark unread"
                  onClick={e => this.props.unread(this.props.name)}
                  style={{ marginRight: "7px" }}
                />
              )}
              <img
                className="card-control-icon"
                src={profileIcon}
                alt="author profile"
                onClick={e => this.props.visitAuthor(this.props.author)}
              />
              {this.state.messageType === "Message" ? (
                <img
                  className="card-control-icon"
                  src={replyIcon}
                  alt="reply to message"
                  onClick={e => console.log("reply function")}
                />
              ) : (
                <img
                  className="card-control-icon"
                  src={findIcon}
                  alt="show post"
                  onClick={e => console.log("show function")}
                />
              )}
            </div>
            {this.state.messageType === "Message" ? (
              <div className="card-right-controls">
                <img
                  className="card-control-icon"
                  src={deleteIcon}
                  alt="delete message"
                  onClick={e => this.props.delete(this.props.name)}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default MessageCard;
