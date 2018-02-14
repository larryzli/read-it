import React, { Component } from "react";
import axios from "axios";
// import './Comment.css';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReplies: true,
            moreComments: []
        };
    }

    revealReplies = () => {
        this.setState({ showReplies: !this.state.showReplies });
    };
    loadMore = (postID, children) => {
        children = children.join(",");
        console.log(children);
        axios
            .get(`/api/post/comments/more/${postID}/${children}`)
            .then(response => {
                console.log(response);
                this.setState({ moreComments: response.data.json.data.things });
            });
    };

    render() {
        console.log(this.props);
        let replies;
        if (this.props.commentData.replies) {
            replies = this.props.commentData.replies.data.children.map(
                (reply, index) => {
                    if (reply.kind !== "more") {
                        return (
                            <Comment
                                postID={this.props.postID}
                                key={index}
                                commentData={reply.data}
                            />
                        );
                    } else {
                        if (reply.data.children[0]) {
                            return (
                                <button
                                    key={index}
                                    onClick={e =>
                                        this.loadMore(
                                            this.props.postID,
                                            reply.data.children
                                        )
                                    }
                                >
                                    LOAD MORE
                                </button>
                            );
                        } else {
                            return null;
                        }
                    }
                }
            );
        }

        let moreComments = this.state.moreComments.map((comment, index) => {
            return (
                <Comment
                    postID={this.props.postID}
                    key={index}
                    commentData={comment.data}
                />
            );
        });

        return (
            <div>
                <div>
                    {this.props.commentData.depth} {this.props.commentData.body}
                    <br />
                    {replies ? (
                        <button
                            style={{ backgroundColor: "red" }}
                            onClick={e => this.revealReplies()}
                        >
                            COLLAPSE
                        </button>
                    ) : null}
                    <br />
                    {this.state.showReplies && replies ? replies : null}
                    {moreComments}
                    {/* {replies} */}
                </div>
            </div>
        );
    }
}

export default Comment;
