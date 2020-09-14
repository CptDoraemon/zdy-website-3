import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl} from "@material-ui/core";
import filterStyles from "./filter-styles";
import FilterCommon from "./filter-common";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Choice, FilterState} from "../redux/states/filter";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 150,
    textTransform: 'capitalize'
  },
  selectInput: {
    padding: '8px 12px',
    fontSize: theme.typography.body2.fontSize,
    textTransform: 'capitalize'
  },
  menuItem: {
    textTransform: 'capitalize'
  },
}));

interface FilterSingleProps {
  filter: FilterState,
  updatePendingFilter: (filterInternalName: string, choiceInternalName: string) => void
}

const FilterSingle: React.FC<FilterSingleProps> = ({filter, updatePendingFilter}) => {
  const classes = useStyles();

  const changeHandler = (e: React.ChangeEvent<any>) => {
    updatePendingFilter(filter.internalName, e.target.value)
  };

  const isValid = filter.validationMessage === '';
  const selected = filter.pending[0].internalName;


  return (
    <FilterCommon title={filter.displayName} validationMessage={filter.validationMessage}>
      <FormControl variant="outlined" className={classes.formControl} error={!isValid}>
        <Select
          value={selected}
          onChange={changeHandler}
          aria-label={filter.displayName}
          inputProps={{
            className: classes.selectInput
          }}
        >
          {
            filter.choices.map(choice => (
              <MenuItem key={choice.internalName} value={choice.internalName} dense className={classes.menuItem}>{choice.displayName}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </FilterCommon>
  )
};

export default FilterSingle
