import React, { Component } from "react";
import axios from "axios";

class InboxNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inbox: []
    };
    this.deleteMessage = this.deleteMessage.bind(this);
    this.markRead = this.markRead.bind(this);
    this.markUnread = this.markUnread.bind(this);
    this.retrieveInbox = this.retrieveInbox.bind(this);
  }
  componentDidMount() {
    this.retrieveInbox();
  }

  retrieveInbox() {
    axios
      .get("/api/message/inbox")
      .then(response => this.setState({ inbox: response.data }))
      .catch(console.log);
  }

  deleteMessage(id) {
    axios
      .post("/api/message/delete", { id })
      .then(response => this.retrieveInbox())
      .catch(console.log);
  }

  markRead(id) {
    axios
      .post("/api/message/mark/read", { id })
      .then(() => this.retrieveInbox())
      .catch(console.log);
  }

  markUnread(id) {
    axios
      .post("/api/message/mark/unread", { id })
      .then(() => this.retrieveInbox())
      .catch(console.log);
  }

  render() {
    return (
      <div>
        {this.state.inbox.length ? (
          <div>
            {this.state.inbox.map(message => {
              let m = message.data;
              return (
                <div key={m.name}>
                  <p>author: {m.author}</p>
                  <p>subreddit: {m.subreddit}</p>
                  <p>text: {m.body}</p>
                  {m.new ? (
                    <button onClick={() => this.markRead(m.name)}>
                      Mark Read
                    </button>
                  ) : (
                    <button onClick={() => this.markUnread(m.name)}>
                      Mark Unread
                    </button>
                  )}
                  {message.kind === "t4" ? (
                    <button onClick={() => this.deleteMessage(m.name)}>
                      Delete
                    </button>
                  ) : null}
                  <br />
                  <br />
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <p>No messages to display</p>
          </div>
        )}
      </div>
    );
  }
}

export default InboxNavigation;
