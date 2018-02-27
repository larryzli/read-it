import React from "react";
//IMORT COMPONENTS
import Navigation from "./Navigation";
//IMPORT ICONS
import backArrowIcon from "../../icons/ic_arrow_back_white_24px.svg";

const FilterNavigation = ({ backAction }) => {
  const rightIcons = [];
  const rightActions = [];
  return (
    <Navigation
      title="Domain Filters"
      filterName="List"
      leftIcon={backArrowIcon}
      leftAction={backAction}
      dropdown={false}
      rightIcons={rightIcons}
      rightActions={rightActions}
    />
  );
};

export default FilterNavigation;
