const axios = require('axios');

const owmGetWeatherReq = async (cities, apiKey) => {
    let promiseArray = [];
    cities.forEach( async (city) => {
        const endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
        const data = axios.get(endpoint);
        promiseArray.push(data);
    });
    const resArr = await Promise.all(promiseArray);
    return parseResponde(resArr);

} 

const parseResponde = (resArr) => {
    let resObj = {};
    resArr.forEach(response => {
        resObj[response.data.name] = response.data.main
    })
    return resObj;
}

module.exports = {
    owmGetWeatherReq
}