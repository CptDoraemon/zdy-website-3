import React, {useMemo} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  title: {
    fontSize: theme.typography.h5.fontSize,
    textTransform: 'capitalize',
    fontWeight: 700
  }
}));

interface AdminHomeTableProps {
  data: {[key: string]: any}[],
  handleDeleteUser: (username: string) => void,
  isDeleteDisabled: boolean
}

const AdminHomeTable = observer<React.FC<AdminHomeTableProps>>(({data, handleDeleteUser, isDeleteDisabled}) => {
  const classes = useStyles();

  const rawHeaders = useMemo(() => {
    if (!data.length) return [];
    return Object.keys(data[0]);
  }, [data]);
  const headers = useMemo(() => {
    if (!rawHeaders.length) return[];
    const returned = rawHeaders.slice();
    returned.push('delete user');
    return returned
  }, [rawHeaders]);

  const formatCell = (value: any) => {
    if (typeof value === "boolean") {
      return value ? 'Yes' : 'No'
    } else if (value === "") {
      return '-'
    } else {
      return value
    }
  };

  return (
    <div className={classes.root}>
      <TableContainer component={Paper} elevation={0}>
        <Table aria-label="all users table">
          <TableHead>
            <TableRow>
              {
                headers.map(cell => <TableCell key={cell}>{cell}</TableCell>)
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {
                  rawHeaders.map(column => <TableCell key={column}>{formatCell(row[column])}</TableCell>)
                }
                <TableCell>
                  <IconButton aria-label="delete user" disabled={isDeleteDisabled} onClick={() => handleDeleteUser(row.username)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
});

export default AdminHomeTable
