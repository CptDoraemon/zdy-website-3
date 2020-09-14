import React, {useEffect} from "react";
import HighchartsWrapper from "./highcharts-wrapper";

const usePieChart = (Highcharts, elementId, data) => {
  useEffect(() => {
    Highcharts.chart(elementId, {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      credits: {
        enabled: false
      },
      title: {
        text: undefined
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: data.slice()
      }]
    });

  }, [])
};

const HighchartsPieChart = ({Highcharts, id, data}) => {
  usePieChart(Highcharts, id, data);

  return (
      <div id={id} style={{width: '100%', height: '100%'}}>

      </div>
  )
};

/**
 * @param {String} id
 * @param {Array.<{
 *   name: String,
 *   y: Number
 * }>} data
 */
const PieChart = ({id, data}) => {
  return (
    <HighchartsWrapper>
      <HighchartsPieChart id={id} data={data}/>
    </HighchartsWrapper>
  )
};

export default PieChart
