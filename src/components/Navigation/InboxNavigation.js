import React, { Component } from "react";
import axios from "axios";

class InboxNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inbox: [],
      query: ""
    };
    this.deleteMessage = this.deleteMessage.bind(this);
    this.markRead = this.markRead.bind(this);
    this.markUnread = this.markUnread.bind(this);
    this.retrieveInbox = this.retrieveInbox.bind(this);
    this.retrieveUnread = this.retrieveUnread.bind(this);
    this.retrieveSent = this.retrieveSent.bind(this);
  }
  componentDidMount() {
    const { name } = this.props.match.params;
    if (name === "inbox") {
      this.retrieveInbox();
    }
    if (name === "unread") {
      this.retrieveUnread();
    }
    if (name === "sent") {
      this.retrieveSent();
    }
  }

  retrieveInbox() {
    axios
      .get("/api/message/inbox")
      .then(response => this.setState({ inbox: response.data, query: "inbox" }))
      .catch(console.log);
  }

  retrieveUnread() {
    axios
      .get("/api/message/unread")
      .then(response =>
        this.setState({ inbox: response.data, query: "unread" })
      )
      .catch(console.log);
  }

  retrieveSent() {
    axios
      .get("/api/message/sent")
      .then(response => this.setState({ inbox: response.data, query: "sent" }))
      .catch(console.log);
  }

  deleteMessage(id) {
    const { query } = this.state;
    axios
      .post("/api/message/delete", { id })
      .then(response => {
        if (query === "inbox") {
          this.retrieveInbox();
        }
        if (query === "unread") {
          this.retrieveUnread();
        }
        if (query === "sent") {
          this.retrieveSent();
        }
      })
      .catch(console.log);
  }

  markRead(id) {
    const { query } = this.state;
    axios
      .post("/api/message/mark/read", { id })
      .then(() => {
        if (query === "inbox") {
          this.retrieveInbox();
        }
        if (query === "unread") {
          this.retrieveUnread();
        }
        if (query === "sent") {
          this.retrieveSent();
        }
      })
      .catch(console.log);
  }

  markUnread(id) {
    const { query } = this.state;
    axios
      .post("/api/message/mark/unread", { id })
      .then(() => {
        if (query === "inbox") {
          this.retrieveInbox();
        }
        if (query === "unread") {
          this.retrieveUnread();
        }
        if (query === "sent") {
          this.retrieveSent();
        }
      })
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
                  {this.state.query === "sent" ? null : m.new ? (
                    <button onClick={() => this.markRead(m.name)}>
                      Mark Read
                    </button>
                  ) : (
                    <button onClick={() => this.markUnread(m.name)}>
                      Mark Unread
                    </button>
                  )}
                  {message.kind === "t4" && this.state.query !== "sent" ? (
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
