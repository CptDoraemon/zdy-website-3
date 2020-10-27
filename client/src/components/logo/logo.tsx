import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    maxWidth: 300,
  }
}));

const Logo = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt='logo' className={classes.logo}/>
    </div>
  )
};

export default Logo
