import defaultStates from "../states/default-states";
import {testActions} from "../actions/test";

function test(state = defaultStates.test, actions) {
  switch (actions.type) {
    case testActions.TEST_UPDATE_NAME:
      return Object.assign(
        {},
        defaultStates.test,
        {name: actions.name}
      );

    default:
      return state
  }
}

export default test
