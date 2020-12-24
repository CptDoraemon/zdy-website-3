import {sortActions} from "./sort";
import {OptionObject} from "../../states/sort";

const initSort = (sorts: OptionObject[]) => {
  return {
    type: sortActions.SORT_UPDATE_SORT,
    newSortState: sorts.slice()
  }
};

export default initSort
