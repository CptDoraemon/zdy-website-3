import {tableActions} from "./table";
import urls from "../../../services/urls";
import axios from "axios";
import {FilterTypes} from "../../states/filter";
import {TableData} from "../../states/table";
import {FilterTableDefaultState} from "../../states/root-states";
import {Dispatch} from "redux";

export const startFetchData = () => {
  return {
    type: tableActions.TABLE_START_FETCH_DATA
  }
};

const fetchDataSucceeded = (tableData: TableData, currentPage: number, totalPages: number, totalRows: number) => {
  return {
    type: tableActions.TABLE_FETCH_DATA_SUCCEEDED,
    tableData,
    currentPage,
    totalPages,
    totalRows,
  }
};

export const fetchDataFailed = (message: string) => {
  return {
    type: tableActions.TABLE_FETCH_DATA_FAILED,
    message
  }
};

const getRequestUrl = (store: FilterTableDefaultState) => {
  const urlBase = urls.tableData;

  const sort = store.sort.map((cur) => {
    const key = cur.title.internalName;
    const value = cur.selected;

    return `${key}=${value}`;
  });

  const filter = store.filter.filter.map((cur) => {
    const key = cur.internalName;
    let value;

    if (cur.type === FilterTypes.range) {
      value = `${cur.active[0].internalName},${cur.active[1].internalName}`
    } else if (cur.type === FilterTypes.single) {
      value = `${cur.active[0].internalName}`
    } else if (cur.type === FilterTypes.multiple) {
      const selected = cur.active.map(obj => encodeURIComponent(obj.internalName));
      value = selected.length > 1 ?
        selected.join(',') :
        `${selected[0]}`;
    } else if (cur.type === FilterTypes.multipleTextarea) {
      console.log(cur.active);
      const selected = cur.active.map(obj => encodeURIComponent((obj.internalName).trim()));
      value = selected.length > 1 ?
        selected.join(',') :
        `${selected[0]}`;
    }

    // remove the query with empty value like ?key=
    return value === '' ? '' : `${key}=${value}`;
  })
    .filter(value => value !== '');

  const page = [`page=${store.table.currentPage}`];

  const queries = [...sort, ...filter, ...page].join('&');
  console.log(queries);
  return `${urlBase}?${queries}`
};

const fetchData = () => {
  return async (dispatch: Dispatch, getStore: () => FilterTableDefaultState) => {
    try {
      const store = getStore();
      if (store.table.loading) return;

      dispatch(startFetchData());

      const url = getRequestUrl(store);
      const res = await axios.get(url);

      if (res.status === 200) {
        const json = res.data.data;
        dispatch(fetchDataSucceeded(json.tableData, json.currentPage, json.totalPages, json.totalRows));
      } else {
        dispatch(fetchDataFailed('Server Error'));
      }
    } catch (e) {
      dispatch(fetchDataFailed('Server Error'));
    }
  }
};

export default fetchData
