import * as React from "react";
import {connect} from "react-redux";
import FiltersGroupContainer from "./filter/filters-group-container";
import SearchTableContainer from "./search-table/search-table-container";
import {FilterTableDefaultState} from "../../redux/states/root-states";
import {useEffect} from "react";
import {
  FilterInitializers,
} from "../../redux/actions/filter/init-filter";
import {OptionObject} from "../../redux/states/sort";
import {tableActionsGenerators} from "../../redux/actions/table/table";
import {Loading} from "./loader-wrapper/loader-utils-pages";
import BasicInfo from "./basic-info/basic-info";
import Examples from "./examples/examples";

interface FilterTableProps {
  title: string,
  filters: Array<FilterInitializers>,
  sorts: OptionObject[],
  isStateInitialized: boolean,
  initTable: (
    filters: Array<FilterInitializers>,
    sorts: OptionObject[]
  ) => void
}

const InternalFilterTable: React.FC<FilterTableProps> = (
  {
    title,
    filters,
    sorts,
    isStateInitialized,
    initTable
  }) => {

  useEffect(() => {
    if (!isStateInitialized) {
      initTable(filters, sorts)
    }
  }, []);

  return (
    isStateInitialized ?
      <>
        {/*@ts-ignore*/}
        <FiltersGroupContainer />
        <BasicInfo/>
        <Examples/>
        <SearchTableContainer title={title}/>
      </> :
      <Loading/>
  )
};

function mapDispatchToProps(dispatch: any) {
  return {
    initTable: (
      filters: Array<FilterInitializers>,
      sorts: OptionObject[]
    ) => {
      dispatch(tableActionsGenerators.initTable(filters, sorts))
    }
  }
}

function mapStateToProps(state: FilterTableDefaultState) {
  return {
    isStateInitialized: state.isStateInitialized
  }
}

const FilterTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalFilterTable);

export default FilterTable

