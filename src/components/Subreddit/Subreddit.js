// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
// IMPORT COMPONENTS
import HomeNavigation from "../Navigation/HomeNavigation";
import PostCard from "../PostCard/PostCard";
// IMPORT REDUX FUNCTIONS
import { pullHot } from "../../ducks/subredditReducer";
import { getUserInfo } from "../../ducks/userReducer";
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
    // console.log(this.props);
    let menu = (
      <div>
        <h3>
          Menu
          <button onClick={this.onDock}>
            {this.state.docked ? "unpin" : "pin"}
          </button>
        </h3>
        <button onClick={() => this.loginHandler()}>LOGIN</button>
      </div>
    );
    if (this.props.user.user) {
      menu = (
        <div>
          <h3>
            LOGGED IN
            <button onClick={this.onDock}>
              {this.state.docked ? "unpin" : "pin"}
            </button>
          </h3>
          <button>LOGOUT</button>
        </div>
      );
    }
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
          sidebarStyle={{ backgroundColor: "red" }}
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
