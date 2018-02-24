// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// IMPORT COMPONENTS
import FilterNavigation from "../Navigation/FilterNavigation";
import FilterCard from "../Filter/FilterCard";
// IMPORT REDUX FUNCTIONS
import {
  removeFilter,
  addFilter,
  editFilter,
  getFilters
} from "../../ducks/userReducer";
import { getUserInfo } from "../../ducks/userReducer";

// COMPONENT
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      editName: "",
      loggedIn: true
    };

    this.goBack = this.goBack.bind(this);
    this.createFilter = this.createFilter.bind(this);
  }
  componentDidMount() {
    this.props.getUserInfo().then(response => {
      if (this.props.user.user.id) {
        this.props.getFilters();
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  goBack() {
    this.props.history.goBack();
  }

  createFilter(e) {
    e.preventDefault();
    if (this.state.loggedIn) {
      if (this.state.filter) {
        this.props.addFilter(this.state.filter);
        this.setState({ filter: "" });
      } else {
        alert("Please enter a valid filter");
      }
    } else {
      alert("Please log in to use this feature");
    }
  }

  render() {
    const filters = this.props.user.filter || [];
    return (
      <div>
        <FilterNavigation backAction={this.goBack} />
        <div className="filter-container">
          <form className="filter-new">
            <input
              className="filter-new-input"
              onChange={e => this.setState({ filter: e.target.value })}
              placeholder="Add URL to Filter"
            />
            <input
              className="filter-new-submit"
              onClick={e => this.createFilter(e)}
              type="submit"
              value="ADD"
            />
          </form>
          <div className="filter-list">
            {filters.map((filter, index) => {
              return (
                <FilterCard
                  key={index}
                  filter={filter}
                  editFilter={this.props.editFilter}
                  removeFilter={this.props.removeFilter}
                />
              );
            })}
          </div>
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
  editFilter,
  getFilters,
  getUserInfo
})(Filter);
