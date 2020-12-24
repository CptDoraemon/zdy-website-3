import {Button} from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {primaryButtonStyles, successButtonStyles} from "../../../styles";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  filterButton: {
    margin: theme.spacing(0.5, 0),
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: theme.typography.caption.fontSize,
  },
  filterButtonActive: {
    ...successButtonStyles(theme).root
  },
  filterButtonInactive : {
    ...primaryButtonStyles(theme).root
  },
  arrowRight: {
    transition: 'transform 200ms',
  },
  arrowDown: {
    transform: 'rotate(90deg)',
    transition: 'transform 200ms'
  }
}));

interface FilterToggleButtonProps {
  dropdown: boolean,
  toggleDropdown: () => void,
  isActive: boolean,
  text: string
}

const ToggleButton: React.FC<FilterToggleButtonProps> = (
  {
    dropdown,
    toggleDropdown,
    isActive,
    text
  }) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color='primary'
      disableElevation
      className={clsx(
        classes.filterButton,
        isActive ? classes.filterButtonActive : classes.filterButtonInactive
      )}
      endIcon={<ChevronRightIcon className={dropdown ? classes.arrowDown : classes.arrowRight}/>}
      aria-expanded={dropdown}
      onClick={toggleDropdown}
    >
      {text}
    </Button>
  )
};

export default ToggleButton
