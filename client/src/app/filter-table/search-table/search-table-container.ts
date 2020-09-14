import {sortActionsGenerators} from "../redux/actions/sort/sort";
import {tableActionsGenerators} from "../redux/actions/table/table";
import {connect} from "react-redux";
import SearchTable from "./search-table";
import {FilterTableDefaultState} from "../redux/states/root-states";

function mapDispatchToProps(dispatch: any) {
  return {
    sortUpdater: (internalName: string, selected: string) => {
      dispatch(sortActionsGenerators.updateSort(internalName, selected))
    },
    toggleDense: () => {
      dispatch(tableActionsGenerators.toggleDense())
    },
    changePage: (page: string) => {
      dispatch(tableActionsGenerators.changePageAndRefreshData(page))
    },
    fetchData: () => {
      dispatch(tableActionsGenerators.fetchData())
    }
  }
}

function mapStateToProps(state: FilterTableDefaultState) {
  return {
    tableState: state.table,
    sortState: state.sort
  }
}

const SearchTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchTable);

export default SearchTableContainer
