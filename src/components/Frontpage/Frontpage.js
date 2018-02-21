// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
// IMPORT COMPONENTS
import SubredditPosts from "../SubredditPosts/SubredditPosts";
import HomeNavigation from "../Navigation/HomeNavigation";
import Menu from "../Menu/Menu";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
// IMPORT ICONS
import newPost from "../../icons/ic_create_white_24px.svg";
import rightArrow from "../../icons/ic_arrow_drop_down_grey_20px.svg";
// IMPORT REDUX FUNCTIONS
import { pullHot } from "../../ducks/subredditReducer";

class Frontpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // LOADER
      loading: true,

      // FOR FILTERS
      filter: "hot",
      filterPeriodTitle: "",
      filterPeriod: "",

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
      showSortPeriodDrawer: false
    };

    this.openMenu = this.openMenu.bind(this);
    this.onDock = this.onDock.bind(this);
    this.refreshHandler = this.refreshHandler.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.loadContent = this.loadContent.bind(this);
  }
  refreshHandler = () => {
    this.setState({ loading: true });
    let url = `/api/${this.state.filter}?`;
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
  openMenu = () => {
    this.setState({ open: !this.state.open, docked: false });
  };
  sidebarOnOpenChange = open => {
    this.setState({ sidebarOpen: open });
  };
  openSidebar = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen,
      sidebarDocked: false
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
    if (this.state.after && loadMore) {
      url += `after=${this.state.after}&`;
    }
    if (timeFrame) {
      url += `t=${timeFrame}&`;
    }
    axios
      .get(url)
      .then(response => {
        if (!loadMore) {
          this.setState({
            posts: response.data.posts,
            after: response.data.after,
            loading: false
          });
        } else {
          this.setState({
            posts: this.state.posts.concat(response.data.posts),
            after: response.data.after,
            loading: false
          });
        }
      })
      .catch(console.log);
  };
  changeFilter = (filterVal, filterPeriod) => {
    this.setState({ loading: true });
    if (
      filterVal === "hot" ||
      filterVal === "new" ||
      filterVal === "rising" ||
      filterVal === "controversial"
    ) {
      this.setState({
        filter: filterVal,
        filterPeriod: "",
        loading: false
      });
      this.loadContent(filterVal);
    } else {
      this.setState({
        filter: filterVal,
        filterPeriod: filterPeriod,
        loading: false
      });
      this.loadContent(filterVal, filterPeriod);
    }
  };
  componentDidMount() {
    // DEFAULT: PULL HOT POSTS
    this.loadContent(this.state.filter);

    // GET SIDEBAR INFO
  }
  render() {
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
            onClick={e => this.toggleSortPeriod("Top")}
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
            onClick={e => this.toggleSortPeriod("Controversial")}
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
    return (
      <div>
        {this.state.showSortDrawer ? sortDrawer : null}
        {this.state.showSortPeriodDrawer ? sortPeriodDrawer : null}

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
            sidebar={<div>SIDEBAR HERE</div>}
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
              navigation={
                <HomeNavigation
                  openMenu={this.openMenu}
                  openSidebar={this.openSidebar}
                  filterName={
                    this.state.filterPeriod
                      ? `${this.state.filter}: ${this.state.filterPeriod}`
                      : this.state.filter
                  }
                  sortAction={this.toggleSort}
                />
              }
            />

            <div className="new-post-container">
              <div className="new-post-icon">
                <img src={newPost} alt="add new post" />
              </div>
            </div>
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
export default connect(mapStateToProps, { pullHot })(Frontpage);
