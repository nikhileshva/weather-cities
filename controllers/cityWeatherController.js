"use strict"

const Cities = require('../models/cities');

module.exports = app => {
    let logger = app.helpers.logger;
    let cityService = app.services.cityService;
    let openmap = app.utils.openWeatherMapUtils;
    const validator = app.validators.queryParamValidator;

    function getAvailableCities (req, res, next) {
        validator.validateQueryParams(req.query)
        .then((valid) => cityService.getByLatLonAndRadius(req.query.lat, req.query.lng))
        .then((result) => res.send(result))
        .catch((err) => {
            if (err.code) {
                if (err.code == "BadRequestError") {
                    return res.status(400).send(err);
                }
            }
            next(err);
        });
    }

    function getCityDetails (req, res, next) {
        logger.info("city details");
        cityService.findByCityId(req.params.city_id)
        .then((result) => res.send(result))
        .catch((err) => { 
            if (err.code) {
                if (err.code == "NotFoundError") {
                    return res.status(404).send(err);
                }
            }
            next(err);
        });
    }

    function getWeatherForCity (req, res, next) {
        logger.info("weather");
        cityService.getWeatherForCity(req.params.city_id)
        .then((result) => res.send(result))
        .catch((err) => {
            if (err.code) {
                if (err.code == "NotFoundError") {
                    return res.status(404).send(err);
                }
            }
            next(err);
        });
    }

    return {
        getAvailableCities,
        getCityDetails,
        getWeatherForCity
    };
};