import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";
import RequestService from "../services/request.service";
import urls from "../services/urls";
import {useMount} from "react-use";
import {CircularProgress} from "@material-ui/core";
import AdminHomeTable from "./components/admin-home-table";
import PostService from "../services/post.service";
import AdminHomeCreateUser from "./components/admin-home-create-user";

interface IAllUserResponse {
  users: {[key: string]: any}[]
}

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
      <div className={classes.title}>全部账户</div>
      {
        allUsers.isLoading && <CircularProgress/>
      }
      {
        allUsers.data !== null &&
        <AdminHomeTable data={allUsers.data.users} handleDeleteUser={handleDeleteUser} isDeleteDisabled={deleteUser.isLoading}/>
      }
      <AdminHomeCreateUser refresh={getAllUsers}/>
    </div>
  )
});

export default AdminHome
