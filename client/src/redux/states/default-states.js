import { cloneDeep } from 'lodash';
import testState from "./test";

const defaultStates = {
  test: cloneDeep(testState)
};

export default defaultStates
