import React, { Component } from "react";
import axios from "axios";

class SubmitPost extends Component {
  testApi() {
    axios
      .get(`/api/search/search_reddit_names?query=cringe`)
      .then(response => console.log(response));
  }

  render() {
    console.log(this.props.user);
    return (
      <div>
        <button onClick={e => this.testApi()}>Test</button>
      </div>
    );
  }
}

export default SubmitPost;
