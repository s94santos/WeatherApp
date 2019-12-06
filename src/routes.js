const express = require('express')
const router = express.Router();

const weatherController = require('./resources/weather/weatherController');

router.get('/weather', weatherController.getWeather);

module.exports = {
    router
}