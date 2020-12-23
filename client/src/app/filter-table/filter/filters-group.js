import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import {successButtonStyles, warningButtonStyles} from "../../../styles";
import Filter from "./filter";
import FilterToggleButton from "./filter-toggle-button";

const useStyles = makeStyles(theme => ({
  root: {

  },
  dropdown: {
    padding: theme.spacing(1, 0),
    marginBottom: theme.spacing(2)
  },
  filtersGroup: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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

/**
 * @callback applyFilter
 */

/**
 * @callback resetFilter
 */

/**
 * @callback updatePendingFilter
 */

/**
 * @param {boolean} isResettable
 * @param {boolean} isPendingApplicable
 * @param {boolean} disabled
 * @param {Object[]} filters
 * @param {updatePendingFilter} updatePendingFilter
 * @param {applyFilter} applyFilter
 * @param {resetFilter} resetFilter
 * @param {boolean} dropdown
 * @param {Function} toggleDropdown
 */
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
    <div className={classes.root}>
      <FilterToggleButton dropdown={dropdown} toggleDropdown={toggleDropdown} isActiveFilterDifferentThanDefault={isResettable}/>
      {
        dropdown &&
        <Fade in timeout={500}>
          <Paper className={classes.dropdown} elevation={0}>
            {/* filters group */}
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

          </Paper>
        </Fade>
      }
    </div>
  )
};

export default FiltersGroup
