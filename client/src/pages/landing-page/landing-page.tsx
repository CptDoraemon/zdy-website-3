import React, {useContext, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";
import {useMount} from "react-use";
import AccountContext from "../../context/account-context";
import {CircularProgress} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import routerUrls from "../../router-urls";
import {useLocation} from "react-router-dom";
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  loader: {
    width: 80,
    margin: 'auto 0'
  }
}));

interface LandingPageProps {

}

const LandingPage: React.FC<LandingPageProps> = observer(() => {
  const classes = useStyles();
  const accountContext = useContext(AccountContext);
  const [isLoginVerified, setIsLoginVerified] = useState(false);
  const location = useLocation();

  useMount(async () => {
    await accountContext.verifyLogin();
    setIsLoginVerified(true)
  });

  if (!isLoginVerified) {
    return <LinearProgress className={classes.loader}/>
  }

  // @ts-ignore
  const from = location.state?.from;

  if (!accountContext.isLogin) {
    // Not logged in -> redirect to login page
    return <Redirect to={routerUrls.login}/>
  } else {
    if (accountContext.isAdmin) {
      // logged in as admin
      return <Redirect to={from || routerUrls.adminHome}/>
    } else {
      // logged in as normal user
      return <Redirect to={from || routerUrls.search}/>
    }
  }
});

export default LandingPage
