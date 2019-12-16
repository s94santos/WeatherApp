import ReactDOM from 'react-dom';
import React from "react";
import BarChart from './graphComponent';

const buildQueryString = (cities) => {
  let base = '/api/weather?';
  cities.forEach((city, index) => {
    base = `${base}cities=${city}`
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
  const queryString = buildQueryString(['lisboa','aveiro','coimbra','porto','faro']);
  getWeatherReq(queryString).then((weather) => {
    const parsedWeather = parseRes(weather);
    const domContainer = document.querySelector('#root');
    ReactDOM.render(<BarChart weather={parsedWeather}/>, domContainer); 
  })




