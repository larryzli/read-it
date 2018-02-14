import React from "react";
import { Switch, Route } from "react-router-dom";
import Subreddit from "./components/Subreddit/Subreddit";
import Post from "./components/Post/Post";

export default (
    <Switch>
        <Route exact path="/" component={Subreddit} />
        {/* <Route path="/r/:subreddit" component={Subreddit} /> */}
        <Route path="/r/:subreddit/:post" component={Post} />
    </Switch>
);
