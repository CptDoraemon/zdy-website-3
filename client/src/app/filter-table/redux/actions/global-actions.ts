import {FilterTableDefaultState} from "../states/root-states";
import {filterActionsGenerators} from "./filter/filter";
import {MultipleFilterInitializer, RangeFilterInitializer, SingleFilterInitializer} from "./filter/init-filter";
import {sortActionsGenerators} from "./sort/sort";
import {OptionObject} from "../states/sort";
import stateInitialized from "./is-state-initialized";

const initState = (
  filters: Array<RangeFilterInitializer | MultipleFilterInitializer | SingleFilterInitializer>,
  sorts: OptionObject[]
) => {
  return (dispatch: any, getState: () => FilterTableDefaultState) => {
    dispatch(filterActionsGenerators.initFilter(filters));
    dispatch(sortActionsGenerators.initSort(sorts));
    dispatch(stateInitialized())
  }
};

export const globalActionsGenerators = {
  initState
};
