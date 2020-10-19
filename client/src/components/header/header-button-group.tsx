import React, {useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import AccountContext from "../../context/account-context";
import {Button} from "@material-ui/core";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import routerUrls from "../../router-urls";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontWeight: 700,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    }
  }
}));

interface HeaderButtonGroupProps {

}

const HeaderButtonGroup = observer<React.FC<HeaderButtonGroupProps>>(() => {
  const classes = useStyles();
  const accountContext = useContext(AccountContext);
  const isLogin = accountContext.isLogin;

  if (isLogin) {
    return <Button className={classes.button} component={Link} to={routerUrls.logout} size={'small'}>Logout</Button>
  } else {
    return <></>
  }
});

export default HeaderButtonGroup
