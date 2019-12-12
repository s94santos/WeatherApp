const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const weatherController = require("../src/resources/weather/weatherController");
const weatherMethods = require("../src/resources/weather/weatherMethods");

describe("weatherController", function()  {
  describe("getWeather", function() {
    it("should return weather for a particular city", async function() {

        const req = {
            query:{
                cities:['lisbon']
            }
        };

        const res = {
            send: sinon.spy()
        };
        
        const next = {};

        const stub = {
            Lisbon: {
                temp: 16.19,
                pressure: 1030,
                humidity: 67,
                temp_min: 15,
                temp_max: 17
            }
        };
        
        const owmGetWeatherReqStub = sinon.stub(weatherMethods, "owmGetWeather")
            .returns(stub);

        await weatherController.getWeather(req, res, next);

        expect(res.send.firstCall.args[0]).to.eql(stub);
        
        owmGetWeatherReqStub.restore();

    });
  });
});