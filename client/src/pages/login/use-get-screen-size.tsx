import {useCallback, useEffect, useRef, useState} from "react";

const useGetScreenSize = () => {
  const [height, setHeight] = useState<null | number>(null);
  const timerRef = useRef<null | number>(null);

  const updateStates = useCallback(() => {
    setHeight(window.innerHeight);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const debouncedUpdateScreen = useCallback(() => {
    resetTimer();
    timerRef.current = window.setTimeout(updateStates, 500)
  }, [resetTimer, updateStates]);

  useEffect(() => {
    updateStates()
  }, [updateStates]);

  useEffect(() => {
    window.addEventListener('resize', debouncedUpdateScreen);
    return () => {
      window.removeEventListener('resize', debouncedUpdateScreen);
    }
  }, [debouncedUpdateScreen]);

  return height
};

export default useGetScreenSize
