import React, { Component } from "react";
import axios from 'axios'


class Jordan extends Component {
  testApi() {

    axios
      .get(`/api/search/wow`, { q: "what does this do" })
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
