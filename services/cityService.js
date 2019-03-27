module.exports = app => {
    const logger = app.helpers.logger;
    const citiesRepository = app.repositories.citiesRepository;
    const geoUtils = app.utils.geoUtils;
    const openMapUtils = app.utils.openWeatherMapUtils;

    function getByLatLonAndRadius(lat, lon) {
        return new Promise((resolve, reject) => {
            logger.info("getting radius lat lon");
            geoUtils.calculateBoundingRadius(parseFloat(lat), parseFloat(lon))
            .then((boundingBox) => citiesRepository.getByLatLonAndRadius(parseFloat(lat), parseFloat(lon), boundingBox))
            .then((queryRes) => resolve(queryRes));
        });
    }

    function findByCityId(cityId) {
        return new Promise((resolve, reject) => {
            logger.info("getting city info");
            citiesRepository.getByCityId(cityId)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });
    }

    function getWeatherForCity(cityId) {
        return new Promise((resolve, reject) => {
            citiesRepository.getByCityId(cityId)
            .then((result) => openMapUtils.getWeatherData(cityId))
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });
    }

    return {
        getByLatLonAndRadius,
        findByCityId,
        getWeatherForCity
    }
}