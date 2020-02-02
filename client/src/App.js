import React, { useState, useEffect } from "react";
import Search from './components/Search';
import BarChart from './components/graphComponent';

const buildQueryString = (cities) => {
    let base = '/api/weather?';
    cities.forEach((city, index) => {
      base = `${base}cities[]=${city}`
      if(index < cities.length - 1){
        base += '&';
      } 
    });
    return base;
  }
  
  const getWeatherReq = (queryString) => {
    return fetch(queryString)
      .then(res => res.json())
      .then((res) => {
        return res;
    });
  }
  
  const parseRes = (res) => {
    let obj = {
      name:[],
      tmp:[],
      minTmp:[],
      maxTmp:[]
    };
    for (const [key,value] of Object.entries(res)){
      obj.name.push(key);
      obj.tmp.push(value.temp); 
      obj.minTmp.push(value.temp_min)  
      obj.maxTmp.push(value.temp_max)    
    }
    return obj;
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
    
    useEffect(() => {
        const queryString = buildQueryString([search]);
        getWeatherReq(queryString).then((weatherResponse) => {
            const parsedResponse = parseRes(weatherResponse);
            console.log('parsedResponse :', parsedResponse);
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
    }, [search])

    

    return (
        <>
            <Search submitHandler={setSearch}/>
            <BarChart options={graphOptions.options} series={graphOptions.series }/>
        </>
    )
}

export default App;


