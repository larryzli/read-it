// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// IMPORT COMPONENTS
import FilterNavigation from "../Navigation/FilterNavigation";
// IMPORT REDUX FUNCTIONS
import { removeFilter, addFilter, editFilter } from "../../ducks/userReducer";

// COMPONENT
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      editName: ""
    };

    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <FilterNavigation backAction={this.goBack} />
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
})(Filter);
