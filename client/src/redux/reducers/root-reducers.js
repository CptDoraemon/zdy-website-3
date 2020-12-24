import {combineReducers} from "redux";
import filter from "./filter";
import table from "./table";
import sort from "./sort";
import isStateInitialized from "./is-state-initialized";
import basicInfo from "./basic-info";

const filterTableRootReducers = combineReducers({
  filter,
  table,
  sort,
  isStateInitialized,
  basicInfo
});

export default filterTableRootReducers;
