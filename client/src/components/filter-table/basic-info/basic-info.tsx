import React, {ChangeEvent, useCallback, useMemo} from "react";
import ToggleExpandableArea from "../common-components/toggle-expandable-area";
import {useDispatch, useSelector} from "react-redux";
import {FilterTableDefaultState} from "../../../redux/states/root-states";
import {basicInfoActionsGenerators} from "../../../redux/actions/basic-info";
import {Button, TextField} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {successButtonStyles, warningButtonStyles} from "../../../styles";
import {Link} from "react-router-dom";
import routerUrls from "../../../router-urls";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  inputField: {
    margin: theme.spacing(1, 2),
    width: `calc(33% - ${theme.spacing(2) * 2}px)`,
    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${theme.spacing(2) * 2}px)`,
    }
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

interface BasicInfoProps {

}

const useConnect = () => {
  const state = useSelector((state: FilterTableDefaultState) => state.basicInfo);
  const isDropdown = state.isDropdown;
  const data = state.data;
  const displayNames = state.displayNames;

  const dispatch = useDispatch();
  const toggleDropdown = useCallback(() => {
    dispatch(basicInfoActionsGenerators.toggleDropdown())
  }, [dispatch]);
  const updateValue = useCallback((key: string, value: string) => {
    dispatch(basicInfoActionsGenerators.updateValue(key, value))
  }, [dispatch]);
  const resetForm = useCallback(() => {
    dispatch(basicInfoActionsGenerators.resetData())
  }, [dispatch]);

  return {
    isDropdown,
    data,
    displayNames,
    toggleDropdown,
    updateValue,
    resetForm
  }
};

const BasicInfo: React.FC<BasicInfoProps> = () => {
  const classes = useStyles();
  const {
    isDropdown,
    data,
    displayNames,
    toggleDropdown,
    updateValue,
    resetForm
  } = useConnect();

  const keys = useMemo(() => {
    return Object.keys(displayNames)
  }, [displayNames]);

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    updateValue(e.currentTarget.name, e.currentTarget.value)
  }, [updateValue]);

  return (
    <ToggleExpandableArea dropdown={isDropdown} toggleDropdown={toggleDropdown} isToggleButtonActive={false} text={'生成报告'}>
      <form className={classes.form}>
        {
          keys.map(key => <TextField
            key={key}
            className={classes.inputField}
            label={displayNames[key]}
            name={key}
            variant="outlined"
            value={data[key]}
            onChange={changeHandler}
            size={'small'}
          />)
        }
      </form>

      <div className={classes.buttonsGroup}>
        <Button size={'small'} variant="contained" type={'submit'} className={classes.applyButton} disableElevation component={Link} to={routerUrls.generateReport}>
          生成
        </Button>
        <Button size={'small'} variant="contained" className={classes.resetButton} disableElevation onClick={resetForm}>
          重置
        </Button>
      </div>
    </ToggleExpandableArea>
  )
};

export default BasicInfo
