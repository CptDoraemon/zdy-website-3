import useRedirectToLandingPage from "./use-redirect-to-landing-page";
import {useRef} from "react";
import {IReactionDisposer, reaction} from "mobx";
import {useMount, useUnmount} from "react-use";

const useRedirectWhenValueNotNull = (valueFunction: () => any) => {
  const redirect = useRedirectToLandingPage();
  const disposerRef = useRef<IReactionDisposer | null>(null);

  useMount(() => {
    disposerRef.current = reaction(
      valueFunction,
      value => {
        const loginSucceeded = value !== null;
        if (loginSucceeded) {
          redirect()
        }
      });
  });

  useUnmount(() => {
    if (disposerRef.current) {
      disposerRef.current()
    }
  });
};

export default useRedirectWhenValueNotNull
