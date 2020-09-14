import React, {useEffect} from "react";
import HighchartsWrapper from "./highcharts-wrapper";
import {cloneDeep} from 'lodash';

export interface HeatMapData {
  infos: {
    category: string[],
    data: number[],
    name: string
  }[],
  maxCategory: string[]
}

type SeriesData = number[][]

const useHeatMap = (Highcharts: any, elementId: string, data: HeatMapData) => {
  const heatMap = (elementId: string, data: HeatMapData) => {
    const xCategories = data.maxCategory.slice();
    const yCategories = data.infos.map(obj => obj.name);
    const seriesData: SeriesData = [];
    const logTPM = (val: number) => Math.log2(val + 1);

    for (let i=0; i<data.infos.length; i++) {
      const geneObj = data.infos[i];
      for (let j=0; j<geneObj.data.length; j++) {
        seriesData.push([j, i, logTPM(geneObj.data[j])])
      }
    }

    _heatMap(elementId, xCategories, yCategories, seriesData);
  };

  const _heatMap = (elementId: string, xCategories: string[], yCategories: string[], seriesData: SeriesData) => {

    Highcharts.chart(elementId, {

      chart: {
        type: 'heatmap',
      },

      credits: {
        enabled: false
      },

      title: {
        text: 'Heat Map',
        align: 'left',
        x: 40
      },

      xAxis: {
        categories: xCategories.slice(),
      },

      yAxis: {
        categories: yCategories.slice(),
        title: null,
      },

      colorAxis: {
        stops: [
          [0.1, '#78b8ed'],
          [0.5, '#fffbbc'],
          [0.8, '#c4463a'],
          [1, '#c4463a']
        ],
        min: 0
      },

      legend: {
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'top',
        y: 24,
        title: {
          text: 'TPM(log2+1)',
        }
      },

      tooltip: {
        // @ts-ignore
        formatter: function (this: any) {
          return `
                    <b>Sample Name:</b> ${xCategories[this.point.x]}<br> 
                    <b>Gene:</b> ${yCategories[this.point.y]}<br> 
                    <b>TPM(log2+1):</b> ${this.point.value}<br> 
                    `
        }
      },

      series: [{
        borderWidth: 0,
        data: cloneDeep(seriesData),
        dataLabels: {
          enabled: false,
        },
      }],

      caption: {
        text: `
                <b>NP</b>: Normal person; 
                <b>CHD</b>: Coronary heart disease; 
                <b>CRC</b>: Colorectal cancer; 
                <br>
                <b>HCC</b>: Hepatocellular carcinoma;
                <b>PAAD</b>:Pancreatic adenocarcinoma; 
                <b>WhB</b>: Whole blood.
            `,
        useHTML: true,
        align: 'center',
      },

    });
  };

  useEffect(() => {
    heatMap(elementId, data)
  }, [])
};

interface HighchartsPieChartProps {
  Highcharts: any,
  id: string,
  data: HeatMapData
}

const HighchartsPieChart: React.FC<HighchartsPieChartProps> = ({Highcharts, id, data}) => {
  useHeatMap(Highcharts, id, data);

  return (
    <div id={id} style={{width: '100%', height: '100%'}}>

    </div>
  )
};

interface HeatMapProps {
  id: string,
  data: HeatMapData
}

const HeatMap: React.FC<HeatMapProps> = ({id, data}) => {
  return (
    <HighchartsWrapper>
      {/*// @ts-ignore*/}
      <HighchartsPieChart id={id} data={data}/>
    </HighchartsWrapper>
  )
};

export default HeatMap
