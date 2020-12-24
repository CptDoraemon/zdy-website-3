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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getTimeString = (ISOString: string) => {
  const date = new Date(ISOString);
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()} - ${hour}:${minute}`
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  title: {
    fontSize: theme.typography.h5.fontSize,
    textTransform: 'capitalize',
    fontWeight: 700
  },
  headerRow: {
    textTransform: 'capitalize',
    fontWeight: 700
  },
  deleteIcon: {
    color: theme.palette.warning.main
  }
}));

interface AdminHomeTableProps {
  data: {[key: string]: any}[],
  handleDeleteUser: (username: string) => void,
  isDeleteDisabled: boolean
}

const AdminHomeTable = observer<React.FC<AdminHomeTableProps>>(({data, handleDeleteUser, isDeleteDisabled}) => {
  const classes = useStyles();

  const formatCell = (value: any) => {
    if (typeof value === "boolean") {
      return value ? 'Yes' : 'No'
    } else if (value === "") {
      return '-'
    } else {
      return value
    }
  };

  const headers = ['id', '用户名', '创建时间', '最后登录', '是否为管理员'];
  const displayHeader = [...headers, '删除账户'];
  const keys = ['id', 'username', 'created', 'lastLogin', 'isAdmin'];

  return (
    <div className={classes.root}>
      <TableContainer component={Paper} elevation={0}>
        <Table aria-label="all users table">
          <TableHead>
            <TableRow>
              {
                displayHeader.map(cell => <TableCell key={cell} className={classes.headerRow}>{cell}</TableCell>)
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {
                  keys.map(key => <TableCell key={key}>
                    {
                      key === 'created' || key === 'lastLogin' ?
                        getTimeString(row[key]) :
                        formatCell(row[key])
                    }
                  </TableCell>)
                }
                <TableCell>
                  <IconButton aria-label="delete user" disabled={isDeleteDisabled} onClick={() => handleDeleteUser(row.username)}>
                    <DeleteIcon className={classes.deleteIcon}/>
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
