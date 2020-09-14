import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import BrowseInput from "./browse-input";
import HeatMap, {HeatMapData} from "../../components/charts/heat-map";
import LoaderWrapper from "../../components/loader-wrapper/loader-wrapper";

const useHeatMapData = () => {
  const [data, setData] = useState<HeatMapData | null>(null);

  useEffect(() => {
    import('./mock-heat-map-data.json')
      .then(module => {
        setData(module.default)
      })
      .catch(e => console.log(e))
  }, []);

  return data
};

const useStyles = makeStyles(theme => ({
  root: {

  },
  chart: {
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2, 0)
  }
}));

const Browse = () => {
  const classes = useStyles();

  const data = useHeatMapData();

  return (
    <div className={classes.root}>
      <BrowseInput/>
        <div className={classes.chart}>
          <LoaderWrapper
            loading={data === null}
            error={false}
            errorMessage={''}
            noResultFound={false}
            dataLoadedComponent={() => {
              return data ? <HeatMap id={'browse-heat-map'} data={data}/> : <></>
            }}
          />
        </div>
    </div>
  )
};

export default Browse
