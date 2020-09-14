import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FilterTable from "../../app/filter-table/filter-table";
import {filterOptions, sortOptions} from "./search-table-options";

const useStyles = makeStyles(theme => ({
  root: {

  }
}));

interface SearchProps {
  store: any
}

const Search: React.FC<SearchProps> = ({store}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FilterTable store={store} filters={filterOptions} sorts={sortOptions} title={'title placeholder'}/>
    </div>
  )
};

export default Search

