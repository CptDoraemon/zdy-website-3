import {useState} from "react";
import GENERIC_ERROR_MESSAGE from "./generic-error-message";
import axios from 'axios'

/**
 * The base of fetch with get method
 * @return {usePost~doPost} The actual post function
 */
const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState('0');

  const reset = () => {
    setLoading(false);
    setError(false);
    setErrorMessage('');
    setData(null);
    setProgress('0')
  };

  const progressHandler = (p) => {
    const progressNumber0to100 = Math.round(p.loaded / p.total * 100);
    setProgress(`${isNaN(progressNumber0to100) ? '0' : progressNumber0to100}`)
  };
  const defaultOptions = {
    method: 'POST',
    onUploadProgress: progressHandler
  };

  /**
   * The actual post function
   * @param {string} url The link to fetch
   * @param {Object} options The options that will be passed to fetch
   * @param {Function} callbackOnSuccess A function to be called upon success response is received
   * @param {Function} callbackOnError A function to be called upon error response is received
   * @param {Function} callbackOnUnknownError A function to be called upon unexpected error is captured
   */
  const doPost = async (
    url,
    options,
    callbackOnSuccess,
    callbackOnError,
    callbackOnUnknownError,
    ) => {
    try {
      if (loading) return;

      // reset states
      reset();
      setLoading(true);

      // start fetching
      const res = await axios({url, ...defaultOptions, ...options});
      const json = res.data;

      // response received
      setLoading(false);
      if (process.env.REACT_APP_DEBUG === 'true') {
        console.log(res);
      }

      if (json.status === 'ok') {
        setData(json.data);
        if (callbackOnSuccess) callbackOnSuccess(json.data);
      } else if (json.status === 'error') {
        setErrorMessage(json.message);
        setError(true);
        if (callbackOnError) callbackOnError(json.message);
      } else {
        setErrorMessage(GENERIC_ERROR_MESSAGE);
        setError(true);
        if (callbackOnUnknownError) callbackOnUnknownError();
      }
    } catch (e) {
      if (process.env.REACT_APP_DEBUG === 'true') {
        console.log(e);
      }
      setLoading(false);
      setErrorMessage(GENERIC_ERROR_MESSAGE);
      setError(true);
      if (callbackOnUnknownError) callbackOnUnknownError();
    }
  };

  return {
    loading,
    error,
    errorMessage,
    data,
    progress,
    doPost
  }
};

export default usePost
