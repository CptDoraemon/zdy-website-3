import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useMemo, useState} from "react";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import cloneDeep from 'lodash/cloneDeep'
import SearchTableControls from "./search-table-controls";
import SearchTableHead from "./search-table-head";
import SearchTableToolbar from "./search-table-toolbar";
import routerUrls from "../../../router-urls";
import {DefaultTableState} from "../redux/states/table";
import {DefaultSortState} from "../redux/states/sort";
import LoaderWrapper from "../loader-wrapper/loader-wrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    width: '100%',
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

  const header = useMemo(() => {
    return Object.keys(data ? data[0] : {});
  }, [data]);

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
        <TableContainer className={classes.table}>
          <Table
            stickyHeader
            size={dense ? 'small' : 'medium'}
            aria-label="data table"
          >
            <SearchTableHead
              header={header}
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
                      // onClick={()=>handleClick(id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={i}
                      // selected={isItemSelected}
                    >
                      {/*<TableCell padding="checkbox">*/}
                      {/*  <Checkbox*/}
                      {/*    checked={isItemSelected}*/}
                      {/*  />*/}
                      {/*</TableCell>*/}

                      {
                        header.map((key, i) => (
                          <TableCell align="left" key={i}>{row[key]}</TableCell>
                        ))
                      }

                      {/*<TableCell*/}
                      {/*  align={'right'}*/}
                      {/*  padding={'default'}*/}
                      {/*>*/}
                      {/*  <Link to={routerUrls.searchRowDetail.getRoute(id)} className={classes.moreInfo}>More Info</Link>*/}
                      {/*</TableCell>*/}
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
  useEffect(() => {
    if (!tableState.data) {
      fetchData()
    }
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
      loading={tableState.loading}
      error={tableState.error}
      errorMessage={tableState.errorMessage}
      noResultFound={!tableState.data || !tableState.data.length}
      dataLoadedComponent={(ref) => <InnerSearchTable {...props} ref={ref} />}
    />
  )
};

export default SearchTable
