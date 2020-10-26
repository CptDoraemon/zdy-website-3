import React, {Dispatch, SetStateAction, useContext} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {IconButton} from "@material-ui/core";
import {observer} from "mobx-react";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText
  },
  menuButton: {
    color: theme.palette.primary.contrastText
  }
}));

interface HeaderButtonGroupProps {
  setIsSideBarActive: Dispatch<SetStateAction<boolean>>
}

const HeaderButtonGroup = observer<React.FC<HeaderButtonGroupProps>>(({setIsSideBarActive}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="menu" className={classes.menuButton} onClick={() => setIsSideBarActive(isActive => !isActive)}>
        <MenuIcon/>
      </IconButton>
    </div>
  )
});

export default HeaderButtonGroup
