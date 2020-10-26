import React, {useContext, useEffect, useMemo, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Link, useLocation} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from "@material-ui/core/Tab";
import AccountContext from "../../context/account-context";
import {observer} from "mobx-react";
import HeaderButtonGroup from "./header-button-group";
import HeaderSideBar from "./header-side-bar";
import {Drawer} from "@material-ui/core";
import {usePrevious} from "react-use";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    margin: theme.spacing(0, 2, 0, 0),
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
  },
  desktopTabs: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  },
  mobileTabs: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    }
  },
  buttonGroup: {
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  drawer: {
    backgroundColor: theme.palette.primary.main
  },
  username: {
    fontWeight: 700,
    padding: theme.spacing(0, 1)
  }
}));

interface HeaderProps {
  data: {
    title: string,
    link: string
  }[],
  homeLink: string
}

const Header = observer<React.FC<HeaderProps>>(({data, homeLink}) => {
  const classes = useStyles();
  const path = useLocation().pathname;
  const links = useMemo(() => {
    return data.map(obj => obj.link)
  }, [data]);
  const accountContext = useContext(AccountContext);
  const [isSideBarActive, setIsSideBarActive] = useState(false);

  const location = useLocation().key;
  useEffect(() => {
    // close sidebar after redirect
    setIsSideBarActive(false)
  }, [location]);

  const tabs = useMemo(() => {
    if (!accountContext.isLogin) return null;
    return <Tabs
      value={links.indexOf(path) !== -1 ? path : false}
      indicatorColor="secondary"
      variant="scrollable"
      scrollButtons="auto"
      aria-label="navigation tabs"
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
  }, [accountContext.isLogin, classes.activeTab, classes.tabRoot, data, links, path]);

  const closeSideBar = () => setIsSideBarActive(false);

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar variant={'dense'} className={classes.toolbar}>
        <Typography component={'h1'} className={classes.title} >
          <Link to={homeLink} className={classes.homeLink}>
            DATABASE
          </Link>
        </Typography>
        <div className={classes.desktopTabs}>
          {tabs}
        </div>
        <div className={classes.buttonGroup}>
          <div className={classes.username}>
            {accountContext.username}
          </div>
          {
            accountContext.isLogin &&
            <HeaderButtonGroup setIsSideBarActive={setIsSideBarActive}/>
          }
        </div>
      </Toolbar>
      <div className={classes.mobileTabs}>
        {tabs}
      </div>
      <Drawer anchor={'right'} open={isSideBarActive} onClose={closeSideBar} classes={{paper: classes.drawer}}>
        <HeaderSideBar close={closeSideBar}/>
      </Drawer>
    </AppBar>
  )
});

export default Header
