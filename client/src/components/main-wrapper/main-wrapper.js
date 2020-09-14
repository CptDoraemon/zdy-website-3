import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values['lg'] - 2 * theme.spacing(2),
    margin: theme.spacing(5, 2),
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      width: `calc(100% - ${2 * theme.spacing(1)}px)`,
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    }
  }
}));

/**
 * @param {{children: JSX.Element}} children
 */
const MainWrapper = ({children}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      {children}
    </Paper>
  )
};

export default MainWrapper
