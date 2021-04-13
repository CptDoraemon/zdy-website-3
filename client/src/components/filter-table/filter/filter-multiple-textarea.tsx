import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {FilterState} from "../../../redux/states/filter";
import TextField from "@material-ui/core/TextField";
import {useMount} from "react-use";
import {useDispatch} from "react-redux";
import {filterActionsGenerators} from "../../../redux/actions/filter/filter";

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

  const dispatch = useDispatch();
  const value = filter.pending.map(obj => obj.internalName);

  const changeHandler = (e: React.ChangeEvent<any>) => {
    const newValue = e.target.value.toString();
    const array = newValue.split(',');
    updatePendingFilterWithValueArray(filter.internalName, array)
  };

  return (
    <TextField
      label="Gene symbols"
      multiline
      rows={4}
      placeholder="请输入gene symbol，以英文逗号分隔"
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
