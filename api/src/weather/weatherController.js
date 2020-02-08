const weatherMethods = require('./weatherMethods');
const weatherSchema = require('./weatherSchema');

const getWeather = async (req, res, next) => {

	const apiKey = conf.apiKey;
	const params = {
		cities: req.query.cities
    }

	try{
        const valParams = await weatherSchema.validateAsync(params);
		const response = await weatherMethods.owmGetWeather(valParams.cities, apiKey);
	    return res.send(response);
	}catch(err){
		return next(err);
	}

}

module.exports = {
	getWeather
}