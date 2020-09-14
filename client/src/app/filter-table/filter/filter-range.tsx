import React from "react";
import filterStyles from "./filter-styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import FilterCommon from "./filter-common";
import {FilterState} from "../redux/states/filter";

const useStyles = makeStyles(theme => ({
  textFieldGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  textField: {
    width: 80,
    margin: theme.spacing(0, 1, 0, 0)
  },
  textFieldInput: {
    ...filterStyles(theme).text,
  },
}));

const MIN_NAME = 'min';
const MAX_NAME = 'max';

interface FilterRangeProps {
  filter: FilterState,
  updatePendingFilter: (filterInternalName: string, choiceInternalName: string, additionalKey: string) => void
}

const FilterRange: React.FC<FilterRangeProps> = ({filter, updatePendingFilter}) => {
  const classes = useStyles();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === MIN_NAME) {
      // updating min
      updatePendingFilter(filter.internalName, e.target.value, 'min')
    } else if (e.target.name === MAX_NAME) {
      // updating max
      updatePendingFilter(filter.internalName, e.target.value, 'max')
    }
  };

  const isValid = filter.validationMessage === '';

  const textFieldProps = {
    type: 'number',
    className: classes.textField,
    onChange: changeHandler,
    error: !isValid,
    InputProps: {
      classes: {
        input: classes.textFieldInput
      }
    }
  };

  return (
    <FilterCommon title={filter.displayName} validationMessage={filter.validationMessage}>
      <div className={classes.textFieldGroup}>
        <TextField label="Min" name={MIN_NAME} value={filter.pending[0].internalName} {...textFieldProps}/>
        <TextField label="Max" name={MAX_NAME} value={filter.pending[1].internalName} {...textFieldProps}/>
      </div>
    </FilterCommon>
  )
};

export default FilterRange
