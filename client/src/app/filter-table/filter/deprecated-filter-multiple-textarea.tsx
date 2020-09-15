import React, {useMemo} from "react";
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
  const classes = useStyles();

  const changeHandler = (e: React.ChangeEvent<any>, value: any) => {
    console.log(value);
    updatePendingFilterWithValueArray(filter.internalName, value)
  };

  return (
        <Autocomplete
          multiple
          options={filter.choices.map(obj => obj.internalName)}
          value={filter.pending.map(obj => obj.internalName)}
          onChange={changeHandler}
          className={classes.root}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Gene Symbols"
              placeholder="Type a gene symbol"
            />
          )}
        />
  )
};

export default FilterMultipleTextarea
