const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')
const cityService = app.services.cityService;

describe('Unit test city service ', () => {
    it('should give valid response', () => {
        cityService.getByLatLonAndRadius(49.48, 8.46)
        .then((response) => {
            assert(response.length > 0, 'Array length is greater than 0');
        });
    });
});

describe('Unit test find city', () => {
    it('should return valid city data', () => {
        cityService.findByCityId(2873891)
        .then((response) => {
            assert.equal(response.name, "Mannheim");
        });
    });
    it('should throw error when invalid city', () => {
        cityService.findByCityId(1)
        .then((response) => {
            console.log('then');
        })
        .catch((err) => {
            console.log(err);
            assert.equal(err.code, "NotFoundError");
        });
    });
});

describe('Unit test get weather for city', () => {
    it('should return valid city data', () => {
        cityService.getWeatherForCity(2873891)
        .then((response) => {
            assert(response.type, "Response contains type");
        });
    });
    it('should throw error when invalid city', () => {
        cityService.getWeatherForCity(1)
        .then((response) => {
            console.log('then');
        })
        .catch((err) => {
            console.log(err);
            assert.equal(err.code, "NotFoundError");
        });
    });
});

