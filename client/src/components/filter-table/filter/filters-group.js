import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button} from "@material-ui/core";
import {successButtonStyles, warningButtonStyles} from "../../../styles";
import Filter from "./filter";
import ToggleExpandableArea from "../common-components/toggle-expandable-area";

const useStyles = makeStyles(theme => ({
  filtersGroup: {
    widht: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: theme.spacing(0, 2)
  },
  buttonsGroup: {
    margin: theme.spacing(2, 0, 0, 2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  },
  applyButton: {
    ...successButtonStyles(theme).root,
    margin: theme.spacing(0),
  },
  resetButton: {
    ...warningButtonStyles(theme).root,
    margin: theme.spacing(0, 1),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0),
    }
  }
}));

const FiltersGroup = ({
  isResettable,
  isPendingApplicable,
  filters,
  disabled,
  dropdown,
  toggleDropdown,
  updatePendingFilter,
  updatePendingFilterWithValueArray,
  applyPendingFilter,
  resetFilter,
                }) => {
  const classes = useStyles();
  const canApplyNewFilter = !disabled && isPendingApplicable;

  const submit = (e) => {
    e.preventDefault();
    applyPendingFilter();
  };

  return (
    <ToggleExpandableArea dropdown={dropdown} toggleDropdown={toggleDropdown} isToggleButtonActive={isResettable} text={'筛选'}>
      <form>
        <div className={classes.filtersGroup}>
          {
            filters.map((obj, i) => (
                <Filter filter={obj} key={i} updatePendingFilter={updatePendingFilter} updatePendingFilterWithValueArray={updatePendingFilterWithValueArray}/>
            ))
          }
        </div>

        {/* buttons group */}
        <div className={classes.buttonsGroup}>
          <Button size={'small'} variant="contained" type={'submit'} className={classes.applyButton} disableElevation onClick={submit} disabled={!canApplyNewFilter}>
            查询
          </Button>
          <Button size={'small'} variant="contained" className={classes.resetButton} disableElevation onClick={resetFilter} disabled={disabled}>
            重置
          </Button>
        </div>
      </form>
    </ToggleExpandableArea>
  )
};

export default FiltersGroup
