import cloneDeep from 'lodash/cloneDeep';
import defaultFilterState, {DefaultFilterState} from "./filter";
import defaultSortState, {DefaultSortState} from "./sort";
import defaultTableState, {DefaultTableState} from "./table";
import defaultBasicInfoState, {DefaultBasicInfoState} from "./basic-info";

export interface FilterTableDefaultState {
  filter: DefaultFilterState,
  sort: DefaultSortState,
  table: DefaultTableState,
  isStateInitialized: boolean,
  basicInfo: DefaultBasicInfoState
}

const filterTableDefaultState: FilterTableDefaultState = {
  filter: cloneDeep(defaultFilterState),
  sort: cloneDeep(defaultSortState),
  table: cloneDeep(defaultTableState),
  isStateInitialized: false,
  basicInfo: cloneDeep(defaultBasicInfoState)
};

export default filterTableDefaultState
