// IMPORT DEPENDENCIES
import React, { Component } from "react";

class FilterCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleEdit: false,
      filterName: this.props.filter.filter_name,
      editName: this.props.filter.filter_name
    };

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  editFilter() {
    if (this.state.editName) {
      this.props.editFilter(this.props.filter.id, this.state.editName);
      this.toggleEdit();
    } else {
      alert("Please enter valid filter");
    }
  }

  toggleEdit() {
    this.setState({
      toggleEdit: !this.state.toggleEdit,
      editName: this.props.filter.filter_name
    });
  }
  render() {
    return (
      <div className="filter-list-item" key={this.props.filter.id}>
        {!this.state.toggleEdit ? (
          <div className="filter-item-content">
            <div className="filter-item-name">
              {this.props.filter.filter_name}
            </div>
            <button
              className="filter-item-button edit"
              onClick={this.toggleEdit}
            >
              EDIT
            </button>
            <button
              className="filter-item-button delete"
              onClick={() => this.props.removeFilter(this.props.filter.id)}
            >
              DELETE
            </button>
          </div>
        ) : (
          <form className="filter-item-content">
            <input
              className="filter-item-input"
              onChange={e => this.setState({ editName: e.target.value })}
              value={this.state.editName}
              placeholder="Edit Filter"
            />
            <button
              className="filter-item-button edit"
              onClick={e => this.toggleEdit()}
            >
              CANCEL
            </button>
            <input
              className="filter-item-button"
              onClick={() => this.editFilter()}
              type="submit"
              value="SAVE"
            />
          </form>
        )}
      </div>
    );
  }
}

export default FilterCard;
