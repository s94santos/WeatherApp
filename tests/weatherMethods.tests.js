const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const weatherMethods = require("../src/resources/weather/weatherMethods");
const axios = require('axios');

describe("weatherMethods", function()  {
    describe("owmGetWeather", async function()  {
        it("...",async function () {

            const cities = ['lisbon'];
            const apiKey = '123456789';

            const stub = {
                coord: {
                    lon: -9.14,
                    lat: 38.71
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n"
                    }],
                base: "stations",
                main: {
                    temp: 13.43,
                    pressure: 1030,
                    humidity: 82,
                    temp_min: 12.22,
                    temp_max: 15
                },
                visibility: 10000,
                wind: {
                    speed: 3.1,
                    deg: 300
                },
                clouds: {
                    all: 2
                },
                dt: 1575914678,
                sys: {
                    type: 1,
                    id: 6901,
                    country: "PT",
                    sunrise: 1575877363,
                    sunset: 1575911704
                },
                timezone: 0,
                id: 2267057,
                name: "Lisbon",
                cod: 200
            }

            const stub2 = {
                Lisbon: {
                    temp: 16.19,
                    pressure: 1030,
                    humidity: 67,
                    temp_min: 15,
                    temp_max: 17
                }
            }

            const owmGetWeatherStub = sinon.stub(axios, 'get')
                .returns(stub2);
            const parseRespondeStub = sinon.stub(weatherMethods, 'parseResponse')
                .returns(stub);
                

            const result = await weatherMethods.owmGetWeather(cities, apiKey);
            expect(result.to.deep.eql(stub2));
            
            owmGetWeatherStub.restore();
            parseRespondeStub.restore();
        })
    });
});