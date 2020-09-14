import React, {useMemo} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import filterStyles from "./filter-styles";
import FilterCommon from "./filter-common";
import {FilterState} from "../redux/states/filter";

const useStyles = makeStyles(theme => ({
  formGroup: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 'none',
    }
  },
  formControlLabel: {
    marginLeft: -6
  },
  checkbox: {
    padding: 4
  },
  checkboxLabel: {
    ...filterStyles(theme).text,
    padding: '0px 4px',
  },
  error: {
    ...filterStyles(theme).error,
  },
}));

interface FilterMultipleProps {
  filter: FilterState,
  updatePendingFilter: (filterInternalName: string, choiceInternalName: string) => void
}

const FilterMultiple: React.FC<FilterMultipleProps> = ({filter, updatePendingFilter}) => {
  const classes = useStyles();

  const changeHandler = (e: React.ChangeEvent<any>) => {
    const optionInternalName = e.target.name;
    updatePendingFilter(filter.internalName, optionInternalName)
  };

  const isValid = filter.validationMessage === '';
  const choicesCheckedStatus = useMemo(() => {
    // returns an object
    // key is the choice name
    // value is boolean which represent whether is checked or not
    const obj: {[key: string]: boolean} = {};
    filter.choices.forEach(choice => obj[choice.internalName] = false);
    filter.pending.forEach(choice => obj[choice.internalName] = true);
    return obj
  }, [filter.choices, filter.pending]);

  return (
    <FilterCommon title={filter.displayName} validationMessage={filter.validationMessage}>
      <FormGroup className={classes.formGroup}>
        {
          filter.choices.map((choice, i) => (
            <FormControlLabel
              key={i}
              className={classes.formControlLabel}
              control={
                <Checkbox
                  checked={choicesCheckedStatus[choice.internalName]}
                  onChange={changeHandler}
                  name={choice.internalName}
                  className={classes.checkbox}
                />
              }
              label={
                <Typography
                  variant={'body2'}
                  component={'span'}
                  className={isValid ? classes.checkboxLabel : `${classes.checkboxLabel} ${classes.error}`}
                >
                  {choice.displayName}
                </Typography>
              }
            />
          ))
        }
      </FormGroup>
    </FilterCommon>
  )
};

export default FilterMultiple
