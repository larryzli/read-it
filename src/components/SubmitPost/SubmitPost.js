// IMPORT DEPENDENCIES
import React, { Component } from "react";
import axios from "axios";
// IMPORT COMPONENTS
import SubmitNavigation from "../Navigation/SubmitNavigation";
// IMPORT ICONS
import checkIcon from "../../icons/ic_check_white_20px.svg";

// COMPONENT
class SubmitPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // POST DATA
      title: "",
      url: "",
      selfText: "",
      subredditName: this.props.match.params.subreddit_name || "",
      type: this.props.match.params.type,

      // POST OPTIONS
      sendReplies: false,
      markNSFW: false
    };
  }

  // INPUT CHANGES
  handleChange = (prop, value) => {
    this.setState({
      [prop]: value
    });
  };

  // NAVIGATION BACK
  backAction = () => {
    this.props.history.goBack();
  };

  // CHECKBOX CHANGES
  toggleCheckbox = prop => {
    this.setState({
      [prop]: !this.state[prop]
    });
  };

  // SUBMIT POST API CALL
  sendAction = () => {
    if (this.state.type === "link") {
      if (this.state.title && this.state.url && this.state.subredditName) {
        axios
          .post("/api/post/submit", {
            kind: this.state.type,
            title: this.state.title,
            url: this.state.url,
            sr: this.state.subredditName,
            nsfw: this.state.markNSFW,
            sendreplies: this.state.sendReplies
          })
          .then(response => {
            this.props.history.push(`/r/${this.state.subredditName}`);
          })
          .catch(() => alert("Submit post failed"));
      } else {
        alert("Please fill out all post information");
      }
    } else if (this.state.type === "self") {
      if (this.state.title && this.state.selfText && this.state.subredditName) {
        axios
          .post("/api/post/submit", {
            kind: this.state.type,
            title: this.state.title,
            text: this.state.selfText,
            sr: this.state.subredditName,
            nsfw: this.state.markNSFW,
            sendreplies: this.state.sendReplies
          })
          .then(response => {
            this.props.history.push(`/r/${this.state.subredditName}`);
          })
          .catch(() => alert("Submit post failed"));
      } else {
        alert("Please fill out all post information");
      }
    } else {
      alert("Invalid post type");
    }
  };

  // RENDER COMPONENT
  render() {
    console.log(this.state.subredditName, this.state);
    return (
      <div>
        <SubmitNavigation
          sendAction={this.sendAction}
          backAction={this.backAction}
          title={
            this.state.type === "link"
              ? "Submit Link Post"
              : this.state.type === "self" ? "Submit Self Post" : null
          }
        />
        <div className="submit-post-container">
          <input
            placeholder="Post Title"
            type="text"
            onChange={e => this.handleChange("title", e.target.value)}
            className="submit-post-input"
          />
          {this.state.type === "link" ? (
            <input
              placeholder="URL"
              type="text"
              onChange={e => this.handleChange("url", e.target.value)}
              className="submit-post-input"
            />
          ) : null}
          {this.state.type === "self" ? (
            <textarea
              placeholder="Post Text"
              type="text"
              onChange={e => this.handleChange("selfText", e.target.value)}
              className="submit-post-input submit-post-text-area"
            />
          ) : null}
          {this.props.match.params.subreddit_name ? (
            <div className="submit-post-subreddit">
              Submiting to /r/{this.state.subredditName}
            </div>
          ) : (
            <input
              placeholder="Subreddit Name"
              type="text"
              onChange={e => this.handleChange("subredditName", e.target.value)}
              className="submit-post-input"
            />
          )}
          <div className="submit-post-checkbox-list">
            <div className="submit-post-checkbox-container">
              {this.state.sendReplies ? (
                <div
                  className="submit-post-checkbox"
                  onClick={() => this.toggleCheckbox("sendReplies")}
                >
                  <img src={checkIcon} alt="checked send replies" />
                </div>
              ) : (
                <div
                  className="submit-post-checkbox"
                  onClick={() => this.toggleCheckbox("sendReplies")}
                />
              )}
              <span className="submit-post-label">
                Send replies to my inbox
              </span>
            </div>
            <div className="submit-post-checkbox-container">
              {this.state.markNSFW ? (
                <div
                  className="submit-post-checkbox"
                  onClick={() => this.toggleCheckbox("markNSFW")}
                >
                  <img src={checkIcon} alt="checked NSFW" />
                </div>
              ) : (
                <div
                  className="submit-post-checkbox"
                  onClick={() => this.toggleCheckbox("markNSFW")}
                />
              )}
              <span className="submit-post-label">Mark as NSFW</span>
            </div>
          </div>
          <button className="submit-post-submit" onClick={this.sendAction}>
            SUBMIT POST
          </button>
        </div>
      </div>
    );
  }
}

// EXPORT COMPONENT
export default SubmitPost;
