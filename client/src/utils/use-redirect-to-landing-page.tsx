import {useHistory} from "react-router-dom";
import routerUrls from "../router-urls";

const useRedirectToLandingPage = () => {
  const history = useHistory();
  const redirect = () => {
    history.replace(routerUrls.landingPage);
  };

  return redirect
};

export default useRedirectToLandingPage
