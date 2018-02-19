// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
// import axios from "axios";
// IMPORT COMPONENTS
import HomeNavigation from "../Navigation/HomeNavigation";
import PostCard from "../PostCard/PostCard";
// IMPORT REDUX FUNCTIONS
import { pullHot } from "../../ducks/subredditReducer";
import { getUserInfo } from "../../ducks/userReducer";
// IMPORT ICONS
import profileIcon from "../../icons/ic_person_white_20px.svg";
import messageIcon from "../../icons/ic_email_white_20px.svg";
import settingsIcon from "../../icons/ic_settings_white_20px.svg";
import dropdownIcon from "../../icons/ic_arrow_drop_down_grey_20px.svg";
import axios from "axios";

// COMPONENT
class Subreddit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "HOT",

      // FOR MENU
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      enableDragHandle: true,
      position: "left",
      dragToggleDistance: 30
    };

    this.openMenu = this.openMenu.bind(this);
  }
  onOpenChange = open => {
    this.setState({ open });
  };

  openMenu = () => {
    this.setState({ open: !this.state.open });
  };

  onDock = () => {
    const docked = !this.state.docked;
    this.setState({
      docked
    });
    if (!docked) {
      this.onOpenChange(false);
    }
  };
  loginHandler = () => {
    window.location.href = `${process.env.REACT_APP_HOST}/auth/reddit`;
  };
  componentDidMount() {
    // GET USER INFO
    this.props.getUserInfo();
    // DEFAULT: PULL HOT POSTS
    this.props.pullHot();
  }
  render() {
    // MENU SETTINGS
    console.log(this.props);
    let menu = (
      <div className="menu-container">
        <div className="menu-logo-container">
          <span className="menu-logo">
            N<span className="logo-up">V</span>
            <span className="logo-down">V</span>IT
          </span>
          <div className="menu-pin" onClick={this.onDock}>
            {this.state.docked ? "-" : "+"}
          </div>
        </div>
        <div className="menu-account-container">
          <span>
            {this.props.user.user ? this.props.user.user.name : "Guest"}
          </span>
          {this.props.user.user ? (
            <button
              className="menu-remove-account"
              onClick={() =>
                axios
                  .post("/api/vote")
                  .then(res => console.log(res))
                  .catch(console.log)
              }
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
            <span className="menu-submenu-title">
              <img className="menu-submenu-icon" src={profileIcon} alt="" />Profile
            </span>
            <img src={dropdownIcon} alt="dropdown" />
          </div>
          <div className="menu-submenu-item">
            <span className="menu-submenu-title">
              <img className="menu-submenu-icon" src={messageIcon} alt="" />Messaging
            </span>
            <img src={dropdownIcon} alt="dropdown" />
          </div>
          <div className="menu-submenu-item">
            <span className="menu-submenu-title">
              <img className="menu-submenu-icon" src={settingsIcon} alt="" />Settings
            </span>
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

    // LOAD SUBREDDIT POST
    const posts = this.props.subreddit.posts.map((post, index) => {
      return (
        <PostCard
          key={index}
          title={post.post_title}
          domain={post.domain}
          subreddit={post.subreddit_title}
          author={post.author}
          thumbnail={post.post_thumbnail}
          comments={post.num_comments}
          score={post.score}
          subredditID={post.subreddit_id}
          created={moment(post.created_utc * 1000).fromNow()}
          url={post.url}
          over18={post.over_18}
          postID={post.post_id}
        />
      );
    });
    return (
      <div className="drawer-container">
        <Drawer
          sidebar={menu}
          docked={this.state.docked}
          open={this.state.open}
          touch={this.state.touch}
          enableDragHandle={this.state.enableDragHandle}
          position={this.state.position}
          dragToggleDistance={this.state.dragToggleDistance}
          transitions={this.state.transitions}
          onOpenChange={this.onOpenChange}
          style={{ overflow: "auto" }}
          sidebarStyle={{
            backgroundColor: "#444",
            boxShadow: "0px 0px 2px #111"
          }}
          dragHandleStyle={{ backgroundColor: "transparent" }}
          overlayStyle={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="main">
            <HomeNavigation
              openMenu={this.openMenu}
              filterName={this.state.filter}
            />
            <div className="posts">{posts}</div>
          </div>
        </Drawer>
      </div>
    );
  }
}

// CONNECT TO REDUX
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, { pullHot, getUserInfo })(Subreddit);
