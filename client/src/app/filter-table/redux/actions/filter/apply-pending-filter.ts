import {filterActions} from "./filter";
import {cloneDeep} from 'lodash'
import checkIfFilterValidationErrorExists from "./utils/check-if-filter-validation-error-exists";
import {tableActionsGenerators} from "../table/table";
import {FilterTableDefaultState} from "../../states/root-states";


const applyPendingFilter = () => {
  return (dispatch: any, getStore: () => FilterTableDefaultState) => {
    const store = getStore();
    const prevFilterArray = store.filter.filter;
    // do not proceed if validation error exists
    if (checkIfFilterValidationErrorExists(prevFilterArray)) {
      return
    }

    // proceed if clear of validation error
    const updatedFilterArray = prevFilterArray.map(obj => {
      return Object.assign(
        {},
        obj,
        {active: cloneDeep(obj.pending)},
      )
    });

    // check if the new active filters is the same as the original filters
    // bad design
    let isResettable = false;
    for (let i=0; i<updatedFilterArray.length; i++) {
      const currentFilter = updatedFilterArray[i];
      const original = currentFilter.original;
      const active = currentFilter.active;
      const hash: {[key: string]: boolean} = {};

      original.forEach(obj => hash[obj.internalName] = false);
      active.forEach(obj => hash[obj.internalName] = true);
      isResettable = Object.values(hash).filter(value => !value).length !== 0;

      if (isResettable) break;
    }

    dispatch({
      type: filterActions.FILTER_SET_FILTER_STATE,
      newFilterState: Object.assign(
        {},
        getStore().filter,
        {
          filter: updatedFilterArray,
          isPendingApplicable: false,
          isResettable
        }
      )
    });

    // need reset page when new filter is applied
    dispatch(tableActionsGenerators.changePageAndRefreshData(1));
  }
};

export default applyPendingFilter
