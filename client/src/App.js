import React from 'react';
import { Provider } from 'react-redux';
import configureStore from "./redux/configure-store";
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
import Home from "./pages/home/home";
import Search from "./pages/search/search";
import SearchRowDetail from "./pages/search/search-row-detail";
import Browse from "./pages/browse/browse";
import Submission from "./pages/submission/submission";
import Footer from "./components/footer/footer";

const store = configureStore();
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

const InnerApp = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router basename={process.env.PUBLIC_URL}>
        <RouterScrollRestoration />
        <Header data={navTabsDataForHeader} homeLink={routerUrls.home}/>
        <MainWrapper>
          <Switch>
            <Route path={routerUrls.home} exact render={ () => <Home/> } />
            <Route path={routerUrls.search} exact render={ () => <Search store={tableStore}/> } />
            <Route path={routerUrls.searchRowDetail.route} exact render={ (props) => <SearchRowDetail id={props.match.params.id} goBack={props.history.goBack}/> } />
            <Route path={routerUrls.browse} exact render={ () => <Browse /> } />
            <Route path={routerUrls.submission} exact render={ () => <Submission /> } />
          </Switch>
        </MainWrapper>
        <Footer/>
      </Router>
    </div>
  );
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
