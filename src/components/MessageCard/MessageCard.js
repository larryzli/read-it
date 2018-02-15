//IMPORT DEPENDENCIES
import React from 'react';
//IMPORT ICONS
import moreIcon from "../../icons/ic_more_vert_white_24px.svg"



//MESSAGE CARD VALUES
const MessageCard = ({
    date = "",
    subject = "",
    body = "",
    author = ""

}) => {
    //MESSAGE CARD 
    return (

        <div className="post-container">
            <div className="post-title">{subject}</div>
            <div className="post-subreddit">{author}</div>
            <div className="">{body}</div>
            <img
                className="post-store-container"
                src={moreIcon}
                alt="more icon"
            />
        </div>
    )
}


export default MessageCard