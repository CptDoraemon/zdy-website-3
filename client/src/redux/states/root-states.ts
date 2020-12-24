import { cloneDeep } from 'lodash';
import defaultFilterState, {DefaultFilterState} from "./filter";
import defaultSortState, {DefaultSortState} from "./sort";
import defaultTableState, {DefaultTableState} from "./table";

export interface FilterTableDefaultState {
  filter: DefaultFilterState,
  sort: DefaultSortState,
  table: DefaultTableState,
  isStateInitialized: boolean
}

const filterTableDefaultState: FilterTableDefaultState = {
  filter: cloneDeep(defaultFilterState),
  sort: cloneDeep(defaultSortState),
  table: cloneDeep(defaultTableState),
  isStateInitialized: false
};

export default filterTableDefaultState
