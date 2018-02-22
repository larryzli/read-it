import React from "react";
import { Switch, Route } from "react-router-dom";

//IMPORT COMPNENTS
import Subreddit from "./components/Subreddit/Subreddit";
// import Frontpage from "./components/Frontpage/Frontpage";
import Post from "./components/Post/Post";
import Messaging from "./components/Messaging/Messaging";
import FilterNavigation from "./components/Navigation/FilterNavigation";
import SubmitSelfPost from "./components/SubmitPost/SubmitSelfPost";
import InboxNavigation from "./components/Navigation/InboxNavigation";
import SubmitLinkPost from "./components/SubmitPost/SubmitLinkPost";
import Profile from "./components/Profile/Profile";

export default (
  <Switch>
    <Route exact path="/" component={Subreddit} />
    {/* <Route path="/r/:subreddit_name/submit/:type" component={SubmitSelfPost} /> */}
    <Route path="/r/:subreddit_name/submit/:type" component={SubmitLinkPost} />
    <Route path="/r/:subreddit/post/:post/:filter" component={Post} />
    <Route path="/r/:subreddit/post/:post" component={Post} />
    <Route path="/r/:subreddit/:filter/:period" component={Subreddit} />
    <Route path="/r/:subreddit/:filter" component={Subreddit} />
    <Route path="/r/:subreddit" component={Subreddit} />
    {/* <Route path="/profile/:username" component={Profile} /> */}
    {/* <Route path="/submit/:type" component={SubmitSelfPost} /> */}
    <Route path="/submit/:type" component={SubmitLinkPost} />
    <Route path="/messages" component={Messaging} />
    <Route path="/filter" component={FilterNavigation} />
    <Route path="/inbox/:name" component={InboxNavigation} />
    <Route path="/:filter/:period" component={Subreddit} />
    <Route path="/:filter" component={Subreddit} />
  </Switch>
);
