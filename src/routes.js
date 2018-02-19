import React from "react";
import { Switch, Route } from "react-router-dom";

//IMPORT COMPNENTS
// import Subreddit from "./components/Subreddit/Subreddit";
import Frontpage from "./components/Frontpage/Frontpage";
import Post from "./components/Post/Post";
import Messaging from "./components/Messaging/Messaging";
import Bruno from "./components/Bruno/Bruno";
import Jordan from "./components/Jordan/Jordan";

export default (
  <Switch>
    <Route exact path="/" component={Frontpage} />
    {/* <Route path="/r/:subreddit" component={Subreddit} /> */}
    <Route path="/r/:subreddit/:post" component={Post} />
    <Route path="/messages" component={Messaging} />
    <Route path="/Bruno" component={Bruno} />
    <Route path="/Jordan" component={Jordan} />
  </Switch>
);
