// IMPORT DEPENDENCIES
import React, { Component } from "react";
import axios from "axios";
// IMPORT COMPONENTS
import SubmitNavigation from "../Navigation/SubmitNavigation";
// IMPORT ICONS
import checkIcon from "../../icons/ic_check_white_20px.svg";

// COMPONENT
class SubmitLinkPost extends Component {
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
      axios
        .post("/api/post/submit", {
          kind: this.state.type,
          title: this.state.title,
          url: this.state.url,
          sr: this.state.subredditName
        })
        .then(response => response.data)
        .catch(console.log);
    } else if (this.state.type === "self") {
      axios
        .post("/api/post/submit", {
          kind: this.state.type,
          title: this.state.title,
          text: this.state.selfText,
          sr: this.state.subredditName
        })
        .then(response => response.data)
        .catch(console.log);
    } else {
      alert("invalid post");
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
            this.state.type === "link" ? "Submit Link Post" : "Submit Self Post"
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
            <input
              placeholder="Post Text"
              type="text"
              onChange={e => this.handleChange("selfText", e.target.value)}
              className="submit-post-input"
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
export default SubmitLinkPost;
