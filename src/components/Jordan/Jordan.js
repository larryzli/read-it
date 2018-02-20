import React, { Component } from "react";
import axios from 'axios'


class Jordan extends Component {
  testApi() {

    axios
      .get(`/api/default`)
      .then(response => console.log(response))
  }

  render() {
    console.log(this.props.user)
    return (
      <div>
        <button onClick={(e) => this.testApi()}>Test</button>
      </div>
    );
  }
}

export default Jordan;
