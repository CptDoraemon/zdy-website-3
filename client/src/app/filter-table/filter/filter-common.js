import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import filterStyles from "./filter-styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1, 0),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  legend: {
    ...filterStyles(theme).text,
    fontWeight: 700,
    minWidth: 120,
    margin: theme.spacing(0, 1, 0, 0)
  },
  checkboxLabel: {
    ...filterStyles(theme).text,
  },
  helperTextError: {
    fontWeight: 700,
    ...filterStyles(theme).error,
  },
}));

/**
 * @param {validationMessage} string
 * @param {string} title
 * @param {JSX.Element} children
 */
const FilterCommon = ({validationMessage, title, children}) => {
  const classes = useStyles();

  const isValid = validationMessage === '';

  return (
    <FormControl component="div" className={classes.root}>
      <FormLabel
        error={!isValid}
        component="legend"
        classes={{
          root: isValid ? classes.legend : `${classes.legend} ${classes.error}`
        }}
      >
        {title}</FormLabel>

      { children }

      {
        !isValid &&
        <FormHelperText className={classes.helperTextError}>{validationMessage}</FormHelperText>
      }
    </FormControl>
  )
};

export default FilterCommon
