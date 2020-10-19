import React, {useContext, useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";
import {useMount} from "react-use";
import AccountContext from "../../context/account-context";
import {CircularProgress} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import routerUrls from "../../router-urls";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
}));

interface LandingPageProps {

}

const LandingPage: React.FC<LandingPageProps> = observer(() => {
  const classes = useStyles();
  const accountContext = useContext(AccountContext);
  const [isLoginVerified, setIsLoginVerified] = useState(false);

  useMount(async () => {
    await accountContext.verifyLogin();
    setIsLoginVerified(true)
  });

  if (!isLoginVerified) {
    return (
      <CircularProgress />
    )
  }

  if (!accountContext.isLogin) {
    // Not logged in -> redirect to login page
    return (
      <div>
        login
      </div>
    )
  } else {
    if (accountContext.isAdmin) {
      // logged in as admin -> redirect to admin home page
      return (
        <Redirect to={routerUrls.adminHome}/>
      )
    } else {
      // logged in as normal user -> redirect to home page
      return (
        <div className={classes.root}>
          home
        </div>
      )
    }
  }
});

export default LandingPage
