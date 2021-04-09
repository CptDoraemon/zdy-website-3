import React, {useCallback, useMemo} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button, darken, fade, Typography} from "@material-ui/core";
import {filterActionsGenerators} from "../../../redux/actions/filter/filter";
import {useDispatch, useSelector} from "react-redux";
import {FilterTableDefaultState} from "../../../redux/states/root-states";
import {basicInfoActionsGenerators} from "../../../redux/actions/basic-info";
import {successButtonStyles, warningButtonStyles} from "../../../styles";

const CHIP_PY = 0.5;
const BORDER_RADIUS = 5;
const CHIP_MX = 0.5;
const CHIP_MY = 0.5;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    margin: theme.spacing(1, 0)
  },
  title: {
    fontWeight: 700,
    width: '100%',
    textAlign: 'start',
    margin: theme.spacing(0, 0, 1, 0),
  },
  chipGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    margin: theme.spacing(1, -CHIP_MX),
  },
  chipWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    width: 'fit-content',
    border: `2px solid ${fade(theme.palette.primary.main, 0.25)}`,
    margin: theme.spacing(CHIP_MY, CHIP_MX),
    padding: 0,
    backgroundColor: 'transparent',
    '&:hover $chipTitle, &:focus $chipTitle': {
      backgroundColor: fade(theme.palette.primary.main, 1),
      color: '#fff'
    },
    '&:active': {
      opacity: 0.6
    },
    '&:hover, &:focus': {
      border: `2px solid ${fade(theme.palette.primary.main, 1)}`,
      cursor: 'pointer'
    },
    '&:focus': {
      outline: 'none'
    }
  },
  chipTitle: {
    padding: theme.spacing(CHIP_PY, 1),
    backgroundColor: fade(theme.palette.primary.main, 0.25),
    fontWeight: 700,
    color: darken(theme.palette.primary.main, 0.6),
    borderRadius: BORDER_RADIUS * 0.5,
    minWidth: theme.spacing(5),
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    margin: theme.spacing(0.25),
    lineHeight: 1
  },
  chipValue: {
    padding: theme.spacing(CHIP_PY, 1.25, CHIP_PY, 1),
    color: '#000',
    lineHeight: 1
  },
  applyButton: {
    ...successButtonStyles(theme).root,
    margin: theme.spacing(0, 0, 0, CHIP_MX),
  },
  resetButton: {
    ...warningButtonStyles(theme).root,
    margin: theme.spacing(0, 1),
  }
}));

const useConnect = () => {
  const dispatch = useDispatch();
  const isFilterDropdown = useSelector((state: FilterTableDefaultState) => state.filter.dropdown);
  const isBasicInfoDropdown = useSelector((state: FilterTableDefaultState) => state.basicInfo.isDropdown);
  const basicInfoName = useSelector((state: FilterTableDefaultState) => state.basicInfo.displayNames);

  const data = useMemo(() => {
    return [
      {
        key: 'name',
        value: '吴美荣',
      },
      {
        key: 'sex',
        value: '女',
      },
      {
        key: 'age',
        value: '71'
      },
      {
        key: 'diseaseId',
        value: 'BI21-02120',
      },
      {
        key: 'id',
        value: '3017659',
      },
      {
        key: 'phone',
        value: '15112597986',
      },
      {
        key: 'diagnose',
        value: '1、乙状结肠中分化腺癌 \n2、缺铁性贫血',
      },
      {
        key: 'department',
        value: '肠胃外科',
      },
      {
        key: 'sample',
        value: '乙状结肠组织',
      },
      {
        key: 'items',
        value: '分子诊断用药',
      },
    ]
  }, []);

  const setBasicInfo = (key: string, value: string) => {
    dispatch(basicInfoActionsGenerators.updateValue(key, value));
    if (!isBasicInfoDropdown) {
      dispatch(basicInfoActionsGenerators.toggleDropdown())
    }
  };

  const setGene = (value: string[]) => {
    dispatch(filterActionsGenerators.updatePendingFilterWithValueArray('Gene_symbol', value));
    if (!isFilterDropdown) {
      dispatch(filterActionsGenerators.toggleDropdown());
    }
  };

  const applyGene = useCallback(() => {
    setGene(['EGFR', 'BRAF'])
  }, [setGene]);

  const resetAll = () => {
    dispatch(basicInfoActionsGenerators.resetData());
    dispatch(filterActionsGenerators.resetFilter());
  };

  const applyAll = useCallback(() => {
    applyGene();
    data.forEach(obj => {
      dispatch(basicInfoActionsGenerators.updateValue(obj.key, obj.value));
    });
    if (!isBasicInfoDropdown) {
      dispatch(basicInfoActionsGenerators.toggleDropdown())
    }
    dispatch(filterActionsGenerators.applyPendingFilter());
  }, [applyGene, data, dispatch, isBasicInfoDropdown]);

  return {
    data,
    applyGene,
    setBasicInfo,
    applyAll,
    resetAll,
    basicInfoName
  }
};

const Examples = () => {
  const classes = useStyles();

  const {
    data,
    applyGene,
    setBasicInfo,
    applyAll,
    resetAll,
    basicInfoName
  } = useConnect();

  const button = useCallback((obj: {key: string, value: string}, onClick: () => void) => (
    <button key={obj.key} className={classes.chipWrapper} onClick={onClick}>
      <Typography className={classes.chipTitle} variant={'caption'}>
        { obj.key }
      </Typography>
      <Typography className={classes.chipValue} variant={'body2'}>
        { obj.value }
      </Typography>
    </button>
  ), [classes.chipTitle, classes.chipValue, classes.chipWrapper]);

  return (
    <div className={classes.root}>
      <Typography variant={'body2'} component={'h5'} className={classes.title}>
        示例
      </Typography>
      <div className={classes.chipGroup}>
        {
          [{
            key: '突变基因',
            value: 'EGFR, BRAF',
          }].map(obj => (
            button(obj, applyGene)
          ))
        }
      </div>
      <div className={classes.chipGroup}>
        {
          data.map(obj => (
            // @ts-ignore
            button({key: basicInfoName[obj.key], value: obj.value}, () => setBasicInfo(obj.key, obj.value))
          ))
        }
      </div>
      <div className={classes.chipGroup}>
        <Button variant={'contained'} disableElevation size={'small'} onClick={applyAll} className={classes.applyButton}>
          应用全部示例
        </Button>
        <Button variant={'contained'} disableElevation size={'small'} onClick={resetAll} className={classes.resetButton}>
          重置全部
        </Button>
      </div>
    </div>
  )
};

export default Examples
