// IMPORT DEPENDENCIES
import React, { Component } from "react";

// COMPONENT
class Sidebar extends Component {
  render() {
    console.log(this.props);
    return <div>{this.props.subreddit}</div>;
  }
}

export default Sidebar;
