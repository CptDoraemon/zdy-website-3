import {useState} from "react";

/**
 * callback Validator
 * @param {*} value
 * @returns {string} Error message if not valid, empty string if valid
 */
/**
 * @param {Validator} callback
 */
const useInput = (callback) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const error = errorMessage !== '';

  const reset = () => {

  };

  const validateInput = () => {
    const errorMessage = callback(value);
    if (errorMessage.length > 0) {
      setErrorMessage(errorMessage)
    }
    return errorMessage.length === 0;
  };

  const resetError = () => {
    setErrorMessage('')
  };

  const handleChange = (e) => {
    resetError();
    setValue(e.target.value);
  };

  return {
    value,
    handleChange,
    validateInput,
    resetError,
    error,
    errorMessage
  }
};

export default useInput
