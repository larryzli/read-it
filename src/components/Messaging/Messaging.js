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
        //fire axios.get() on messages endpoint 
    };

    backAction = () => {
        this.props.history.goBack();
    };

    componentDidMount() {
        //GET USER MESSAGES
        // axios.get()

    }


    render() {

        const message = [
            <MessageCard
                date={"test"}
                subject={"Subject"}
                body={"Don't test me bro!"}
                author={"SpaghetToucher123"}
                key={0}
            />,
            <MessageCard
                date={"test"}
                subject={"Subject"}
                body={"Don't test me bro!"}
                author={"SpaghetToucher123"}
                key={1}
            />,
            <MessageCard
                date={"test"}
                subject={"Subject"}
                body={"Don't test me bro!"}
                author={"SpaghetToucher123"}
                key={2}
            />]
        console.log(this.props.history)
        return (
            <div>
                <MessageNavigation
                    filterName={this.state.filter}
                    refreshAction={this.refreshAction}
                    backAction={this.backAction}
                />
                <div className="posts">
                    {message}
                </div>
            </div>
        )
    }
}
export default Messaging