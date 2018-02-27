import React from "react";
import { Switch, Route } from "react-router-dom";

//IMPORT COMPNENTS
import Subreddit from "./components/Subreddit/Subreddit";
import Post from "./components/Post/Post";
import Messaging from "./components/Messaging/Messaging";
import Filter from "./components/Filter/Filter";
import SubmitPost from "./components/SubmitPost/SubmitPost";
import Profile from "./components/Profile/Profile";
import SendMessage from "./components/Messaging/SendMessage";
import Saved from "./components/Profile/Saved";
export default (
  <Switch>
    <Route exact path="/" component={Subreddit} />
    <Route path="/createmessage/:username/:title" component={SendMessage} />
    <Route path="/createmessage/:username" component={SendMessage} />
    <Route path="/createmessage/" component={SendMessage} />
    <Route path="/profile/me/saved/" component={Saved} />
    <Route path="/r/:subreddit_name/submit/:type" component={SubmitPost} />
    <Route path="/r/:subreddit/comments/:post" component={Post} />
    <Route path="/r/:subreddit/post/:post/:filter" component={Post} />
    <Route path="/r/:subreddit/post/:post" component={Post} />
    <Route path="/r/:subreddit/:filter/:period" component={Subreddit} />
    <Route path="/r/:subreddit/:filter" component={Subreddit} />
    <Route path="/r/:subreddit" component={Subreddit} />
    <Route path="/profile/:username" component={Profile} />
    <Route path="/submit/:type" component={SubmitPost} />
    <Route path="/filter" component={Filter} />
    <Route path="/messages/:name/:title" component={Messaging} />
    <Route path="/messages/:name" component={Messaging} />
    <Route path="/:filter/:period" component={Subreddit} />
    <Route path="/:filter" component={Subreddit} />
  </Switch>
);
