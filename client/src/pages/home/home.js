import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PieChart from "../../components/charts/pie-chart";

const mockPieChartData = [{
  name: 'Chrome',
  y: 61.41
}, {
  name: 'Internet Explorer',
  y: 11.84
}, {
  name: 'Firefox',
  y: 10.85
}, {
  name: 'Edge',
  y: 4.67
}, {
  name: 'Safari',
  y: 4.18
}, {
  name: 'Sogou Explorer',
  y: 1.64
}, {
  name: 'Opera',
  y: 1.6
}, {
  name: 'QQ',
  y: 1.2
}, {
  name: 'Other',
  y: 2.61
}];

const useStyles = makeStyles(theme => ({
  root: {

  },
  pieChartWrapper: {
    width: '100%',
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        Data Summary
      </div>
      <div className={classes.pieChartWrapper}>
        <PieChart id={'home-pie-chart'} data={mockPieChartData}/>
      </div>
    </div>
  )
};

export default Home
