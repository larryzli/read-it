import React, { Component } from 'react';

//IMPORT COMPONENTS
import Navigation from './Navigation'
//IMPORT ICONS
import backArrowIcon from '../../icons/ic_arrow_back_white_24px.svg'
import sendArrowIcon from '../../icons/ic_send_white_24px.svg'


const SubmitNavigation = ({ backAction, sendAction }) => {
    const rightIcons = [sendArrowIcon]
    return (
        <Navigation
            title="Submit Post"
            leftIcon={backArrowIcon}
            leftAction={backAction}
            dropdown={false}
            rightIcons={rightIcons}
            rightActions={sendAction}
        />


    );
};
export default SubmitNavigation