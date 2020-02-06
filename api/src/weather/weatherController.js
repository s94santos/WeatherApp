const weatherMethods = require('./weatherMethods');

const getWeather = async (req, res, next) => {

	const apiKey = conf.apiKey;
	try{
		const response = await weatherMethods.owmGetWeather(req.query.cities, apiKey);
		res.send(response);
	}catch(err){
		next(err);
	}

}

module.exports = {
	getWeather
}