const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app');

describe('Route testing lat/lng', () => {
    it('should return OK status', () => {
        return request(app)
        .get('/cities?lat=49.48&lng=8.46')
        .then((response) => {
            assert.equal(response.status, 200);
        });
    });

    it('should return BAD_REQUEST', () => {
        return request(app)
        .get('/cities')
        .then((response) => {
            assert.equal(response.status, 400);
        });
    });
});

describe('Route testing GET Cities info', () => {
    it('should return OK status', () => {
        return request(app)
        .get('/cities/2873891')
        .then((response) => {
            assert.equal(response.status, 200);
            assert.equal(response.body.name, "Mannheim");
        });
    });

    it('should return OK status', () => {
        return request(app)
        .get('/cities/1')
        .then((response) => {
            assert.equal(response.status, 404);
            assert.equal(response.body.code, "NotFoundError");
        });
    });
});

describe('Route testing Weather for city', () => {
    it('should return OK status', () => {
        return request(app)
        .get('/cities/2873891/weather')
        .then((response) => {
            assert.equal(response.status, 200);
        });
    });

    it('should return OK status', () => {
        return request(app)
        .get('/cities/1/weather')
        .then((response) => {
            assert.equal(response.status, 404);
            assert.equal(response.body.code, "NotFoundError");
        });
    });
});