import updatePendingFilter, {updatePendingFilterWithValueArray} from "./update-pending-filter";
import applyPendingFilter from "./apply-pending-filter";
import resetFilter from "./reset-filter";
import initFilter from "./init-filter";

export const filterActions = {
  'FILTER_SET_FILTER_STATE': 'FILTER_SET_FILTER_STATE',
  'FILTER_TOGGLE_DROPDOWN': 'FILTER_TOGGLE_DROPDOWN',
  'FILTER_INIT_FILTER': 'FILTER_INIT_FILTER',
};

const toggleDropdown = () => {
  return {
    type: filterActions['FILTER_TOGGLE_DROPDOWN']
  }
};

export const filterActionsGenerators = {
  updatePendingFilter,
  updatePendingFilterWithValueArray,
  toggleDropdown,
  applyPendingFilter,
  resetFilter,
  initFilter
};
