// IMPORT DEPENDENCIES
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
// IMPORT COMPONENTS
import SubmitNavigation from "../Navigation/SubmitNavigation";
// IMPORT REDUX FUNCTIONS
import { getUserInfo } from "../../ducks/userReducer";

// COMPONENT
class SendMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // MESSAGE DATA
      subject: this.props.match.params.title || "",
      message: "",
      username: this.props.match.params.username || ""
    };
  }

  componentDidMount() {
    this.props.getUserInfo();
  }

  sendAction = () => {
    if (this.props.user.user.id) {
      if (this.state.username && this.state.subject && this.state.message) {
        axios
          .post("/api/message/send", {
            name: this.state.username,
            subject: this.state.subject,
            text: this.state.message
          })
          .then(response => {
            this.props.history.push(`/`);
          })
          .catch(() => alert("Message failed to send"));
      } else {
        alert("Please fill out all message information");
      }
    } else {
      alert("Please log in to send a message");
    }
  };

  handleChange = (prop, value) => {
    this.setState({
      [prop]: value
    });
  };

  // NAVIGATION BACK
  backAction = () => {
    this.props.history.goBack();
  };

  render() {
    console.log(this.props.user);
    return (
      <div>
        <SubmitNavigation
          sendAction={this.sendAction}
          backAction={this.backAction}
          title={"Send Message"}
        />
        <div className="submit-post-container">
          {this.props.match.params.username ? (
            <div className="submit-post-subreddit">
              Sending to /u/{this.state.username}
            </div>
          ) : (
            <input
              placeholder="Username"
              type="text"
              onChange={e => this.handleChange("username", e.target.value)}
              className="submit-post-input"
            />
          )}
          {this.props.match.params.title ? (
            <div className="submit-post-subreddit">
              Subject: {this.state.subject}
            </div>
          ) : (
            <input
              placeholder="Subject"
              type="text"
              onChange={e => this.handleChange("subject", e.target.value)}
              className="submit-post-input"
            />
          )}
          <textarea
            placeholder="Message"
            type="text"
            style={{ marginTop: "10px" }}
            onChange={e => this.handleChange("message", e.target.value)}
            className="submit-post-input submit-post-text-area"
          />

          <button className="submit-post-submit" onClick={this.sendAction}>
            SEND MESSAGE
          </button>
        </div>
      </div>
    );
  }
}

// CONECT TO REDUX
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, { getUserInfo })(SendMessage);
