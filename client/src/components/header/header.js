import React, {useMemo} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Link, useLocation} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(0, 2, 0, 0),
    flexGrow: 1,
    fontWeight: 700,
    fontSize: '1.25rem'
  },
  activeTab: {
    '&:visited': {
      color: theme.palette.secondary.main,
    },
    '&:link': {
      color: theme.palette.secondary.main,
    },
  },
  tabRoot: {
    opacity: 1,
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: '0.8rem'
  },
  homeLink: {
    '&:visited': {
      color: theme.palette.primary.contrastText,
    },
    '&:link': {
      color: theme.palette.primary.contrastText,
      textDecoration: 'none'
    },
    '&:hover': {
      color: theme.palette.secondary.light,
    }
  }
}));

/**
 * @param {Array.<{
 * title: String,
 * link: String
 * }>} data
 */
const Header = ({data, homeLink}) => {
  const classes = useStyles();
  const path = useLocation().pathname;
  const links = useMemo(() => {
    return data.map(obj => obj.link)
  }, [data]);

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar variant={'dense'}>
        <Typography component={'h1'} className={classes.title} >
          <Link to={homeLink} className={classes.homeLink}>
            DATABASE
          </Link>
        </Typography>
        <Tabs
          value={links.indexOf(path) !== -1 ? path : false}
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="navigation tabs"
          className={classes.tabs}
        >
          {
            data.map((tab) => (
              <Tab
                label={tab.title}
                component={Link}
                to={tab.link}
                value={tab.link}
                key={tab.link}
                classes={{
                  selected: classes.activeTab,
                  root: classes.tabRoot
                }}
              />
            ))
          }
        </Tabs>
      </Toolbar>
    </AppBar>
  )
};

export default Header
