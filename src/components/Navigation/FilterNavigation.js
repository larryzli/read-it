// IMPORT DEPENDENCIES
import React, { Component } from "react";
// IMPORT COMPONENTS
import Navigation from "../Navigation/Navigation";
// IMPORT ICONS
import menuIcon from "../../icons/ic_menu_white_24px.svg";
import sortIcon from "../../icons/ic_sort_white_24px.svg";
// import moreIcon from "../../icons/ic_more_vert_white_24px.svg";
import sidebarIcon from "../../icons/ic_chrome_reader_mode_white_24px.svg";
// import searchIcon from "../../icons/ic_search_white_24px.svg";

import { connect } from "react-redux";
import { removeFilter, addFilter, editFilter } from "../../ducks/userReducer";

// COMPONENT
class FilterNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      editName: ""
    };
  }

  render() {
    return (
      <div>
        <div>
          <Navigation
            title="Domain Filters"
            filterName="List"
            leftIcon={menuIcon}
            dropdown={false}
            leftAction={this.props.openMenu}
            rightIcons={[]}
          />
        </div>
        <div>
          <input onChange={e => this.setState({ filter: e.target.value })} />
          <button onClick={() => this.props.addFilter(this.state.filter)}>
            Add Filter
          </button>
        </div>
        <div>
          {this.props.user.filter.map(filter => {
            return (
              <div key={filter.id}>
                <p>{filter.filter_name}</p>
                <input
                  onChange={e => this.setState({ editName: e.target.value })}
                />
                <button
                  onClick={() =>
                    this.props.editFilter(filter.id, this.state.editName)
                  }
                >
                  Edit
                </button>
                <button onClick={() => this.props.removeFilter(filter.id)}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

// EXPORT COMPONENT
export default connect(mapStateToProps, {
  removeFilter,
  addFilter,
  editFilter
})(FilterNavigation);
