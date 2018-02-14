// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
// IMPORT COMPONENTS
import HomeNavigation from "../Navigation/HomeNavigation";
import PostCard from "../PostCard/PostCard";
// IMPORT REDUX FUNCTIONS
import { pullHot } from "../../ducks/subredditReducer";

// COMPONENT
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: "HOT"
        };
    }
    componentDidMount() {
        // DEFAULT: PULL HOT POSTS
        this.props.pullHot();
    }
    render() {
        const posts = this.props.subreddit.posts.map((post, index) => {
            return (
                <PostCard
                    key={index}
                    title={post.post_title}
                    domain={post.domain}
                    subreddit={post.subreddit_title}
                    author={post.author}
                    thumbnail={post.post_thumbnail}
                    comments={post.num_comments}
                    score={post.score}
                    subredditID={post.subreddit_id}
                    created={moment(post.created_utc * 1000).fromNow()}
                    url={post.url}
                    over18={post.over_18}
                    postID={post.post_id}
                />
            );
        });
        return (
            <div>
                <HomeNavigation filterName={this.state.filter} />
                <div className="posts">{posts}</div>
            </div>
        );
    }
}

// CONNECT TO REDUX
const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps, { pullHot })(Home);
