import {lighten, makeStyles} from "@material-ui/core/styles";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import {primaryButtonStyles} from "../../../styles";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2),
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  titleWrapper: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0)
    }
  },
  title: {
    textTransform: 'capitalize',
    fontWeight: 700
  },
  text: {
    fontWeight: 700
  },
  downloadButton: {
    ...primaryButtonStyles(theme).root,
    fontSize: theme.typography.caption.fontSize,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0)
    }
  }
}));

const SearchTableToolbar = ({selected, title, totalRows}) => {
  const classes = useToolbarStyles();

  const numSelected = selected.length;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.titleWrapper}>
        {numSelected > 0 ? (
          <Typography className={classes.text} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <div>
            <Typography className={classes.title} variant="h6" component="span">
              { title }
            </Typography>
            <Typography className={classes.text} variant="body2" component="span" color={'secondary'}>
              { ` (找到了${totalRows}条结果)` }
            </Typography>
          </div>
        )}
      </div>
    </Toolbar>
  );
};

export default SearchTableToolbar
