import React, {useContext, useEffect, useRef} from "react";
import {useMount} from "react-use";
import AccountContext from "../../context/account-context";
import {useHistory} from "react-router-dom";
import {autorun} from "mobx";
import routerUrls from "../../router-urls";

const Logout: React.FC = () => {
  const accountContext = useContext(AccountContext);

  useMount(async () => {
    await accountContext.logout();
  });

  // redirect after login
  const history = useHistory();
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      const disposer = autorun(() => {
        const loginSucceeded = accountContext.data !== null;
        if (loginSucceeded) {
          history.replace(routerUrls.landingPage);
        }
      });
      mountedRef.current = true;
      return () => {
        disposer();
      }
    }
  }, [history, accountContext.data]);

  return (
    <div>
      {
        accountContext.isError ? accountContext.errorMessage : 'logging out'
      }
    </div>
  )
};

export default Logout
