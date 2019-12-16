import React from "react";
import ReactApexChart from 'react-apexcharts'

class BarChart extends React.Component {
    
    constructor(props) {

      super(props);

      this.state = {
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '25%',
              endingShape: 'rounded'	
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: props.weather.name,
          },
          yaxis: {
            title: {
              text: 'Cº (Celsius)'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + " Cº"
              }
            }
          }
        },
        series: [{
          name: 'Min Temperature',
          data: props.weather.minTmp
        }, {
          name: 'Temperature',
          data: props.weather.tmp
        }, {
          name: 'Max Temperature',
          data: props.weather.maxTmp
        }]
      }
    }

    render() {
      return (
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350" />
        </div>
      );
    }
  }

export default BarChart;