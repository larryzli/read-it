import React, { Component } from 'react';
import axios from 'axios'

//IMPORT COMPONENTS
import SubmitNavigation from '../Navigation/SubmitNavigation'

class SubmitLinkPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      url: "",
      subredditName: ""
    }

  };

  componentDidMount() {
    this.props.match.params.subreddit_name ? this.setState({ subredditName: this.props.match.params.subreddit_name }) : null
  }

  handleChange = (props, value) => {
    this.setState({
      [props]: value
    })
  }

  backAction = () => {
    this.props.history.goBack();
  }

  sendAction = () => {
    axios
      .post('/api/post/submit', {
        kind: "link",
        title: this.state.title,
        url: this.state.url,
        sr: this.state.subredditName

      })
      .then(response => response.data)
      .catch(console.log)

  }


  render() {
    console.log(this.props.match.params.subreddit_name, this.state)
    return (
      <div>
        <SubmitNavigation
          sendAction={this.sendAction}
          backAction={this.backAction}
        />
        <div className="submit-post-container">
          <input
            placeholder="Post Title"
            type="text"
            onChange={e => this.handleChange("title", e.target.value)}
          />
          <br />
          <input
            placeholder="URL"
            type="text"
            onChange={e => this.handleChange("url", e.target.value)}
          />
          <br />

          {this.props.match.params.subreddit_name ?
            <div>Submiting to /r/{this.props.match.params.subreddit_name}</div> :
            <div>
              <input
                placeholder="Subreddit Name"
                type="text"
                onChange=

                {e => this.handleChange("subredditName", e.target.value, )}
              />
              <br />
            </div>}

          <input type="checkBox" />
          Send Replies To My Inbox
                    <button onClick={this.sendAction} > TEST</button >
        </div>

      </div>

    )
  }
}
export default SubmitLinkPost