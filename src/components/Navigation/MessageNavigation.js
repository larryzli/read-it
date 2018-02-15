import React from 'react';
//IMORT COMPONENTS
import Navigation from './Navigation';
//IMPORT ICONS
import refreshIcon from '../../icons/ic_refresh_white_24px.svg'
import backArrowIcon from '../../icons/ic_arrow_back_white_24px.svg'

const MessageNavigation = ({ filterName, backAction, refreshAction }) => {
    const rightIcons = [refreshIcon]
    return (
        <Navigation
            title="Messaging"
            filterName={filterName}
            leftIcon={backArrowIcon}
            leftActions={backAction}
            dropdown={true}
            rightIcons={rightIcons}
            rightActions={refreshAction}
        />

    );

};

export default MessageNavigation