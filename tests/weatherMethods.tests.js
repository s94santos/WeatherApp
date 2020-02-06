const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const axios = require('axios');
const rewire = require('rewire');

const weatherMethods = require("../api/src/weather/weatherMethods");

describe("weatherMethods", function()  {
    describe("owmGetWeather", async function()  {
        it("...",async function () {

            const cities = ['lisbon'];
            const apiKey = '123456789';

            const stub = {
                data: { 
                    main: { 
                        temp: 15.61,
                        feels_like: 13.18,
                        temp_min: 13.89,
                        temp_max: 17,
                        pressure: 1024,
                        humidity: 82 
                    }
                }
            }

            const stub2 = {
                Lisbon: {
                    temp: 15.61,
                    feels_like: 13.18,
                    temp_min: 13.89,
                    temp_max: 17,
                    pressure: 1024,
                    humidity: 82 
                }
            }

            const owmGetWeatherStub = sinon.stub(weatherMethods, 'owmWeatherHttpReq')
                .resolves(stub);
            /* const parseRespondeStub = sinon.stub(weatherMethods, 'parseResponse')
                .returns(stub);  */

            const result = await weatherMethods.owmGetWeather(cities, apiKey);
            expect(result).to.be.eql(stub2);

        })
    });
});