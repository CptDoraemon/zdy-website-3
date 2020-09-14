import React, {useEffect} from "react";
import HighchartsWrapper from "./highcharts-wrapper";

/**
 * @typedef {{
    id: string,
    title: string,
    xTitle: string,
    yTitle: string
 * }} Options
 */
/**
 * @typedef {{
 *   categories: string[],
 *   data: *[][]
 * }} Data
 */
/**
 * @param {Options} options
 * @param {Data} data
 */
const useBoxScatterPlotChart = (Highcharts, options, data) => {
  useEffect(() => {

    function getBoxPlotData(values) {
      const sorted = values.sort(function (a, b) {
        return a - b;
      });

      return {
        low: sorted[0],
        q1: sorted[Math.round(values.length * 0.25)],
        median: sorted[Math.round(values.length * 0.5)],
        q3: sorted[Math.round(values.length * 0.75)],
        high: sorted[sorted.length - 1]
      };
    }

    const scatterData = data.data
      .reduce(function (acc, data, x) {
        return acc.concat(data.map(function (value) {
          return [x, value];
        }));
      }, []);

    const boxplotData = data.data.map(getBoxPlotData);

    Highcharts.chart(options.id, {

      title: {
        text: options.title
      },

      credits: {
        enabled: false
      },

      legend: {
        enabled: false
      },

      xAxis: {
        categories: data.categories,
        title: {
          text: options.xTitle
        },
        labels: {
          autoRotation: false,
          useHTML: true
        }
      },

      yAxis: {
        title: {
          text: options.yTitle,
        }
      },

      plotOptions: {
        boxplot: {
          // lineWidth: 3,
          // medianWidth: 3,
          // stemWidth: 3,
          // whiskerLength: '75%',
          // whiskerWidth: 3,
        }
      },

      series: [{
        type: 'boxplot',
        name: 'Summary',
        data: boxplotData,
        tooltip: {
          headerFormat: ''
        }
      }, {
        name: 'Observation',
        type: 'scatter',
        data: scatterData,
        jitter: {
          x: 0.24 // Exact fit for box plot's groupPadding and pointPadding
        },
        marker: {
          radius: 1
        },
        color: 'rgba(100, 100, 100, 0.5)',
        tooltip: {
          headerFormat: '',
          pointFormatter: function() {
            return `${options.yTitle}: ${this.y}`
          },
        }
      }]
    });
  }, [])
};

/**
 * @param {Options} options
 * @param {Data} data
 */
const HighchartsBoxScatterPlotChart = ({Highcharts, options, data}) => {
  useBoxScatterPlotChart(Highcharts, options, data);

  return (
    <div id={options.id} style={{width: '100%', height: '100%'}}>

    </div>
  )
};

/**
 * @param {Options} options
 * @param {Data} data
 */
const BoxScatterPlotChart = ({options, data}) => {
  return (
    <HighchartsWrapper>
      <HighchartsBoxScatterPlotChart options={options} data={data}/>
    </HighchartsWrapper>
  )
};

export default BoxScatterPlotChart
