import React, {useEffect} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";
import AccountService from "../../services/account.service";
import {useMount} from "react-use";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
}));

interface LandingPageProps {
  accountService: AccountService
}

const LandingPage: React.FC<LandingPageProps> = observer(({accountService}) => {
  const classes = useStyles();

  useMount(() => {
    accountService.verifyLogin();
  });

  return (
    <div className={classes.root}>
      landing
    </div>
  )
});

export default LandingPage
