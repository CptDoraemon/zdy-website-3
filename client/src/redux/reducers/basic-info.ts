import filterTableDefaultState from "../states/root-states";
import cloneDeep from "lodash/cloneDeep";
import {basicInfoActions} from "../actions/basic-info";

function basicInfo(state = filterTableDefaultState.basicInfo, actions: any) {
  const newState = cloneDeep(state);

  switch (actions.type) {
    case basicInfoActions.BASIC_INFO_UPDATE_VALUE:
      // @ts-ignore
      newState.data[actions.key] = actions.value;
      return newState;
    case basicInfoActions.BASIC_INFO_TOGGLE_DROPDOWN:
      newState.isDropdown = !state.isDropdown;
      return newState;
    case basicInfoActions.BASIC_INFO_RESET_DATA:
      newState.data = cloneDeep(newState.defaultData);
      return newState;
    default:
      return state
  }
}

export default basicInfo
