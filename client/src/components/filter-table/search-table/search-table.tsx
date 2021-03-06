import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useMemo, useState} from "react";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Pagination from "@material-ui/lab/Pagination";
import cloneDeep from 'lodash/cloneDeep'
import SearchTableControls from "./search-table-controls";
import SearchTableHead from "./search-table-head";
import SearchTableToolbar from "./search-table-toolbar";
import {DefaultTableState} from "../../../redux/states/table";
import {DefaultSortState} from "../../../redux/states/sort";
import LoaderWrapper from "../loader-wrapper/loader-wrapper";

export const tableHeaderMap = {
  'id': '序号',
  'Gene': '基因',
  'Alterations': '突变',
  'Cancer_Type': '肿瘤类型',
  'Drugs': '靶向药物',
  'Level': '药物级别'
};

export const tableHeaderValues = Object.values(tableHeaderMap);
export const tableHeaderKeys = Object.keys(tableHeaderMap);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(4, 0)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: theme.breakpoints.values['md']
  },
  moreInfo: {
    '&:hover': {
      color: theme.palette.primary.main
    },
    '&:link': {
      textDecoration: 'underline'
    },
    '&:visited': {
      textDecoration: 'underline'
    }
  },
  pagination: {
    padding: theme.spacing(2, 1)
  }
}));

interface InnerSearchTableProps {
  tableState: DefaultTableState,
  sortState: DefaultSortState,
  title: string,
  sortUpdater: (internalName: string, selected: string) => void,
  toggleDense: () => void,
  changePage: (page: string) => void,
}

type Selecteds = {[key: string]: boolean}

const InnerSearchTable = React.forwardRef<HTMLDivElement, InnerSearchTableProps>((
  {
    tableState,
    sortState,
    title,
    sortUpdater,
    toggleDense,
    changePage,
  }, ref) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<Selecteds>({});

  const data = tableState.data || [];
  const dense = tableState.dense;
  const totalPages = tableState.totalPages;
  const currentPage = tableState.currentPage;
  const totalRows = tableState.totalRows;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds: Selecteds = {};
      data.forEach(row => {
        const key = `${row.id}`;
        newSelecteds[key] = true
      });
      setSelected(newSelecteds);
    } else {
      setSelected({});
    }
  };

  const handleClick = (id: string) => {
    const newSelecteds = cloneDeep(selected);
    const key = id.toString();
    newSelecteds[key] = !newSelecteds[key];
    setSelected(newSelecteds);
  };

  const handleChangePage = (e: any, value: number) => {
    changePage(value.toString());
  };

  const isSelected = (id: string) => !(selected[id] === undefined || selected[id] === false);
  const selectedIDs = [];
  for (let key in selected) {
    if (selected.hasOwnProperty(key) && selected[key] !== undefined && selected[key] !== false) {
      selectedIDs.push(key)
    }
  }

  return (
    <div className={classes.root} ref={ref}>
      <Paper className={classes.paper} elevation={0}>
        <SearchTableToolbar selected={selectedIDs} title={title} totalRows={totalRows}/>
        <SearchTableControls sort={sortState} sortUpdater={sortUpdater} dense={dense} toggleDense={toggleDense}/>
        <TableContainer>
          <Table
            stickyHeader
            size={dense ? 'small' : 'medium'}
            aria-label="data table"
            className={classes.table}
          >
            <SearchTableHead
              header={tableHeaderValues}
              numSelected={selectedIDs.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.length}
            />
            <TableBody>
              {
                data.map((row, i) => {
                  const id = row.id;
                  const isItemSelected = isSelected(id);

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={i}
                    >
                      {
                        tableHeaderKeys.map((key, i) => (
                          <TableCell align="left" key={i}>{row[key]}</TableCell>
                        ))
                      }
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} color={'primary'} variant="outlined" shape="rounded" className={classes.pagination}/>
      </Paper>
    </div>
  );
});

interface SearchTableProps {
  tableState: DefaultTableState,
  sortState: DefaultSortState,
  title: string,
  sortUpdater: (internalName: string, selected: string) => void,
  toggleDense: () => void,
  changePage: (page: string) => void,
  fetchData: () => void
}

const SearchTable: React.FC<SearchTableProps> = (
  {
    tableState,
    sortState,
    title,
    sortUpdater,
    toggleDense,
    changePage,
    fetchData
  }) => {
  // fetch data on mounted
  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    if (!tableState.data) {
      fetchData()
    }
    setPageLoaded(true)
  }, []);

  const props = {
    tableState,
    sortState,
    title,
    sortUpdater,
    toggleDense,
    changePage,
  };

  return (
    <LoaderWrapper
      loading={tableState.loading || !pageLoaded}
      error={tableState.error}
      errorMessage={tableState.errorMessage}
      noResultFound={!tableState.data || !tableState.data.length}
      dataLoadedComponent={(ref) => <InnerSearchTable {...props} ref={ref} />}
    />
  )
};

export default SearchTable
