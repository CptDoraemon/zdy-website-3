import filterTableDefaultState from "../states/root-states";
import {isStateInitializedAction} from "../actions/is-state-initialized";

function isStateInitialized(state = filterTableDefaultState.isStateInitialized, actions: any) {
  switch (actions.type) {
    case isStateInitializedAction.IS_STATE_INITIALIZED_INITIALIZED:
      return true;
    default:
      return state
  }
}

export default isStateInitialized
