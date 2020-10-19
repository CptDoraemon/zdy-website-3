import {
  Route,
  Redirect
} from "react-router-dom";
import React, {ReactElement, useContext} from "react";
import {observer} from "mobx-react";
import AccountContext from "../context/account-context";
import routerUrls from "../router-urls";

interface LoginRequiredProps {
  render: () => ReactElement
}
const LoginRequired = observer<React.FC<LoginRequiredProps>>(({render, ...rest}) => {
  const accountContext = useContext(AccountContext);
  const isLogin = accountContext.isLogin;

  return (
    <Route
      {...rest}
      render={
        isLogin ? render : ({ location }) =>
          (
            <Redirect
              to={{
                pathname: routerUrls.landingPage,
                state: { from: location }
              }}
            />
          )
      }
    />
  );
});

export default LoginRequired
