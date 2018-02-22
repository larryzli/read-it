import React, { Component } from 'react';
import {connect} from "react-redux"
import axios from 'axios'

//IMPORT COMPONENTS
import PostNavigation from '../../components/Navigation/PostNavigation'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "test",
            filter: "hot",
            showSortDrawer: false
        }
        this.goHome = this.goHome.bind(this);
    }

    componentDidMount(){
        
    }

    goHome() {
        this.props.history.goBack();
      }
      
    toggleSort = () => {
        this.setState({ showSortDrawer: !this.state.showSortDrawer });
      };
    render() {
        return
        (
            <div>
                <PostNavigation
                    title={this.state.username}
                    filterName={this.state.filter}
                    goHome={this.goHome}
                    sortAction={this.toggleSort}

                />
                PROFILE PAGE
            </div>

        )
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(Profile)