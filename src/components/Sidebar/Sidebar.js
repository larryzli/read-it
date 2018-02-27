// IMPORT DEPENDENCIES
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// IMPORT REDUX FUNCTIONS
import {
  getSidebarSubreddit,
  getSidebarTrending
} from "./../../ducks/subredditReducer";

// COMPONENT
class Sidebar extends Component {
  constructor(props) {
    super(props);
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
    axios
      .post("/api/subscribe", {
        sr_name: this.props.subreddit.subreddit.display_name,
        action: "sub"
      })
      .then(response => console.log(response))
      .catch(console.log);
  }

  handleUnsubscribe() {
    axios
      .post("/api/subscribe", {
        sr_name: this.props.subreddit.subreddit.display_name,
        action: "unsub"
      })
      .then(response => console.log(response))
      .catch(console.log);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.subreddit_name &&
        this.props.subreddit_name.toLowerCase() !== "all" ? (
          <div>
            <div>
              {this.props.user.user.id ? (
                this.props.subreddit.subreddit.user_is_subscriber ? (
                  <button>Unsubscribe</button>
                ) : (
                  <button>Subscribe</button>
                )
              ) : null}
            </div>
            <div>
              <h2>{this.props.subreddit.subreddit.title}</h2>
              <h3>Subscribers:</h3>
              <p>{this.props.subreddit.subreddit.subscribers}</p>
              <h3>Active Users:</h3>
              <p>{this.props.subreddit.subreddit.active_user_count}</p>
              {this.props.subreddit.subreddit.public_description ? (
                <div>
                  <h3>Description:</h3>

                  <p>{this.props.subreddit.subreddit.public_description}</p>
                </div>
              ) : null}
              <h3>Rules:</h3>
              <p>{this.props.subreddit.subreddit.description}</p>
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
