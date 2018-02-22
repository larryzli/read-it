import React, { Component } from 'react';
import { connect } from "react-redux"
import axios from 'axios'
import moment from "moment";

import loading from '../../icons/loading/loading-cylon-red.svg'

//IMPORT COMPONENTS
import PostNavigation from '../../components/Navigation/PostNavigation'
import PostCard from "../PostCard/PostCard";

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            username: `${this.props.match.params.username}`,
            filter: "Overview",
            showSortDrawer: false,
            posts: [],
            created: "",
            commentKarma: 0,
            linkKarma: 0
        }
        this.goHome = this.goHome.bind(this);
    }

    componentDidMount() {
        axios
        .get(`/api/user/about?username=${this.props.match.params.username}`)
        .then(response => this.setState({
            posts: response.data.posts,
            created: response.data.created,
            linkKarma: response.data.linkKarma,
            commentKarma: response.data.commentKarma,
            loading: false

        })
        
    )

    }

    changeFilter = filterVal => {
        this.setState({
          filter: filterVal,
          loading: true
        });
    }
    goHome() {
        this.props.history.goBack();
    }

    toggleSort = () => {
        this.setState({ showSortDrawer: !this.state.showSortDrawer });
    };
    render(){
        console.log(this.state)
        // LOADER
        const loader = (
            <div className="loader-wrapper" key={"loader"}>
                <img src={loading} className="loader-svg" alt="loading" />
            </div>
        );
        // DRAWER
        const sortDrawer = (
            <div className="drawer-wrapper" onClick={e => this.toggleSort()}>
              <div className="drawer-container">
                <div className="drawer-item" onClick={e => this.changeFilter("hot")}>
                  Hot
                </div>
                <div className="drawer-item" onClick={e => this.changeFilter("new")}>
                  New
                </div>
                <div className="drawer-item" onClick={e => this.changeFilter("top")}>
                  Top
                </div>
                <div className="drawer-item" onClick={e => this.changeFilter("controversial")}>
                  Controversial
                </div>
              </div>
            </div>
          );
          //PROFILE COMMENTS AND POSTS
           const posts = [];
            this.state.posts.forEach((post, index) => {
                posts.push(
                    <PostCard
                      key={index}
                      title={post.data.title ? post.data.title : post.data.link_title }
                      domain={post.data.domain ? post.data.domain : post.data.subreddit }
                      subreddit={post.data.subreddit}
                      author={post.data.author}
                      thumbnail={post.data.thumbnail ? post.data.thumbnail : null}
                      comments={post.data.num_comments}
                      score={post.data.score}
                      subredditID={post.data.subreddit_id}
                      created={moment(post.data.created_utc * 1000).fromNow()}
                      url={post.data.url}
                      over18={post.data.over_18}
                      postID={post.data.id}
                      likes={post.data.likes}
                      saved={post.data.saved}
                      enableControls={this.props.enableControls}
                      hidden={post.data.hidden}
                      clicked={post.data.clicked}
                      visited={post.data.visited}
                      pinned={post.data.pinned}
                      archived={post.data.archived}
                      spoiler={post.data.spoiler}
                      locked={post.data.locked}
                      stickied={post.data.stickied}
                      edited={post.data.edited}
                      gilded={post.data.gilded}
                      isRedditMedia={post.data.is_reddit_media}
                      showSubredditControl={this.props.showSubredditControl}
                      type={post.kind}
                      link_id={post.data.link_id || ""}
                    />
                )
                }
                
        )
    
        return (
            <div className="profile-page">
                {this.state.showSortDrawer ? sortDrawer : null}
                <PostNavigation
                    title={this.state.username}
                    filterName={this.state.filter}
                    goHome={this.goHome}
                    sortAction={this.toggleSort}

                />
                {this.state.loading ? loader : null}
                <div>
                    {this.state.username}
                </div>
                <div>
                    Link Karma: {this.state.linkKarma}
                    <span/>
                    Comment Karma: {this.state.commentKarma}
                </div>
                <div className="posts">
                  {posts}
                </div>
                
                
            </div>

        )
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(Profile)