import React, { Component } from 'react';
import { connect } from "react-redux"
import axios from 'axios'

import loading from '../../icons/loading/loading-cylon-red.svg'

//IMPORT COMPONENTS
import PostNavigation from '../../components/Navigation/PostNavigation'

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
        const loader = (
            <div className="loader-wrapper" key={"loader"}>
                <img src={loading} className="loader-svg" alt="loading" />
            </div>
        );
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
                    PROFILE PAGE
                
            </div>

        )
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(Profile)