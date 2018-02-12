import React, { Component } from "react";
import HomeNavigation from "../Navigation/HomeNavigation";
// import './Home.css';
import PostCard from "../PostCard/PostCard";

class Home extends Component {
    componentDidMount() {
        // get posts
    }
    render() {
        // const posts = [].map(post => {});
        return (
            <div>
                <HomeNavigation />
                <div className="posts">
                    {
                        //posts
                    }
                    <PostCard />
                    <PostCard />
                </div>
            </div>
        );
    }
}

export default Home;
