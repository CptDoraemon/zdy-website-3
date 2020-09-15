import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {FilterState} from "../redux/states/filter";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
}));

interface FilterMultipleTextareaProps {
  filter: FilterState,
  updatePendingFilterWithValueArray: (filterInternalName: string, value: string[]) => void
}

const FilterMultipleTextarea: React.FC<FilterMultipleTextareaProps> = ({filter, updatePendingFilterWithValueArray}) => {
  // const classes = useStyles();

  const [value, setValue] = useState('');

  const changeHandler = (e: React.ChangeEvent<any>) => {
    const value = e.target.value.toString();
    const array = value.split(',').map((str: string) => str.trim());
    console.log(array)
    setValue(value);
    updatePendingFilterWithValueArray(filter.internalName, array)
  };

  return (
    <TextField
      label="Gene symbols"
      multiline
      rows={4}
      placeholder="Type gene symbols, separated by comma"
      variant="outlined"
      fullWidth
      value={value}
      onChange={changeHandler}
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
};

export default FilterMultipleTextarea
