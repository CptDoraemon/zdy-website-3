import React, {useContext, useEffect, useMemo} from "react";
import {makeStyles} from '@material-ui/core/styles';
import AccountContext from "../../context/account-context";
import {Button, IconButton} from "@material-ui/core";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import routerUrls from "../../router-urls";
import clsx from 'clsx'
import CloseIcon from '@material-ui/icons/Close';
import {useLocation} from "react-router-dom";
import {usePrevious} from "react-use";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 5),
  },
  closeIconRow: {
    position: 'relative',
    height: '2rem',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.palette.primary.contrastText,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  buttonCommon: {
    width: '100%',
    margin: theme.spacing(0.5),
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
  close: () => void
}

const HeaderSideBar = observer<React.FC<HeaderButtonGroupProps>>(({close}) => {
  const classes = useStyles();
  const accountContext = useContext(AccountContext);
  const isLogin = accountContext.isLogin;
  const isAdmin = isLogin && accountContext.isAdmin;

  const items = useMemo(() => {
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
  }, [isLogin, isAdmin]);

  return (
    <div className={classes.root}>
      <div className={classes.closeIconRow}>
        <IconButton aria-label="close menu" className={classes.closeIcon} onClick={close} edge={'end'}>
          <CloseIcon/>
        </IconButton>
      </div>
      <div className={classes.buttonGroup}>
        {items}
      </div>
    </div>
  )
});

export default HeaderSideBar
