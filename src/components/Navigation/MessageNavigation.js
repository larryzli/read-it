import React from "react";
//IMORT COMPONENTS
import Navigation from "./Navigation";
//IMPORT ICONS
import sortIcon from "../../icons/ic_sort_white_24px.svg";
import backArrowIcon from "../../icons/ic_arrow_back_white_24px.svg";

const MessageNavigation = ({ filterName, backAction, sortAction }) => {
  const rightIcons = [sortIcon];
  const rightActions = [sortAction];
  return (
    <Navigation
      title="Messaging"
      filterName={filterName}
      leftIcon={backArrowIcon}
      leftAction={backAction}
      dropdown={false}
      rightIcons={rightIcons}
      rightActions={rightActions}
    />
  );
};

export default MessageNavigation;
