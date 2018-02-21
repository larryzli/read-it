import React from "react";
import { Switch, Route } from "react-router-dom";

//IMPORT COMPNENTS
// import Subreddit from "./components/Subreddit/Subreddit";
import Frontpage from "./components/Frontpage/Frontpage";
import Post from "./components/Post/Post";
import Messaging from "./components/Messaging/Messaging";
import FilterNavigation from "./components/Navigation/FilterNavigation";
import SubmitSelfPost from "./components/SubmitPost/SubmitSelfPost";
import InboxNavigation from "./components/Navigation/InboxNavigation";
import SubmitLinkPost from "./components/SubmitPost/SubmitLinkPost";
import Profile from "./components/Profile/Profile";

export default (
  <Switch>
    <Route exact path="/" component={Frontpage} />
    {/* <Route path="/r/:subreddit" component={Subreddit} /> */}
    <Route path="/submit/self" component={SubmitSelfPost} />
    <Route path="/r/:subreddit_name/submit/self" component={SubmitSelfPost} />
    <Route path="/submit/link" component={SubmitLinkPost} />
    <Route path="/r/:subreddit_name/submit/link" component={SubmitLinkPost} />
    <Route path="/r/:subreddit/:post" component={Post} />
    {/* <Route path="/profile/:username" component={Profile} /> */}
    <Route path="/messages" component={Messaging} />
    <Route path="/filter" component={FilterNavigation} />
    <Route path="/inbox" component={InboxNavigation} />
  </Switch>
);
