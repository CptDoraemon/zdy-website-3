import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import {FilterTableDefaultState} from "../states/root-states";

type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  FilterTableDefaultState,
  unknown,
  Action<string>
>

export const basicInfoActions = {
  'BASIC_INFO_UPDATE_VALUE': 'BASIC_INFO_UPDATE_VALUE',
  'BASIC_INFO_RESET_DATA': 'BASIC_INFO_RESET_DATA',
  'BASIC_INFO_TOGGLE_DROPDOWN': 'BASIC_INFO_TOGGLE_DROPDOWN'
};

const updateValue = (key: string, value: string): Thunk => {
  return (dispatch) => {
    dispatch({
      type: basicInfoActions.BASIC_INFO_UPDATE_VALUE,
      key,
      value
    })
  };
};

const toggleDropdown = (): Thunk => {
  return (dispatch) => {
    dispatch({
      type: basicInfoActions.BASIC_INFO_TOGGLE_DROPDOWN,
    })
  };
};

const resetData = (): Thunk => {
  return (dispatch) => {
    dispatch({
      type: basicInfoActions.BASIC_INFO_RESET_DATA,
    })
  };
};

export const basicInfoActionsGenerators = {
  updateValue,
  toggleDropdown,
  resetData,
};
