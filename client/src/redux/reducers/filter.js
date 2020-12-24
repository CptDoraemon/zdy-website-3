import filterTableDefaultState from "../states/root-states";
import {filterActions} from "../actions/filter/filter";
import {cloneDeep} from "lodash";

function filter(state = filterTableDefaultState.filter, actions) {
  switch (actions.type) {
    case filterActions.FILTER_SET_FILTER_STATE:
      return cloneDeep(actions.newFilterState);
    case filterActions.FILTER_TOGGLE_DROPDOWN:
      return Object.assign(
        {},
        state,
        {
          dropdown: !state.dropdown,
        }
      );
    case filterActions.FILTER_INIT_FILTER:
      return Object.assign(
        {},
        state,
        {
          filter: cloneDeep(actions.filters),
        }
      );
    default:
      return state
  }
}

export default filter
