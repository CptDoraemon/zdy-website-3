import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import {successButtonStyles, warningButtonStyles} from "../../styles";
import clsx from "clsx";

const mockOptions = [
  'apple',
  'banana',
  'cherry',
  'date',
  'eggfruit'
];

const useControlledInput = () => {
  const [selected, setSelected] = useState([]);
  const searchDisabled = selected.length === 0;
  const resetDisabled = selected.length === 0;

  const changeHandler = (event, newValue) => {
    setSelected(newValue);
  };

  const reset = () => {
    setSelected([])
  };

  const search = () => {
    return false
  };

  return {
    selected,
    changeHandler,
    reset,
    search,
    searchDisabled,
    resetDisabled
  }
};

const useStyles = makeStyles(theme => ({
  root: {

  },
  firstButtonWrapper: {
    margin: theme.spacing(1, 0),
  },
  buttonWrapper: {
    margin: theme.spacing(1),
  },
  searchButton: {
    ...successButtonStyles(theme).root,
  },
  resetButton: {
    ...warningButtonStyles(theme).root,
  }
}));

const BrowseInput = () => {
  const classes = useStyles();

  const {
    selected,
    changeHandler,
    reset,
    search,
    searchDisabled,
    resetDisabled
  } = useControlledInput();

  return (
    <div className={classes.root}>
      <form>
        <Autocomplete
          multiple
          options={mockOptions.slice()}
          value={selected}
          onChange={changeHandler}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Gene Symbols"
              placeholder="Type a gene symbol"
            />
          )}
        />

        <Button variant="contained" className={clsx(classes.searchButton, classes.firstButtonWrapper)} disableElevation onClick={search} disabled={searchDisabled}>
          Search
        </Button>
        <Button variant="contained" className={clsx(classes.resetButton, classes.buttonWrapper)} disableElevation onClick={reset} disabled={resetDisabled}>
          Reset
        </Button>
      </form>
    </div>
  )
};

export default BrowseInput
