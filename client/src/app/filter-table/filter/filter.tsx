import React from "react";
import FilterRange from "./filter-range";
import FilterSingle from "./filter-single";
import FilterMultiple from "./filter-multiple";
import {FilterState, FilterTypes} from "../redux/states/filter";
import FilterMultipleTextarea from "./filter-multiple-textarea";

interface FilterProps {
  filter: FilterState,
  updatePendingFilter: (filterInternalName: string, choiceInternalName: string, additionalKey?: string) => void,
  updatePendingFilterWithValueArray: (filterInternalName: string, value: string[]) => void
}

const Filter: React.FC<FilterProps> = ({filter, updatePendingFilter, updatePendingFilterWithValueArray}) => {
  const props = {filter, updatePendingFilter};
  switch (filter.type) {
    case FilterTypes.range:
      return <FilterRange {...props} />;
    case FilterTypes.single:
      return <FilterSingle {...props} />;
    case FilterTypes.multiple:
      return <FilterMultiple {...props} />;
    case FilterTypes.multipleTextarea:
      return <FilterMultipleTextarea filter={filter} updatePendingFilterWithValueArray={updatePendingFilterWithValueArray} />;
    default:
      return <>unknown filter</>
  }
};

export default Filter
