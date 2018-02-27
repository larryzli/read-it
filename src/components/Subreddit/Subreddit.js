// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
// IMPORT COMPONENTS
import SubredditPosts from "../SubredditPosts/SubredditPosts";
import SubNavigation from "../Navigation/SubNavigation";
import Menu from "../Menu/Menu";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import Sidebar from "../Sidebar/Sidebar";
// IMPORT ICONS
import newPost from "../../icons/ic_create_white_24px.svg";
import rightArrow from "../../icons/ic_arrow_drop_down_grey_20px.svg";
import textIcon from "../../icons/ic_text_format_white_16px.svg";
import linkIcon from "../../icons/ic_link_white_16px.svg";
// IMPORT REDUX FUNCTIONS
import { pullHot } from "../../ducks/subredditReducer";

// COMPONENT
class Subreddit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // LOADER
      loading: true,

      // FOR FILTERS
      filter: this.props.match.params.filter || "hot",
      filterPeriodTitle: "",
      filterPeriod: this.props.match.params.period || "",

      // FOR POSTS
      posts: [],
      after: null,
      // limit: null,

      // FOR MENU
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      enableDragHandle: true,
      position: "left",
      dragToggleDistance: 30,

      // FOR SIDEBAR
      sidebarOpen: false,
      sidebarTransitions: true,
      sidebarTouch: true,
      sidebarEnableDragHandle: false,
      sidebarPosition: "right",

      // FOR SORT
      showSortDrawer: false,
      showSortPeriodDrawer: false,

      // SUBREDDIT
      subreddit: this.props.match.params.subreddit,

      // FOR NEW POST
      showNewPostDrawer: false
    };

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.onDock = this.onDock.bind(this);
    this.refreshHandler = this.refreshHandler.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.loadContent = this.loadContent.bind(this);
    this.loadSubreddit = this.loadSubreddit.bind(this);
  }
  loadSubreddit = subreddit => {
    this.props.history.push(`/r/${subreddit}`);
  };
  refreshHandler = () => {
    this.setState({ loading: true, after: "", posts: [] });
    let url = `/api/${this.state.filter}?`;
    if (this.state.subreddit) {
      url = `/api/${this.state.filter}?subreddit=${this.state.subreddit}&`;
    }
    if (this.state.filterPeriod) {
      url += `t=${this.state.filterPeriod}&`;
    }
    axios
      .get(url)
      .then(response => {
        setTimeout(() => {
          this.setState({
            posts: response.data.posts,
            after: response.data.after,
            loading: false
          });
        }, 1000);
      })
      .catch(console.log);
  };
  onOpenChange = open => {
    this.setState({ open });
  };
  closeMenu = () => {
    this.setState({ open: false });
  };
  openMenu = () => {
    this.setState({ open: !this.state.open, docked: false });
  };
  sidebarOnOpenChange = open => {
    this.setState({ sidebarOpen: open });
  };
  openSidebar = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  };
  toggleSort = () => {
    this.setState({ showSortDrawer: !this.state.showSortDrawer });
  };
  toggleSortPeriod = periodTitle => {
    this.setState({
      showSortPeriodDrawer: !this.state.showSortPeriodDrawer,
      filterPeriodTitle: periodTitle
    });
  };
  toggleNewPost = () => {
    if (this.props.user.user.id) {
      this.setState({ showNewPostDrawer: !this.state.showNewPostDrawer });
    } else {
      alert("Please log in to submit a post");
    }
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
  loadContent = (filter, timeFrame, loadMore) => {
    if (!loadMore) {
      this.setState({ loading: true, posts: [], after: "" });
    }
    let url = `/api/${filter}?`;
    if (this.state.subreddit) {
      url = `/api/${filter}?subreddit=${this.state.subreddit}&`;
    }
    if (this.state.after && loadMore) {
      url += `after=${this.state.after}&`;
    }
    if (timeFrame) {
      url += `t=${timeFrame}&`;
    }
    axios
      .get(url)
      .then(response => {
        this.setState({
          posts: loadMore
            ? this.state.posts.concat(response.data.posts)
            : response.data.posts,
          after: response.data.after,
          loading: false
        });
      })
      .catch(console.log);
  };
  changeFilter = (filterVal, filterPeriod) => {
    this.setState({ loading: true });
    if (filterVal === "hot" || filterVal === "new" || filterVal === "rising") {
      this.setState({
        filter: filterVal,
        filterPeriod: "",
        loading: false
      });

      if (this.state.subreddit) {
        this.props.history.push(`/r/${this.state.subreddit}/${filterVal}`);
      } else {
        this.props.history.push(`/${filterVal}`);
      }
      this.loadContent(filterVal);
    } else {
      this.setState({
        filter: filterVal,
        filterPeriod: filterPeriod,
        loading: false
      });
      if (this.state.subreddit) {
        this.props.history.push(
          `/r/${this.state.subreddit}/${filterVal}/${filterPeriod}`
        );
      } else {
        this.props.history.push(`/${filterVal}/${filterPeriod}`);
      }
      this.loadContent(filterVal, filterPeriod);
    }
  };
  componentDidMount() {
    // DEFAULT: PULL HOT POSTS
    this.loadContent(this.state.filter, this.state.filterPeriod);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params !== nextProps.match.params) {
      let filter = nextProps.match.params.filter || "hot";
      let period = nextProps.match.params.period || "";
      let url = `/api/${filter}?`;
      if (nextProps.match.params.subreddit) {
        url = `/api/${filter}?subreddit=${nextProps.match.params.subreddit}&`;
      }
      if (period) {
        url += `t=${period}`;
      }
      this.setState({ loading: true, posts: [], after: "" });
      axios.get(url).then(response => {
        this.setState({
          subreddit: nextProps.match.params.subreddit,
          filter: filter,
          posts: response.data.posts,
          after: response.data.after,
          filterPeriod: period,
          loading: false
        });
      });
    }
  }
  render() {
    const newPostDrawer = (
      <div className="newpost-drawer-wrapper" onClick={this.toggleNewPost}>
        <div className="newpost-drawer-container">
          <Link
            to={
              this.state.subreddit
                ? `/r/${this.state.subreddit}/submit/self`
                : "submit/self"
            }
            className="newpost-drawer-item"
          >
            <img src={textIcon} alt="text post" />
          </Link>
          <Link
            to={
              this.state.subreddit
                ? `/r/${this.state.subreddit}/submit/link`
                : "submit/link"
            }
            className="newpost-drawer-item"
          >
            <img src={linkIcon} alt="link post" />
          </Link>
        </div>
      </div>
    );
    const sortDrawer = (
      <div className="drawer-wrapper" onClick={e => this.toggleSort()}>
        <div className="drawer-container">
          <div className="drawer-item" onClick={e => this.changeFilter("hot")}>
            Hot
          </div>
          <div className="drawer-item" onClick={e => this.changeFilter("new")}>
            New
          </div>
          <div
            className="drawer-item"
            onClick={e => this.changeFilter("rising")}
          >
            Rising
          </div>
          <div
            className="drawer-item"
            onClick={e => this.toggleSortPeriod("top")}
          >
            Top
            <img
              src={rightArrow}
              alt=""
              style={{ transform: "rotate(-90deg)" }}
            />
          </div>
          <div
            className="drawer-item"
            onClick={e => this.toggleSortPeriod("controversial")}
          >
            Controversial
            <img
              src={rightArrow}
              alt=""
              style={{ transform: "rotate(-90deg)" }}
            />
          </div>
        </div>
      </div>
    );
    const sortPeriodDrawer = (
      <div className="drawer-wrapper" onClick={e => this.toggleSortPeriod()}>
        <div className="drawer-container">
          <div className="drawer-title">{this.state.filterPeriodTitle}</div>
          <div
            className="drawer-item"
            onClick={e =>
              this.changeFilter(this.state.filterPeriodTitle, "hour")
            }
          >
            Hour
          </div>
          <div
            className="drawer-item"
            onClick={e =>
              this.changeFilter(this.state.filterPeriodTitle, "day")
            }
          >
            Day
          </div>
          <div
            className="drawer-item"
            onClick={e =>
              this.changeFilter(this.state.filterPeriodTitle, "week")
            }
          >
            Week
          </div>
          <div
            className="drawer-item"
            onClick={e =>
              this.changeFilter(this.state.filterPeriodTitle, "month")
            }
          >
            Month
          </div>
          <div
            className="drawer-item"
            onClick={e =>
              this.changeFilter(this.state.filterPeriodTitle, "year")
            }
          >
            Year
          </div>
          <div
            className="drawer-item"
            onClick={e =>
              this.changeFilter(this.state.filterPeriodTitle, "all")
            }
          >
            All
          </div>
        </div>
      </div>
    );
    const newPostButton = (
      <div className="new-post-container" onClick={this.toggleNewPost}>
        <div className="new-post-icon">
          <img src={newPost} alt="add new post" />
        </div>
      </div>
    );
    return (
      <div>
        {this.state.showSortDrawer ? sortDrawer : null}
        {this.state.showSortPeriodDrawer ? sortPeriodDrawer : null}
        {this.state.showNewPostDrawer ? newPostDrawer : null};
        <Drawer
          sidebar={
            <Menu
              docked={this.state.docked}
              onDock={this.onDock}
              closeMenu={this.closeMenu}
              loadSubreddit={this.loadSubreddit}
            />
          }
          docked={this.state.docked}
          open={this.state.open}
          touch={this.state.touch}
          enableDragHandle={this.state.enableDragHandle}
          position={this.state.position}
          dragToggleDistance={this.state.dragToggleDistance}
          transitions={this.state.transitions}
          onOpenChange={this.onOpenChange}
          style={{ overflow: "hidden" }}
          sidebarStyle={{
            backgroundColor: "#444",
            boxShadow: "0px 0px 2px #111",
            zIndex: "3"
          }}
          dragHandleStyle={{ backgroundColor: "transparent" }}
          overlayStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "2"
          }}
        >
          <Drawer
            sidebar={
              <Sidebar
                subreddit_name={this.props.match.params.subreddit}
                closeSidebar={this.openSidebar}
              />
            }
            open={this.state.sidebarOpen}
            touch={this.state.sidebarTouch}
            enableDragHandle={false}
            position={this.state.sidebarPosition}
            transitions={this.state.sidebarTransitions}
            onOpenChange={this.sidebarOnOpenChange}
            style={{ overflow: "hidden" }}
            sidebarStyle={{
              backgroundColor: "#444",
              boxShadow: "0px 0px 2px #111",
              zIndex: "3",
              marginLeft: !this.state.docked
                ? "calc(100vw - 250px)"
                : "calc(100vw - 500px)"
            }}
            dragHandleStyle={{ backgroundColor: "transparent" }}
            overlayStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: "2"
            }}
          >
            <SubredditPosts
              refreshHandler={this.refreshHandler}
              subredditPosts={this.state.posts}
              filter={this.state.filter}
              filterPeriod={this.state.filterPeriod}
              hasMore={this.state.after ? true : false}
              loadContent={this.loadContent}
              isLoading={this.state.loading}
              enableControls={this.props.user.user.id ? true : false}
              showSubredditControl={
                !this.state.subreddit || this.state.subreddit === "All"
              }
              domainFilters={this.props.user.user.filter || []}
              navigation={
                <SubNavigation
                  openMenu={this.openMenu}
                  openSidebar={this.openSidebar}
                  title={this.state.subreddit}
                  filterName={
                    this.state.filterPeriod
                      ? `${this.state.filter}: ${this.state.filterPeriod}`
                      : this.state.filter
                  }
                  sortAction={this.toggleSort}
                />
              }
            />

            {newPostButton}
          </Drawer>
        </Drawer>
      </div>
    );
  }
}

// CONNECT TO REDUX
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, { pullHot })(Subreddit);
