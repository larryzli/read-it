// IMPORT DEPENDENCIES
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
// IMPORT REDUX FUNCTIONS
import {
  getSidebarSubreddit,
  getSidebarTrending
} from "./../../ducks/subredditReducer";

// COMPONENT
class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subscribed: this.props.subreddit.subreddit.user_is_subscriber
    };
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleUnsubscribe = this.handleUnsubscribe.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }
  // title
  // active_user_count
  // user_is_subscriber
  componentDidMount() {
    this.getInfo(this.props.subreddit_name);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.subreddit_name !== nextProps.subreddit_name) {
      this.getInfo(nextProps.subreddit_name);
    }
  }

  getInfo(subreddit_name) {
    if (subreddit_name && subreddit_name.toLowerCase() !== "all") {
      this.props.getSidebarSubreddit(subreddit_name);
    } else {
      this.props.getSidebarTrending();
    }
  }

  handleSubscribe() {
    this.setState({ subscribed: !this.state.subscribed });
    axios
      .post("/api/subscribe", {
        sr_name: this.props.subreddit.subreddit.display_name,
        action: "sub"
      })
      .then(response => console.log(response))
      .catch(console.log);
  }

  handleUnsubscribe() {
    this.setState({ subscribed: !this.state.subscribed });
    axios
      .post("/api/subscribe", {
        sr_name: this.props.subreddit.subreddit.display_name,
        action: "unsub"
      })
      .then(response => console.log(response))
      .catch(console.log);
  }

  numberWithCommas = (num = 0) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    console.log(this.props);
    return (
      <div className="sidebar-wrapper">
        {this.props.subreddit_name &&
        this.props.subreddit_name.toLowerCase() !== "all" ? (
          <div className="sidebar-container">
            {this.props.subreddit.subreddit.banner_img ? (
              <img
                src={this.props.subreddit.subreddit.banner_img}
                alt="subreddit banner"
                className="sidebar-banner"
              />
            ) : null}
            <div className="sidebar-box">
              {this.props.subreddit.subreddit.icon_img ? (
                <img
                  src={this.props.subreddit.subreddit.icon_img}
                  alt="subreddit-icon"
                  className="sidebar-icon"
                />
              ) : null}
              <div className="sidebar-data">
                <div className="sidebar-name">
                  /r/{this.props.subreddit_name}
                </div>

                <div className="sidebar-stat">
                  {this.numberWithCommas(
                    this.props.subreddit.subreddit.subscribers
                  )}{" "}
                  subscribers
                </div>
                <div className="sidebar-stat">
                  {this.numberWithCommas(
                    this.props.subreddit.subreddit.active_user_count
                  )}{" "}
                  online
                </div>
              </div>
            </div>
            {this.props.user.user.id ? (
              <div className="sidebar-box">
                {this.state.subscribed ? (
                  <button
                    className="sidebar-button unsubscribe"
                    onClick={e => this.handleUnsubscribe()}
                  >
                    – UNSUBSCRIBE
                  </button>
                ) : (
                  <button
                    className="sidebar-button subscribe"
                    onClick={e => this.handleSubscribe()}
                  >
                    + SUBSCRIBE
                  </button>
                )}
              </div>
            ) : null}

            <div className="sidebar-box">
              <h2 className="sidebar-title">
                {this.props.subreddit.subreddit.title}
              </h2>
            </div>
            {this.props.subreddit.subreddit.public_description ? (
              <div className="sidebar-box content">
                <h3 className="sidebar-subtitle">DESCRIPTION:</h3>
                <div className="sidebar-body">
                  <ReactMarkdown
                    source={
                      this.props.subreddit.subreddit.public_description
                        ? this.props.subreddit.subreddit.public_description
                        : // .split("https://www.reddit.com")
                          // .join("")
                          // .split("http://www.reddit.com")
                          // .join("")
                          null
                    }
                  />
                </div>
              </div>
            ) : null}
            <div className="sidebar-box content">
              <h3 className="sidebar-subtitle">RULES:</h3>
              <div className="sidebar-body">
                <ReactMarkdown
                  source={
                    this.props.subreddit.subreddit.description
                      ? this.props.subreddit.subreddit.description
                      : // .split("https://www.reddit.com")
                        // .join("")
                        // .split("http://www.reddit.com")
                        // .join("")
                        null
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            {this.props.subreddit.trending.map((subreddit, i) => {
              return (
                <div key={i} onClick={e => this.props.closeSidebar()}>
                  <Link to={`/r/${subreddit}`}>
                    <h3>{subreddit}</h3>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  getSidebarSubreddit,
  getSidebarTrending
})(Sidebar);
