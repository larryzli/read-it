// IMPORT DEPENDENCIES
import React, { Component } from "react";
import axios from "axios";
// IMPORT COMPONENTS
import MessageNavigation from "../Navigation/MessageNavigation";
import MessageCard from "../MessageCard/MessageCard";

// COMPONENT
class Messaging extends Component {
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
    this.backAction = this.backAction.bind(this);
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

  backAction() {
    console.log(this.props);
    if (this.props.history) {
      this.props.history.goBack();
    } else {
      console.log(this.props.history);
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
    const message = [
      <MessageCard
        date={"test"}
        subject={"Subject"}
        body={"Don't test me bro!"}
        author={"SpaghetToucher123"}
        key={0}
      />,
      <MessageCard
        date={"test"}
        subject={"Subject"}
        body={"Don't test me bro!"}
        author={"SpaghetToucher123"}
        key={1}
      />,
      <MessageCard
        date={"test"}
        subject={"Subject"}
        body={"Don't test me bro!"}
        author={"SpaghetToucher123"}
        key={2}
      />
    ];
    return (
      <div>
        <MessageNavigation
          filterName={this.props.match.params.name}
          refreshAction={this.refreshAction}
          backAction={this.backAction}
        />
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
      </div>
    );
  }
}
export default Messaging;
