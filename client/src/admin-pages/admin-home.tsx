import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";
import RequestService from "../services/request.service";
import urls from "../services/urls";
import {useMount} from "react-use";
import {CircularProgress} from "@material-ui/core";
import AdminHomeTable from "./components/admin-home-table";
import AdminHomeCreateUser from "./components/admin-home-create-user";

interface IAllUserResponse {
  users: {[key: string]: any}[]
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  section: {
    width: '100%',
    marginBottom: theme.spacing(5)
  },
  title: {
    fontSize: theme.typography.h5.fontSize,
    textTransform: 'capitalize',
    fontWeight: 700
  },
  loaderWrapper: {
    width: '100%',
    height: 250,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
}));

const AdminHome = observer(() => {
  const classes = useStyles();
  const [allUsers] = useState(() => new RequestService<IAllUserResponse>(urls.adminGetAllUsers));
  const [deleteUser] = useState(() => new RequestService(urls.adminDeleteUser));

  const getAllUsers = () => {
    allUsers.doRequest({method: 'GET'})
  };

  const handleDeleteUser = async (username: string) => {
    await deleteUser.doRequest({data: {username}, method: "DELETE"});
    getAllUsers();
  };

  useMount(() => {
    getAllUsers()
  });

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <div className={classes.title}>全部账户</div>
        {
          allUsers.isLoading &&
          <div className={classes.loaderWrapper}>
            <CircularProgress/>
          </div>
        }
        {
          allUsers.data !== null &&
          <AdminHomeTable data={allUsers.data.users} handleDeleteUser={handleDeleteUser} isDeleteDisabled={deleteUser.isLoading}/>
        }
      </div>

      <div className={classes.section}>
        <div className={classes.title}>建立账户</div>
        <AdminHomeCreateUser refresh={getAllUsers}/>
      </div>
    </div>
  )
});

export default AdminHome
