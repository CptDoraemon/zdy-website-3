import {filterActions} from "./filter";
import {cloneDeep} from 'lodash'
import {tableActionsGenerators} from "../table/table";

const resetFilter = () => {
  return (dispatch, getStore) => {
    const prevFilterArray = getStore().filter.filter;

    const updatedFilterArray = prevFilterArray.map(obj => {
      return Object.assign(
        {},
        obj,
        {
          active: cloneDeep(obj.original),
          pending: cloneDeep(obj.original),
          validationMessage: ''
        },
      )
    });

    dispatch({
      type: filterActions.FILTER_SET_FILTER_STATE,
      newFilterState: Object.assign(
        {},
        getStore().filter,
        {
          filter: updatedFilterArray,
          isPendingApplicable: false,
          isResettable: false
        }
      )
    });

    // need reset page when new filter is applied
    dispatch(tableActionsGenerators.changePageAndRefreshData(1));
  }
};

export default resetFilter
