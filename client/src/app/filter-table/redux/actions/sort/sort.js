import {cloneDeep} from "lodash";
import {tableActionsGenerators} from "../table/table";
import initSort from "./init-sort";

export const sortActions = {
  'SORT_UPDATE_SORT': 'SORT_UPDATE_SORT',
};

/**
 * @param {string} internalName
 * @param {string} selected
 */
const updateSort = (internalName, selected) => {
  return (dispatch, getState) => {
    const newSortState = cloneDeep(getState().sort);
    for (let i=0; i<newSortState.length; i++) {
      if (newSortState[i].title.internalName === internalName) {
        newSortState[i].selected = selected;
        break;
      }
    }
    dispatch({
      type: sortActions['SORT_UPDATE_SORT'],
      newSortState: newSortState
    });

    // need reset page when new sort is applied
    dispatch(tableActionsGenerators.changePageAndRefreshData(1));
  };
};

export const sortActionsGenerators = {
  updateSort,
  initSort
};
