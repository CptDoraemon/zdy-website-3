import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const CURRENT_YEAR = new Date().getFullYear();

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    marginTop: 'auto'
  },
  copyright: {
    color: 'rgba(255, 255, 255, 0.5)',
    margin: theme.spacing(1, 0),
    fontSize: theme.typography.caption?.fontSize,
    '&:hover': {
      color: theme.palette.secondary.light
    }
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <div className={classes.copyright}>
        Copyright &copy; 2020-{CURRENT_YEAR} ZdyDatabase.cn
      </div>
    </footer>
  )
};

export default Footer
