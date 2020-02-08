const Joi = require('@hapi/joi');

const schema = Joi.object({
    cities: Joi.array().items(Joi.string()).required()
})

module.exports = schema;