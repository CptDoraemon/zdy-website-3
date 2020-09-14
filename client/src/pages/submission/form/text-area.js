import React, {useMemo} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import _uniqueId from 'lodash/uniqueId';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {

  }
}));

const TextArea = (
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
      multiline
      rows={5}
    />
  )
};

export default TextArea

