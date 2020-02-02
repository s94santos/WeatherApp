import ReactDOM from 'react-dom';
import React from "react";
import App from './src/App';


  /* const queryString = buildQueryString(['lisboa','aveiro','coimbra','porto','faro']);
  getWeatherReq(queryString).then((weather) => {
    const parsedWeather = parseRes(weather);
    
    ReactDOM.render(<BarChart weather={parsedWeather}/>, domContainer); 
  }) */
  const domContainer = document.querySelector('#root');
  ReactDOM.render(<App/>, domContainer);



