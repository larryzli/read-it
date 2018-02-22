// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
// IMPORT ICONS
import profileIcon from "../../icons/ic_person_white_20px.svg";
import messageIcon from "../../icons/ic_email_white_20px.svg";
import settingsIcon from "../../icons/ic_settings_white_20px.svg";
import dropdownIcon from "../../icons/ic_arrow_drop_down_grey_20px.svg";
import filterIcon from "../../icons/ic_filter_list_white_20px.svg";
// IMPORT REDUX FUNCTIONS
import { getUserInfo, logout } from "../../ducks/userReducer";

// COMPENENT
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfileSubnav: false,
      showMessagesSubnav: false,

      subredditFilter: "",
      subredditList: [],
      guest: true
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
  filterChange = value => {
    this.setState({
      subredditFilter: value
    });
  };
  loginHandler = () => {
    this.setState({ guest: false });
    window.location.href = `${process.env.REACT_APP_HOST}/auth/reddit`;
  };
  logoutHandler = () => {
    this.props.logout().then(() => this.setState({ guest: false }));
  };

  componentDidMount() {
    this.props.getUserInfo().then(response => {
      if (this.props.user.user.id) {
        axios
          .get("/api/subscriptions")
          .then(response => {
            this.setState({ subredditList: response.data });
          })
          .catch(console.log);
      } else {
        axios
          .get("/api/default?limit=100")
          .then(response => {
            this.setState({ subredditList: response.data });
          })
          .catch(console.log);
      }
    });
  }
  render() {
    console.log(this.props);
    const filteredSubreddits = this.state.subredditList.filter(subreddit => {
      return subreddit.display_name
        .toLowerCase()
        .includes(this.state.subredditFilter.toLowerCase());
    });
    const subredditList = filteredSubreddits.map((subreddit, index) => {
      return (
        <NavLink
          key={subreddit.id}
          to={subreddit.url}
          className="menu-subreddit-link"
          onClick={this.props.closeMenu}
        >
          <div className="menu-subreddit-title">{subreddit.display_name}</div>
        </NavLink>
      );
    });
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
            {this.props.user.user.id ? this.props.user.user.name : "Guest"}
          </span>
          {this.props.user.user.id ? (
            <button
              className="menu-remove-account"
              onClick={() => this.logoutHandler()}
            >
              LOGOUT
            </button>
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
                <NavLink
                  to="/inbox"
                  className="menu-submenu-bottom-link"
                  onClick={this.props.closeMenu}
                >
                  <div className="menu-submenu-bottom-item">Comments</div>
                </NavLink>
                <NavLink
                  to="/inbox"
                  className="menu-submenu-bottom-link"
                  onClick={this.props.closeMenu}
                >
                  <div className="menu-submenu-bottom-item">Submitted</div>
                </NavLink>
                <NavLink
                  to="/inbox"
                  className="menu-submenu-bottom-link"
                  onClick={this.props.closeMenu}
                >
                  <div className="menu-submenu-bottom-item">Upvoted</div>
                </NavLink>
                <NavLink
                  to="/inbox"
                  className="menu-submenu-bottom-link"
                  onClick={this.props.closeMenu}
                >
                  <div className="menu-submenu-bottom-item">Saved</div>
                </NavLink>
                <NavLink
                  to="/inbox"
                  className="menu-submenu-bottom-link"
                  onClick={this.props.closeMenu}
                >
                  <div className="menu-submenu-bottom-item">Friends</div>
                </NavLink>
                <NavLink
                  to="/inbox"
                  className="menu-submenu-bottom-link"
                  onClick={this.props.closeMenu}
                >
                  <div className="menu-submenu-bottom-item">Watching</div>
                </NavLink>
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
                <NavLink
                  to="/inbox/inbox"
                  className="menu-submenu-bottom-link"
                  onClick={this.props.closeMenu}
                >
                  <div className="menu-submenu-bottom-item">Inbox</div>
                </NavLink>
                <NavLink
                  to="/inbox/unread"
                  className="menu-submenu-bottom-link"
                  onClick={this.props.closeMenu}
                >
                  <div className="menu-submenu-bottom-item">Unread</div>
                </NavLink>
                <NavLink
                  to="/inbox"
                  className="menu-submenu-bottom-link"
                  onClick={this.props.closeMenu}
                >
                  <div className="menu-submenu-bottom-item">Messages</div>
                </NavLink>
                <NavLink
                  to="/inbox/sent"
                  className="menu-submenu-bottom-link"
                  onClick={this.props.closeMenu}
                >
                  <div className="menu-submenu-bottom-item">Sent</div>
                </NavLink>
                <NavLink
                  to="/inbox"
                  className="menu-submenu-bottom-link"
                  onClick={this.props.closeMenu}
                >
                  <div className="menu-submenu-bottom-item">
                    Comment replies
                  </div>
                </NavLink>
                <NavLink
                  to="/inbox"
                  className="menu-submenu-bottom-link"
                  onClick={this.props.closeMenu}
                >
                  <div className="menu-submenu-bottom-item">Post replies</div>
                </NavLink>
                <NavLink
                  to="/inbox"
                  className="menu-submenu-bottom-link"
                  onClick={this.props.closeMenu}
                >
                  <div className="menu-submenu-bottom-item">Mentions</div>
                </NavLink>
              </div>
            ) : null}
          </div>
          <div className="menu-submenu-item">
            <div className="menu-submenu-top">
              <NavLink
                to="/filter"
                className="menu-submenu-title"
                onClick={this.props.closeMenu}
              >
                <img className="menu-submenu-icon" src={filterIcon} alt="" />
                Domain Filters
              </NavLink>
            </div>
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
            value={this.state.subredditFilter}
            onChange={e => this.filterChange(e.target.value)}
            placeholder="View subreddit"
          />
          <div className="menu-subreddit-list">
            <NavLink
              to="/"
              className="menu-subreddit-link"
              onClick={this.props.closeMenu}
            >
              <div className="menu-subreddit-title">Frontpage</div>
            </NavLink>
            <NavLink
              to="/r/All"
              className="menu-subreddit-link"
              onClick={this.props.closeMenu}
            >
              <div className="menu-subreddit-title">All</div>
            </NavLink>
            {subredditList}
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
export default connect(mapStateToProps, { getUserInfo, logout })(Menu);
