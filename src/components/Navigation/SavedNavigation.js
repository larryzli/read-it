// IMPORT DEPENDENCIES
import React from "react";
// IMPORT COMPONENTS
import Navigation from "./Navigation";
// IMPORT ICONS
import backIcon from "../../icons/ic_arrow_back_white_24px.svg";

// import moreIcon from "../../icons/ic_more_vert_white_24px.svg";
// import searchIcon from "../../icons/ic_search_white_24px.svg";

// COMPONENT
const SavedNavigation = ({
  filterName,
  title,
  goHome,
  sortAction
  // moreAction
}) => {
    const rightIcons = [];
  return (
    <Navigation
      title={title || " "}
      filterName={filterName}
      leftIcon={backIcon}
      rightIcons={rightIcons}
      dropdown={false}
      leftAction={goHome}
      rightActions={null}
    />
  );
};

// EXPORT COMPONENT
export default SavedNavigation;
