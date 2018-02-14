import React, { Component } from "react";
import axios from "axios";
import Comment from "../Comment/Comment";
// import './Post.css';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postData: {},
            comments: []
        };
    }
    componentDidMount() {
        const { post, subreddit } = this.props.match.params;
        axios.get(`/api/post/${subreddit}/${post}`).then(response => {
            this.setState({
                postData: response.data.post,
                comments: response.data.comments
            });
        });
    }
    render() {
        console.log(this.state);
        const comments = this.state.comments.map((comment, index) => {
            return (
                <Comment
                    postID={this.state.postData.post_id}
                    key={index}
                    commentData={comment}
                />
            );
        });
        return (
            <div>
                <div>{this.state.postData.post_title}</div>
                <div>{comments}</div>
            </div>
        );
    }
}

export default Post;
