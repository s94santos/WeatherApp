const weatherMethods = require('./weatherMethods');

const getWeather = async (req, res, next) => {

	const apiKey = 'c28148eafcf6742acc11bf60edca65b0'
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