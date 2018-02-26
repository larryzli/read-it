// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
// IMPORT COMPONENTS
import MessageNavigation from "../Navigation/MessageNavigation";
import MessageCard from "../MessageCard/MessageCard";
// IMPORT ICONS
import loading from "../../icons/loading/loading-cylon-red.svg";
import newMessageIcon from "../../icons/ic_create_white_24px.svg";
// IMPORT REDUX FUNCTIONS
import { getUserInfo } from "../../ducks/userReducer";

// COMPONENT
class Messaging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // LOADING
      loading: true,

      // MESSAGES
      inbox: [],
      after: "",
      filter: "",
      loggedIn: null,

      // INBOX DRAWER
      showMessagesDrawer: false
    };

    this.deleteMessage = this.deleteMessage.bind(this);
    this.markRead = this.markRead.bind(this);
    this.markUnread = this.markUnread.bind(this);
    this.retrieveInbox = this.retrieveInbox.bind(this);
    this.retrieveUnread = this.retrieveUnread.bind(this);
    this.retrieveSent = this.retrieveSent.bind(this);
    this.backAction = this.backAction.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.authorProfile = this.authorProfile.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }
  componentDidMount() {
    this.props.getUserInfo().then(response => {
      if (this.props.user.user.id) {
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
      } else this.setState({ loggedIn: false, loading: false });
    });
  }

  backAction() {
    this.props.history.goBack();
  }

  toggleDrawer() {
    this.setState({ showMessagesDrawer: !this.state.showMessagesDrawer });
  }

  authorProfile(author) {
    this.props.history.push(`/profile/${author}`);
  }

  refreshHandler() {
    this.setState({ loading: true });
    const { filter } = this.state;
    if (filter === "inbox") {
      this.retrieveInbox();
    }
    if (filter === "unread") {
      this.retrieveUnread();
    }
    if (filter === "sent") {
      this.retrieveSent();
    }
  }
  retrieveInbox(loadMore) {
    let url = "/api/message/inbox?";
    if (loadMore) {
      url += `after=${this.state.after}&`;
    }
    axios
      .get(url)
      .then(response => {
        // console.log(response);
        this.setState({
          inbox: loadMore
            ? this.state.inbox.concat(response.data.data.children)
            : response.data.data.children,
          filter: "inbox",
          after: response.data.data.after,
          loading: false,
          loggedIn: true
        });
      })
      .catch(console.log);
  }

  retrieveUnread(loadMore) {
    let url = "/api/message/unread";
    if (loadMore) {
      url += `after=${this.state.after}&`;
    }
    axios
      .get(url)
      .then(response => {
        // console.log(response);
        this.setState({
          inbox: loadMore
            ? this.state.inbox.concat(response.data.data.children)
            : response.data.data.children,
          filter: "unread",
          after: response.data.data.after,
          loading: false,
          loggedIn: true
        });
      })
      .catch(console.log);
  }

  retrieveSent(loadMore) {
    let url = "/api/message/sent";
    if (loadMore) {
      url += `after=${this.state.after}&`;
    }
    axios
      .get(url)
      .then(response => {
        // console.log(response);
        this.setState({
          inbox: loadMore
            ? this.state.inbox.concat(response.data.data.children)
            : response.data.data.children,
          filter: "sent",
          after: response.data.data.after,
          loading: false,
          loggedIn: true
        });
      })
      .catch(console.log);
  }

  deleteMessage(id) {
    const { filter } = this.state;
    axios
      .post("/api/message/delete", { id })
      .then(response => {
        if (filter === "inbox") {
          this.retrieveInbox();
        }
        if (filter === "unread") {
          this.retrieveUnread();
        }
        if (filter === "sent") {
          this.retrieveSent();
        }
      })
      .catch(console.log);
  }

  markRead(id) {
    const { filter } = this.state;
    axios
      .post("/api/message/mark/read", { id })
      .then(() => {
        if (filter === "inbox") {
          this.retrieveInbox();
        }
        if (filter === "unread") {
          this.retrieveUnread();
        }
        if (filter === "sent") {
          this.retrieveSent();
        }
      })
      .catch(console.log);
  }

  markUnread(id) {
    const { filter } = this.state;
    axios
      .post("/api/message/mark/unread", { id })
      .then(() => {
        if (filter === "inbox") {
          this.retrieveInbox();
        }
        if (filter === "unread") {
          this.retrieveUnread();
        }
        if (filter === "sent") {
          this.retrieveSent();
        }
      })
      .catch(console.log);
  }

  createMessage() {
    this.props.history.push("/createmessage");
  }

  render() {
    const newMessageButton = (
      <div className="new-post-container" onClick={this.createMessage}>
        <div className="new-post-icon">
          <img src={newMessageIcon} alt="add new post" />
        </div>
      </div>
    );
    const messagesDrawer = (
      <div className="drawer-wrapper" onClick={this.toggleDrawer}>
        <div className="drawer-container">
          <div className="drawer-item" onClick={this.retrieveInbox}>
            Inbox
          </div>
          <div className="drawer-item" onClick={this.retrieveUnread}>
            Unread
          </div>
          <div className="drawer-item" onClick={this.retrieveSent}>
            Sent
          </div>
        </div>
      </div>
    );
    const loader = (
      <div className="loader-wrapper" key={"loader"}>
        <img src={loading} className="loader-svg" alt="loading" />
      </div>
    );
    const end = <div className="end-message">End of messages</div>;
    const messages = this.state.inbox.map(message => {
      let m = message.data;

      return (
        // <div key={m.name}>
        //   <p>author: {m.author}</p>
        //   <p>subreddit: {m.subreddit}</p>
        //   <p>text: {m.body}</p>
        //   {this.state.filter === "sent" ? null : m.new ? (
        //     <button onClick={() => this.markRead(m.name)}>Mark Read</button>
        //   ) : (
        //     <button onClick={() => this.markUnread(m.name)}>Mark Unread</button>
        //   )}
        //   {message.kind === "t4" && this.state.filter !== "sent" ? (
        //     <button onClick={() => this.deleteMessage(m.name)}>Delete</button>
        //   ) : null}
        // </div>
        <MessageCard
          filter={this.state.filter}
          age={moment(m.created_utc * 1000).fromNow()}
          key={m.name}
          subject={m.subject}
          new={m.new}
          linkTitle={m.link_title}
          author={m.author}
          dest={m.dest}
          context={m.context}
          body={m.body}
          name={m.name}
          subreddit={m.subreddit}
          comment={m.was_comment}
          read={this.markRead}
          unread={this.markUnread}
          delete={this.deleteMessage}
          visitAuthor={this.authorProfile}
        />
      );
    });
    return (
      <div className="messages-container">
        {this.state.showMessagesDrawer ? messagesDrawer : null}
        <MessageNavigation
          filterName={this.props.match.params.name}
          sortAction={this.toggleDrawer}
          backAction={this.backAction}
        />
        {this.state.loading ? loader : null}
        <InfiniteScroll
          next={() =>
            this.state.filter === "inbox"
              ? this.retrieveInbox(true)
              : this.state.filter === "sent"
                ? this.retrieveSent(true)
                : this.state.filter === "unread"
                  ? this.retrieveUnread(true)
                  : alert("invalid request")
          }
          hasMore={this.state.after ? true : false}
          height={"calc(100vh - 56px)"}
          loader={loader}
          pullDownToRefresh
          pullDownToRefreshContent={
            <h3 className="refresh-message">&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 className="refresh-message">&#8593; Release to refresh</h3>
          }
          refreshFunction={() => this.refreshHandler()}
        >
          {this.state.inbox.length ? (
            <div className="posts">{messages}</div>
          ) : !this.state.loading ? (
            <div className="end-message">
              {this.state.loggedIn
                ? "No messages to display"
                : "Please log in to view messages"}
            </div>
          ) : null}
          {this.state.inbox.length && !this.state.after ? end : null}
        </InfiniteScroll>
        {this.state.loggedIn === true ? newMessageButton : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { getUserInfo })(Messaging);
