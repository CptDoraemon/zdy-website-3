interface TableRow {
  [key: string]: any
}

export type TableData = TableRow[]

export interface DefaultTableState {
  data: null | TableData,
  currentPage: number,
  totalPages: number,
  totalRows: number,
  dense: boolean,
  loading: boolean,
  error: boolean,
  errorMessage: string
}

const defaultTableState: DefaultTableState = {
  data: null,
  currentPage: 1,
  totalPages: 0,
  totalRows: 0,
  dense: false,
  loading: false,
  error: false,
  errorMessage: ''
};

export default defaultTableState
