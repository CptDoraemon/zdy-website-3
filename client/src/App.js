import React, {useState} from 'react';
import { Provider } from 'react-redux';
import configureTableStore from "./app/filter-table/redux/configure-store"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import routerUrls from "./router-urls";
import {CssBaseline} from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import makeStyles from "@material-ui/core/styles/makeStyles";
import RouterScrollRestoration from "./router-scroll-restoration";
import Header from "./components/header/header";
import {navTabsDataForHeader} from "./router-urls";
import MainWrapper from "./components/main-wrapper/main-wrapper";
import Search from "./pages/search/search";
import Footer from "./components/footer/footer";
import AdminRegister from "./admin-pages/admin-register";
import AccountService from "./context/account.service";
import LandingPage from "./pages/landing-page/landing-page";
import {observer} from "mobx-react";
import AccountContext from "./context/account-context";
import LoginRequired from "./protected-routes/login-required";
import AdminRequired from "./protected-routes/admin-required";
import AdminHome from "./admin-pages/admin-home";
import Logout from "./pages/logout/logout";
import Login from "./pages/login/login";
import GenerateReport from "./pages/generate-report/generate-report";

const tableStore = configureTableStore();

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    maxWidth: '100%',
    minHeight: '100vh',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
}));

const InnerApp = observer(() => {
  const classes = useStyles();
  const [accountService] = useState(() => new AccountService());

  return (
    <div className={classes.root}>
      <AccountContext.Provider value={accountService}>
        <Router basename={process.env.PUBLIC_URL}>
          <RouterScrollRestoration />
          <Header data={navTabsDataForHeader} homeLink={routerUrls.home}/>
          <MainWrapper>
            <Switch>
              <Route path={routerUrls.landingPage} exact render={ () => <LandingPage/> } />
              <LoginRequired path={routerUrls.search} exact render={ () => <Search/> } />
              <LoginRequired path={routerUrls.contact} exact render={ () => <div>contact</div> } />
              <LoginRequired path={routerUrls.logout} exact render={ () => <Logout /> } />
              <LoginRequired path={routerUrls.generateReport} exact render={ () => <GenerateReport /> } />
              <Route path={routerUrls.login} exact render={ () => <Login/> } />
              <Route path={routerUrls.adminRegister} exact render={ () => <AdminRegister/> } />
              <AdminRequired path={routerUrls.adminHome} exact render={ () => <AdminHome/> } />
              <Route path={routerUrls.fallback} exact render={ () => <LandingPage/> } />
            </Switch>
          </MainWrapper>
          <Footer/>
        </Router>
      </AccountContext.Provider>
    </div>
  );
});

const App = () => {
  return (
    <Provider store={tableStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <InnerApp />
      </ThemeProvider>
    </Provider>
  )
};

export default App;
