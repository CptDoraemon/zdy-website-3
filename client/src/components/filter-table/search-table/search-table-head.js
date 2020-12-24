import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  stickyHeaderTC: {
    backgroundColor: '#fff',
    borderBottom: 'solid 1px rgb(224,224,224)',
    borderTop: 'solid 1px rgb(224,224,224)'
  },
}));

const SearchTableHead = ({header, onSelectAllClick, numSelected, rowCount}) => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        {header.map((headCell, i) => (
          <TableCell
            classes={{stickyHeader: classes.stickyHeaderTC}}
            key={i}
            align={'left'}
            padding={'default'}
          >
            {headCell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default SearchTableHead
