module.exports = app => {
    const logger = app.helpers.logger;
    const TO_RADIAN = 0.0174532925;
    const TO_DEGREE = 57.2957795;
    const EARTH_RADIUS = 6371.01; // kms
    const RADIUS = 10; // kms
    
    function degreeToRadian(degree) {
        return degree * TO_RADIAN;
    }

    function radianToDegree(radian) {
        return radian * TO_DEGREE;
    }

    function calculateBoundingRadius(lat, lon) {
        return new Promise((resolve, reject) => {
            logger.info("calculating bb");
            let deltaLon = radianToDegree(Math.asin(RADIUS / EARTH_RADIUS) / Math.cos(degreeToRadian(lat)));
            let minLon = parseFloat(lon) - parseFloat(deltaLon);
            logger.info(typeof deltaLon);
            let maxLon = parseFloat(lon) + parseFloat(deltaLon);
            let deltaLat = radianToDegree(RADIUS / EARTH_RADIUS);
            let minLat = parseFloat(lat) - parseFloat(deltaLat);
            let maxLat = parseFloat(lat) + parseFloat(deltaLat);

            let boundingBox = {
                minLat: minLat,
                maxLat: maxLat,
                minLon: minLon,
                maxLon: maxLon,
                radius: RADIUS,
                earthRadius: EARTH_RADIUS
            };
            logger.info(`calculated: {minLat}`);
            return resolve(boundingBox);
        });
    }

    return {
        calculateBoundingRadius
    };
};