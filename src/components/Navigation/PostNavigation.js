// IMPORT DEPENDENCIES
import React from "react";
// IMPORT COMPONENTS
import Navigation from "./Navigation";
// IMPORT ICONS
import backIcon from "../../icons/ic_arrow_back_white_24px.svg";
import sortIcon from "../../icons/ic_sort_white_24px.svg";
// import moreIcon from "../../icons/ic_more_vert_white_24px.svg";
// import searchIcon from "../../icons/ic_search_white_24px.svg";

// COMPONENT
const PostNavigation = ({
  filterName,
  title,
  goHome,
  sortAction
  // moreAction
}) => {
  const rightIcons = [sortIcon];
  const rightActions = [sortAction];
  return (
    <Navigation
      title={title}
      filterName={filterName}
      leftIcon={backIcon}
      rightIcons={rightIcons}
      dropdown={false}
      leftAction={goHome}
      rightActions={rightActions}
    />
  );
};

// EXPORT COMPONENT
export default PostNavigation;
