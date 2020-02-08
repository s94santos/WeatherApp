import React, { useState, useEffect } from "react";
import Search from './components/Search';
import BarChart from './components/graphComponent';
import helpers from './utils/helpers';

const getWeatherReq = (queryString) => {
  return fetch(queryString)
    .then(res => res.json())
    .then((res) => {
      return res;
  });
}

const App = () => {

    const [ search, setSearch ] = useState('');
    const [ graphOptions, setGraphOptions ] = useState({options: {
        chart: {
          type: 'bar',
          height: 350
        },
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
          categories: [],
        },
        yaxis: {
          title: {
            text: '(Celsius)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " ºC"
            }
          }
        }
      },
      series: [{
        name: 'Min Temperature',
        data: []
      }, {
        name: 'Actual Temperature',
        data: []
      }, {
        name: 'Max Temperature',
        data: []
      }]
    })

    const getWeather = () => {
      const queryString = helpers.buildQueryString([search]);
      return getWeatherReq(queryString)
        .then((weatherResponse) => {
          return helpers.parseResponse(weatherResponse);
    })
  }
    
    useEffect(() => {
      if(search){
        getWeather()
          .then((parsedResponse) => {
              const objClone = {...graphOptions,
                options:{
                    xaxis:{
                            categories:parsedResponse.name
                    }
                }
              }
              objClone.series[0].data = parsedResponse.minTmp;
              objClone.series[1].data = parsedResponse.tmp;
              objClone.series[2].data = parsedResponse.maxTmp;
              setGraphOptions(objClone)
          }).catch((err) => {
              console.log('err :', err);
          })
      }  
    }, [search])

    return (
        <>
          <BarChart options={graphOptions.options} series={graphOptions.series }/>
          <Search submitHandler={setSearch}/>
        </>
    )
}

export default App;


