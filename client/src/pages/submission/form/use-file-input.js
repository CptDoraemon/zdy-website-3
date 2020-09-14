import {useState} from "react";

const KB = 1024;
const MB = 1024 * 1024;
const GB = 1024 * 1024 * 1024;
const getFileSizeString = (size) => {
  let result = '';

  if (size < KB) {
    return `${result} Byte`
  } else if (size >= KB && size < MB) {
    result = `${(size / KB).toFixed(1)} KB`;
  } else if (size >= MB && size < GB) {
    result = `${(size / MB).toFixed(1)} MB`;
  } else if (size >= GB) {
    result = `${(size / GB).toFixed(1)} GB`
  }

  return result
};

const fileValidator = (file) => {
  // most validations are checked in onChange handler
  if (!file) {
    return 'File needed'
  }

  return ''
};

const useFileInput = (sizeMax) => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [helperMessage, setHelperMessage] = useState('');
  const error = errorMessage !== '';

  const validateInput = () => {
    const errorMessage = fileValidator(file);
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
    setFile(null);
    const file = e.target.files[0];
    // when there is a file that was selected earlier, the user clicks select file again, and the file selecting dialog is closed without any file is selected
    // change event is triggered but with no file in list
    if (!file) return;

    if (file.size > sizeMax) {
      setErrorMessage(`File too large: ${file.name} - ${getFileSizeString(file.size)}`)
    } else {
      setFile(file);
      setHelperMessage(`${file.name} - ${getFileSizeString(file.size)}`)
    }
  };

  return {
    file,
    handleChange,
    validateInput,
    resetError,
    helperMessage,
    error,
    errorMessage
  }
};

export default useFileInput
