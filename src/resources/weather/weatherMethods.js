const axios = require('axios');

const owmGetWeather = async (cities, apiKey) => {
    let promiseArray = [];
    cities.forEach( async (city) => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
        const res = owmWeatherHttpReq(url)
        promiseArray.push(res);
    });
    const resArr = await Promise.all(promiseArray);

    return parseResponse(resArr);

}

const owmWeatherHttpReq = (url) => {
    return axios.get(url);
}

const parseResponse = (resArr) => {
    let resObj = {};
    resArr.forEach(response => {
        resObj[response.data.name] = response.data.main
    })
    return resObj;
}

module.exports = {
    owmGetWeather,
    owmWeatherHttpReq,
    parseResponse
}