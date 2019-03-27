"use strict";

module.exports = app => {
    let router = require("express").Router();
    let cityWeather = app.controllers.cityWeatherController;

    router.route("/cities").get((req, res, next) => {
        return cityWeather.getAvailableCities(req, res, next);
    });

    router.route("/cities/:city_id").get((req, res, next) => {
        return cityWeather.getCityDetails(req, res, next);
    });

    router.route("/cities/:city_id/weather").get((req, res, next) => {
        return cityWeather.getWeatherForCity(req, res, next);
    });

    return router;
};