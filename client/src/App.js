import React, {useState} from 'react';
import { Provider } from 'react-redux';
import configureStore from "./redux/configure-store";
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
import Contact from "./pages/contact/contact";

const store = configureStore();

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
          <Switch>
            <Route path={routerUrls.landingPage} exact render={ () => <LandingPage/> } />
            <Route path={routerUrls.login} exact render={ () => <Login/> } />
            <Route path={routerUrls.fallback} render={ () => <RoutesWithHeaderAndFooter/> } />
          </Switch>
        </Router>
      </AccountContext.Provider>
    </div>
  );
});

const RoutesWithHeaderAndFooter = () => {
  return (
    <>
      <Header data={navTabsDataForHeader} homeLink={routerUrls.home}/>
        <MainWrapper>
          <Switch>
            <LoginRequired path={routerUrls.search} exact render={ () => <Search /> } />
            <LoginRequired path={routerUrls.contact} exact render={ () => <Contact /> } />
            <LoginRequired path={routerUrls.logout} exact render={ () => <Logout /> } />
            <LoginRequired path={routerUrls.generateReport} exact render={ () => <GenerateReport /> } />
            <Route path={routerUrls.adminRegister} exact render={ () => <AdminRegister/> } />
            <AdminRequired path={routerUrls.adminHome} exact render={ () => <AdminHome/> } />
            <Route path={routerUrls.fallback} render={ () => <LandingPage/> } />
          </Switch>
        </MainWrapper>
        <Footer/>
      </>
  )
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <InnerApp />
      </ThemeProvider>
    </Provider>
  )
};

export default App;
