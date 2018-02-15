import React, { Component } from 'react';


//Import Components
import MessageNavigation from '../Navigation/MessageNavigation';
import MessageCard from '../MessageCard/MessageCard';

class Messaging extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: "My Messages",
            messages: []
        };
    }

    refreshAction = () => {

    };

    backAction = () => {

    };

    componentDidMount() {
        //GET USER MESSAGES
        // axios.get()

    }


    render() {

        const message = [<MessageCard
            date={"test"}
            subject={"test"}
            body={"Don't test me bro!"}
            author={"SpaghetToucher123"}
        />,
        <MessageCard
            date={"test"}
            subject={"test"}
            body={"Don't test me bro!"}
            author={"SpaghetToucher123"}
        />,
        <MessageCard
            date={"test"}
            subject={"test"}
            body={"Don't test me bro!"}
            author={"SpaghetToucher123"}
        />]
        return (
            <div>
                <MessageNavigation
                    filterName={this.state.filter}
                    refreshAction={this.refreshAction}
                    backAction={this.backAction}
                />
                <div className=""> Messaging Component</div>
                <div className="posts">
                    {message}
                </div>
            </div>
        )
    }
}
export default Messaging