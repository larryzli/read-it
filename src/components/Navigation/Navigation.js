// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { Link } from "react-router-dom";
// IMPORT ICONS
import dropdownIcon from "../../icons/ic_arrow_drop_down_white_24px.svg";
// import searchIcon from "../../icons/ic_search_white_24px.svg";

// COMPONENT
class Navigation extends Component {
  render() {
    // DISPLAY RIGHT ICONS
    const rightIcons = this.props.rightIcons.map((icon, index) => {
      return (
        <img
          key={index}
          className="nav-left-icon"
          src={icon}
          alt="control icon"
          onClick={this.props.rightActions[index]}
        />
      );
    });
    return (
      <div className="nav-background">
        <div className="nav-left">
          <img
            className="nav-left-icon"
            src={this.props.leftIcon}
            alt="menu icon"
            onClick={e => this.props.leftAction()}
          />
          <Link
            to={this.props.title ? `/r/${this.props.title}` : "/"}
            className="nav-page-container"
          >
            <div className="nav-title">
              <span className="nav-page-name">
                {this.props.title || "Frontpage"}
              </span>
              <span className="nav-page-subtitle">{this.props.filterName}</span>
            </div>
            {this.props.dropdown ? (
              <img src={dropdownIcon} alt="dropdown icon" />
            ) : null}
          </Link>
        </div>
        <div className="nav-right">{rightIcons}</div>
      </div>
    );
  }
}

// EXPORT COMPONENT
export default Navigation;
