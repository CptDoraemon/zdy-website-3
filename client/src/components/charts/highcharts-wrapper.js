import React, {useEffect, useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const HighchartsWrapper = ({children}) => {
  const [highchartsModule, setHighchartsModule] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    import('highcharts/es-modules/masters/highcharts.src')
      .then(module => {
          const promiseArray = [
            import('highcharts/es-modules/masters/highcharts-more.src'),
            import('highcharts/es-modules/masters/modules/heatmap.src'),
            import('highcharts/es-modules/masters/modules/annotations.src'),
            import('highcharts/es-modules/masters/modules/exporting.src'),
          ];
          Promise.all(promiseArray)
            .then(() => setHighchartsModule(module.default))
            .catch(e => {
              console.log(e);
              setError(true)
            })
      })
      .catch(e => {
        console.log(e);
        setError(true)
      })
  }, []);

  if (error) {
    return <>'Failed to load chart'</>
  } else if (highchartsModule === null) {
    return <CircularProgress disableShrink />
  } else {
    return React.cloneElement(children, {Highcharts: highchartsModule})
  }
};


export default HighchartsWrapper
