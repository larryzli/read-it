import React, { Component } from "react";
import axios from 'axios'


class Jordan extends Component {
  testApi() {
    // let subreddit = "gifs"
    // let t = "week"
    axios
      .get(`/api/random?subreddit=gifs`)
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
