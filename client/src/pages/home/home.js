import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Logo from "../../components/logo/logo";

const useStyles = makeStyles(theme => ({
  root: {

  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Logo/>
      <div>
        首页
      </div>
    </div>
  )
};

export default Home
