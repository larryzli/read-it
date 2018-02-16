import React, { Component } from "react";
import axios from "axios";
class Bruno extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() =>
            axios
              .post("/api/reply")
              .then(response => console.log(response))
              .catch(console.log)
          }
        >
          Test
        </button>
      </div>
    );
  }
}

export default Bruno;
