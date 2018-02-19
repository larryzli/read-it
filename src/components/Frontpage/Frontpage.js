// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
// IMPORT COMPONENTS
import Subreddit from "../SubredditPosts/SubredditPosts";
import HomeNavigation from "../Navigation/HomeNavigation";
import Menu from "../Menu/Menu";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
// IMPORT ICONS
import newPost from "../../icons/ic_create_white_24px.svg";
// IMPORT REDUX FUNCTIONS
import { pullHot } from "../../ducks/subredditReducer";

class Frontpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "hot",

      // FOR POSTS
      posts: [],
      after: null,
      limit: null,

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
    this.onDock = this.onDock.bind(this);
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
  componentDidMount() {
    // DEFAULT: PULL HOT POSTS
    let url = `/api/${this.state.filter}?`;
    if (this.state.after) {
      url += `after=${this.state.after}&`;
    }
    if (this.state.limit) {
      url += `limit=${this.state.limit}&`;
    }
    axios
      .get(url)
      .then(response => {
        this.setState({
          posts: response.data.posts,
          after: response.data.after
        });
      })
      .catch(console.log);
  }
  render() {
    return (
      <div className="drawer-container">
        <Drawer
          sidebar={<Menu docked={this.state.docked} onDock={this.onDock} />}
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
            <Subreddit
              subredditPosts={this.state.posts}
              navigation={
                <HomeNavigation
                  openMenu={this.openMenu}
                  filterName={this.state.filter}
                />
              }
            />
            <div className="new-post-container">
              <div className="new-post-icon">
                <img src={newPost} alt="add new post" />
              </div>
            </div>
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
export default connect(mapStateToProps, { pullHot })(Frontpage);
