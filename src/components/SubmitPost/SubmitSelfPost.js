// IMPORT DEPENDENCIES
import React, { Component } from "react";
import axios from "axios";
//IMPORT COMPONENTS
import SubmitNavigation from "../Navigation/SubmitNavigation";

// COMPONENT
class SubmitSelfPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      selfText: "",
      subredditName: this.props.match.params.subreddit_name || ""
    };
  }

  handleChange = (props, value) => {
    this.setState({
      [props]: value
    });
  };

  backAction = () => {
    this.props.history.goBack();
  };

  sendAction = () => {
    axios
      .post("/api/post/submit", {
        kind: "self",
        title: this.state.title,
        text: this.state.selfText,
        sr: this.state.subredditName
      })
      .then(response => response.data)
      .catch(console.log);
  };

  render() {
    // console.log(this.props.match.params.subreddit_name, this.state);
    return (
      <div>
        <SubmitNavigation
          sendAction={this.sendAction}
          backAction={this.backAction}
        />
        <div className="submit-post-container">
          <input
            placeholder="Post Title"
            type="text"
            onChange={e => this.handleChange("title", e.target.value)}
          />
          <br />
          <input
            placeholder="Text"
            type="text"
            onChange={e => this.handleChange("selfText", e.target.value)}
          />
          <br />
          {this.props.match.params.subreddit_name ? (
            <div>Submiting to /r/{this.props.match.params.subreddit_name}</div>
          ) : (
            <div>
              <input
                placeholder="Subreddit Name"
                type="text"
                onChange={e =>
                  this.handleChange("subredditName", e.target.value)
                }
              />
              <br />
            </div>
          )}
          <input type="checkBox" />
          Send Replies To My Inbox
          <button onClick={this.sendAction}> TEST</button>
        </div>
      </div>
    );
  }
}

// EXPORT COMPONENT
export default SubmitSelfPost;
