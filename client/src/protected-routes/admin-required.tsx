import {
  Route,
  Redirect
} from "react-router-dom";
import React, {ReactElement, useContext} from "react";
import {observer} from "mobx-react";
import AccountContext from "../context/account-context";
import routerUrls from "../router-urls";

interface AdminRequiredProps {
  render: () => ReactElement
}
const AdminRequired = observer<React.FC<AdminRequiredProps>>(({children, render,  ...rest}) => {
  const accountContext = useContext(AccountContext);
  const isAdmin = accountContext.isLogin && accountContext.isAdmin;

  return (
    <Route
      {...rest}
      render={
        isAdmin ? render : ({ location }) =>
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

export default AdminRequired
