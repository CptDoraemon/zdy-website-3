import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FilterTable from "../../components/filter-table/filter-table";
import {sortOptions} from "./search-table-options";

const useStyles = makeStyles(theme => ({
  root: {

  }
}));

interface SearchProps {

}

const Search: React.FC<SearchProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FilterTable filters={[]} sorts={sortOptions} title={'药物筛选'}/>
    </div>
  )
};

export default Search

