// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// import axios from "axios";
// IMPORT ICONS
import profileIcon from "../../icons/ic_person_white_20px.svg";
import messageIcon from "../../icons/ic_email_white_20px.svg";
import settingsIcon from "../../icons/ic_settings_white_20px.svg";
import dropdownIcon from "../../icons/ic_arrow_drop_down_grey_20px.svg";
// IMPORT REDUX FUNCTIONS
import { getUserInfo } from "../../ducks/userReducer";

// COMPENENT
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfileSubnav: false,
      showMessagesSubnav: false
    };
  }
  toggleProfileSubnav = () => {
    this.setState({
      showProfileSubnav: !this.state.showProfileSubnav
    });
  };
  toggleMessagesSubnav = () => {
    this.setState({
      showMessagesSubnav: !this.state.showMessagesSubnav
    });
  };
  loginHandler = () => {
    window.location.href = `${process.env.REACT_APP_HOST}/auth/reddit`;
  };
  componentDidMount() {
    this.props.getUserInfo();
  }
  render() {
    return (
      <div className="menu-container">
        <div className="menu-logo-container">
          <span className="menu-logo">
            N<span className="logo-up">V</span>
            <span className="logo-down">V</span>IT
          </span>
          <div className="menu-pin" onClick={this.props.onDock}>
            {this.props.docked ? "-" : "+"}
          </div>
        </div>
        <div className="menu-account-container">
          <span>
            {this.props.user.user ? this.props.user.user.name : "Guest"}
          </span>
          {this.props.user.user ? (
            <button className="menu-remove-account">LOGOUT</button>
          ) : (
            <button
              className="menu-add-account"
              onClick={() => this.loginHandler()}
            >
              LOGIN
            </button>
          )}
        </div>
        <div className="menu-submenu-list">
          <div className="menu-submenu-item">
            <div className="menu-submenu-top">
              <span className="menu-submenu-title">
                <img className="menu-submenu-icon" src={profileIcon} alt="" />Profile
              </span>
              {this.state.showProfileSubnav ? (
                <img
                  onClick={e => this.toggleProfileSubnav()}
                  src={dropdownIcon}
                  alt="dropdown"
                  style={{ transform: "rotate(0.5turn)" }}
                />
              ) : (
                <img
                  onClick={e => this.toggleProfileSubnav()}
                  src={dropdownIcon}
                  alt="dropdown"
                />
              )}
            </div>
            {this.state.showProfileSubnav ? (
              <div className="menu-submenu-bottom">
                <div className="menu-submenu-bottom-item">Comments</div>
                <div className="menu-submenu-bottom-item">Submitted</div>
                <div className="menu-submenu-bottom-item">Upvoted</div>
                <div className="menu-submenu-bottom-item">Saved</div>
                <div className="menu-submenu-bottom-item">Friends</div>
                <div className="menu-submenu-bottom-item">Watching</div>
              </div>
            ) : null}
          </div>
          <div className="menu-submenu-item">
            <div className="menu-submenu-top">
              <span className="menu-submenu-title">
                <img className="menu-submenu-icon" src={messageIcon} alt="" />Messaging
              </span>
              {this.state.showMessagesSubnav ? (
                <img
                  onClick={e => this.toggleMessagesSubnav()}
                  src={dropdownIcon}
                  alt="dropdown"
                  style={{ transform: "rotate(0.5turn)" }}
                />
              ) : (
                <img
                  onClick={e => this.toggleMessagesSubnav()}
                  src={dropdownIcon}
                  alt="dropdown"
                />
              )}
            </div>
            {this.state.showMessagesSubnav ? (
              <div className="menu-submenu-bottom">
                <div className="menu-submenu-bottom-item">Inbox</div>
                <div className="menu-submenu-bottom-item">Unread</div>
                <div className="menu-submenu-bottom-item">Messages</div>
                <div className="menu-submenu-bottom-item">Sent</div>
                <div className="menu-submenu-bottom-item">Comment replies</div>
                <div className="menu-submenu-bottom-item">Post replies</div>
                <div className="menu-submenu-bottom-item">Mentions</div>
              </div>
            ) : null}
          </div>
          <div className="menu-submenu-item">
            <div className="menu-submenu-top">
              <span className="menu-submenu-title">
                <img className="menu-submenu-icon" src={settingsIcon} alt="" />Settings
              </span>
            </div>
          </div>
        </div>
        <div className="menu-subreddit-container">
          <input
            className="menu-subreddit-search"
            type="text"
            placeholder="View subreddit"
          />
          <div className="menu-subreddit-list">
            <div className="menu-subreddit-title">Subreddit 1</div>
            <div className="menu-subreddit-title">Subreddit 2</div>
          </div>
        </div>
      </div>
    );
  }
}

// CONNECT TO REDUX
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, { getUserInfo })(Menu);
