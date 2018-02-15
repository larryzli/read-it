import React from "react";
import { Switch, Route } from "react-router-dom";

//IMPORT COMPNENTS
import Subreddit from "./components/Subreddit/Subreddit";
import Post from "./components/Post/Post";
import Messaging from "./components/Messaging/Messaging";

export default (
    <Switch>
        <Route exact path="/" component={Subreddit} />
        {/* <Route path="/r/:subreddit" component={Subreddit} /> */}
        <Route path="/r/:subreddit/:post" component={Post} />
        <Route path="/messaging" component={Messaging} />
    </Switch>
);
