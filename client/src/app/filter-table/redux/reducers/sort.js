import filterTableDefaultState from "../states/root-states";
import {sortActions} from "../actions/sort/sort";

function sort(state = filterTableDefaultState.sort, actions) {
  switch (actions.type) {
    case sortActions.SORT_UPDATE_SORT:
      return actions.newSortState;
    default:
      return state
  }
}

export default sort
