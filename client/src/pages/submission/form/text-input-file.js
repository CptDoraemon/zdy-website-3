import React, {useMemo} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import _uniqueId from 'lodash/uniqueId';
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
  root: {

  }
}));

const TextInputFile = (
  {
    label,
    helperText,
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
    <>
      <Button
        variant="contained"
        component="label"
        disableElevation
        aria-describedby={ids.helper}
      >
        Upload File
        <input
          type="file"
          style={{ display: "none" }}
          onChange={onChange}
          accept={'.csv,.txt'}
        />
      </Button>
      <FormHelperText id={ids.helper} error={error} variant={'outlined'}>{errorMessage || helperText || ' '}</FormHelperText>
    </>
  )
};

export default TextInputFile

