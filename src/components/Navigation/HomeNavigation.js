import React, { Component } from "react";
// import './HomeNavigation.css';
import menuIcon from "../../icons/ic_menu_white_24px.svg";
import dropdownIcon from "../../icons/ic_arrow_drop_down_white_24px.svg";
// import searchIcon from "../../icons/ic_search_white_24px.svg";
import sortIcon from "../../icons/ic_sort_white_24px.svg";
import moreIcon from "../../icons/ic_more_vert_white_24px.svg";

class HomeNavigation extends Component {
    render() {
        return (
            <div className="nav-background">
                <div className="nav-left">
                    <img
                        className="nav-left-icon"
                        src={menuIcon}
                        alt="menu icon"
                    />
                    <div className="nav-page-container">
                        <div className="nav-title">
                            <span className="nav-page-name">frontpage</span>
                            <span className="nav-page-filter">HOT</span>
                        </div>
                        <img src={dropdownIcon} alt="dropdown icon" />
                    </div>
                </div>
                <div className="nav-right">
                    {/* <img src={searchIcon} alt="search icon" /> */}
                    <img
                        className="nav-left-icon"
                        src={sortIcon}
                        alt="sort icon"
                    />
                    <img
                        className="nav-left-icon"
                        src={moreIcon}
                        alt="more icon"
                    />
                </div>
            </div>
        );
    }
}

export default HomeNavigation;
