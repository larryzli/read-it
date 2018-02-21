import React from "react";
import { Switch, Route } from "react-router-dom";

//IMPORT COMPNENTS
// import Subreddit from "./components/Subreddit/Subreddit";
import Frontpage from "./components/Frontpage/Frontpage";
import Post from "./components/Post/Post";
import Messaging from "./components/Messaging/Messaging";
import Filter from "./components/Filter/Filter";
import SubmitPost from "./components/SubmitPost/SubmitPost";

export default (
  <Switch>
    <Route exact path="/" component={Frontpage} />
    {/* <Route path="/r/:subreddit" component={Subreddit} /> */}
    <Route path="/r/:subreddit_name/submit" component={SubmitPost} />
    <Route path="/r/:subreddit/:post" component={Post} />
    <Route path="/messages" component={Messaging} />
    <Route path="/filter" component={Filter} />
  </Switch>
);
