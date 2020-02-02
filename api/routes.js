const express = require('express')
const router = express.Router();

const weatherController = require('./src/weather/weatherController');

router.get('/weather', weatherController.getWeather);

module.exports = router;