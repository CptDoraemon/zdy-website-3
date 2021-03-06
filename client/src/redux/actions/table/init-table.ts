import {Dispatch} from "redux";
import {FilterTableDefaultState} from "../../states/root-states";
import axios from "axios";
import {fetchDataFailed} from "./fetch-data";
import urls from "../../../services/urls";
import {
  FilterInitializers, MultipleFilterTextareaInitializer
} from "../filter/init-filter";
import {OptionObject} from "../../states/sort";
import {filterActionsGenerators} from "../filter/filter";
import {sortActionsGenerators} from "../sort/sort";
import stateInitialized from "../is-state-initialized";
import {FilterTypes} from "../../states/filter";

const initTable = (
  filters: Array<FilterInitializers>,
  sorts: OptionObject[]
) => {
  return async (dispatch: Dispatch, getStore: () => FilterTableDefaultState) => {
    try {
      const columnsRes = await axios.get(urls.tableColumns);
      // const geneSymbolOptionsRes = await axios.get(urls.tableColumnOptions + '?column=Gene_symbol');

      // if (columnsRes.status === 200 && geneSymbolOptionsRes.status === 200) {
      if (columnsRes.status === 200) {
        const columns: string[] = columnsRes.data.data.columns;
        // const geneSymbolOptions: string[] = geneSymbolOptionsRes.data.data.options;

        const geneSymbolFilter: MultipleFilterTextareaInitializer = {
          type: FilterTypes.multipleTextarea,
          choices: [{
            internalName: '',
            displayName: ''
          }],
          displayName: 'Gene Symbol',
          internalName: 'Gene_symbol',
          original: [{
            internalName: '',
            displayName: ''
          }]
        };

        const sortByOptions: OptionObject = {
          items: columns.map(str => ({
            displayName: str,
            internalName: str,
          })),
          title: {internalName: 'sortBy', displayName: '排序'},
          selected: columns[0]
        };

        dispatch(filterActionsGenerators.initFilter([geneSymbolFilter, ...filters]));
        dispatch(sortActionsGenerators.initSort([sortByOptions, ...sorts]));

        // prefill filter
        // @ts-ignore
        dispatch(filterActionsGenerators.updatePendingFilterWithValueArray('Gene_symbol', ['EGFR', 'BRAF']));
        // @ts-ignore
        dispatch(filterActionsGenerators.applyPendingFilter());

        dispatch(stateInitialized())
      } else {
        dispatch(fetchDataFailed('Server Error'));
      }
    } catch (e) {
      console.log(e);
      dispatch(fetchDataFailed('Server Error'));
    }
  }
};

export default initTable
