import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "./toggle-button";
import {Collapse} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {

  },
  dropdown: {
    padding: theme.spacing(1, 0),
    marginBottom: theme.spacing(2)
  }
}));

interface ToggleExpandableAreaProps {
  dropdown: boolean,
  toggleDropdown: () => void,
  isToggleButtonActive: boolean,
  text: string
}

const ToggleExpandableArea: React.FC<ToggleExpandableAreaProps> = ({dropdown, toggleDropdown, isToggleButtonActive, text, children}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ToggleButton dropdown={dropdown} toggleDropdown={toggleDropdown} isActive={isToggleButtonActive} text={text}/>
        <Collapse in={dropdown}>
          <Paper className={classes.dropdown} elevation={0}>
            {children}
          </Paper>
        </Collapse>
    </div>
  )
};

export default ToggleExpandableArea
