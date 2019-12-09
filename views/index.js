import React from "react";
import ReactDOM from "react-dom";
import ReactApexChart from 'react-apexcharts'


class BarChart extends React.Component {
      
    constructor(props) {
      super(props);

      this.state = {
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
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
            categories: ['Aveiro'],
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
          name: 'Temperature',
          data: [15]
        }]
      }
    }

    componentDidMount(){
        fetch('/api/weather?cities[]=coimbra')
        .then(res => res.json())
        .then((res) => {
            let names = [];
            res.forEach((elm, key) => {
                names.push(key);
            })
            this.setState(options.xaxis.categories, names)
        })
    }

    render() {
      return (
        

        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350" />
        </div>


      );
    }
  }

  const domContainer = document.querySelector('#root');
  ReactDOM.render(<BarChart />, domContainer);