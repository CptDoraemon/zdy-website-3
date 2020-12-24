import filterTableDefaultState from "../states/root-states";
import {tableActions} from "../actions/table/table";
import {DefaultTableState} from "../states/table";

function table(state = filterTableDefaultState.table, actions: any): DefaultTableState {
  switch (actions.type) {
    case tableActions.TABLE_TOGGLE_DENSE:
      return Object.assign(
        {},
        state,
        {dense: actions.dense}
      );
    case tableActions.TABLE_CHANGE_PAGE_AND_REFRESH_DATA:
      return Object.assign(
        {},
        state,
        {currentPage: actions.page}
      );
    case tableActions.TABLE_START_FETCH_DATA:
      return Object.assign(
        {},
        state,
        {
          loading: true,
          error: false,
          errorMessage: ''
        }
      );
    case tableActions.TABLE_FETCH_DATA_SUCCEEDED:
      return Object.assign(
        {},
        state,
        {
          data: actions.tableData,
          currentPage: actions.currentPage,
          totalPages: actions.totalPages,
          totalRows: actions.totalRows,
          loading: false
        }
      );
    case tableActions.TABLE_FETCH_DATA_FAILED:
      return Object.assign(
        {},
        state,
        {
          loading: false,
          error: true,
          errorMessage: actions.message,
        }
      );
    default:
      return state
  }
}

export default table
