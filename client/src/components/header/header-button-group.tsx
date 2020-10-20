import React, {useContext} from "react";
import {createStyles, makeStyles} from '@material-ui/core/styles';
import AccountContext from "../../context/account-context";
import {Button} from "@material-ui/core";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import routerUrls from "../../router-urls";
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  buttonCommon: {
    margin: theme.spacing(0, 0.5),
    padding: theme.spacing(0.5, 2),
    fontWeight: 700,
  },
  primaryButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    }
  },
  secondaryButton: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.secondary.main} inset`,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    }
  }
}));

interface HeaderButtonGroupProps {

}

const HeaderButtonGroup = observer<React.FC<HeaderButtonGroupProps>>(() => {
  const classes = useStyles();
  const accountContext = useContext(AccountContext);
  const isLogin = accountContext.isLogin;
  const isAdmin = isLogin && accountContext.isAdmin;

  if (isLogin) {
    if (isAdmin) {
      return <>
        <Button className={clsx(classes.primaryButton, classes.buttonCommon)} component={Link} to={routerUrls.adminHome} size={'small'}>Admin Console</Button>
        <Button className={clsx(classes.secondaryButton, classes.buttonCommon)} component={Link} to={routerUrls.logout} size={'small'}>Logout</Button>
        </>
    } else {
      return <Button className={clsx(classes.secondaryButton, classes.buttonCommon)} component={Link} to={routerUrls.logout} size={'small'}>Logout</Button>
    }
  } else {
    return <></>
  }
});

export default HeaderButtonGroup
