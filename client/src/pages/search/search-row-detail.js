import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BoxScatterPlotChart from "../../components/charts/box-scatter-plot";
import {byGender, byCancerType} from "./search-row-detail-mock-data";

const useStyles = makeStyles(theme => ({
  root: {

  },
  backButton: {
    margin: theme.spacing(1, 0)
  },
  chartsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: `calc(100% - 2 * ${theme.spacing(2)}px)`,
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - 2 * ${theme.spacing(1)}px)`,
      margin: theme.spacing(1),
    }
  }
}));

const byGenderChartOptions = {
  id: 'search-row-detail-box-scatter-plot-1',
  title: 'By Gender',
  xTitle: 'Gender Group',
  yTitle: 'Expression'
};

const byCancerTypeChartOptions = {
  id: 'search-row-detail-box-scatter-plot-2',
  title: 'By Cancer Type',
  xTitle: 'Cancer Type',
  yTitle: 'Expression'
};

const SearchRowDetail = ({id, goBack}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        className={classes.backButton}
        startIcon={<ArrowBackIcon />}
        onClick={goBack}
      >
        Back
      </Button>
      <div className={classes.chartsWrapper}>
        <div className={classes.chartContainer}>
          <BoxScatterPlotChart options={byGenderChartOptions} data={byGender}/>
        </div>
        <div className={classes.chartContainer}>
          <BoxScatterPlotChart options={byCancerTypeChartOptions} data={byCancerType}/>
        </div>
      </div>
    </div>
  )
};

export default SearchRowDetail

