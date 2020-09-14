import React, {useMemo} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import _uniqueId from 'lodash/uniqueId';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {

  }
}));

/**
 * @param {string} label
 * @param {string} helperText
 * @param {string} value
 * @param {Function} onChange
 * @param {string} errorMessage
 * @param {boolean} error
 */
const TextInput = (
  {
    label,
    helperText,
    value,
    onChange,
    errorMessage,
    error
  }) => {
  const classes = useStyles();

  const ids = useMemo(() => {
    const uniqueId = _uniqueId();

    return {
      input: `input-${label}-${uniqueId}`,
      helper: `input-${label}-helper-${uniqueId}`
    }
  }, []);

  return (
    <TextField
      id={ids.input}
      label={label}
      fullWidth
      variant={'outlined'}
      helperText={errorMessage || helperText || ' '}
      value={value}
      onChange={onChange}
      error={error}
    />
  )
};

export default TextInput

