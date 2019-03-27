const db = require('../db/sequelize');
const sequelize = db.sequelize;
const Cities = require('../models/cities').Cities;

module.exports = app => {
    let logger = app.helpers.logger;
    function getByLatLonAndRadius(lat, lon, boundingBox) {
        return new Promise((resolve, reject) => {
            logger.info(boundingBox);
            let selectors = "SELECT city_id, name, country, lat, lon";
            // let distSelector = ", acos(sin(:lat)*sin(radians(lat)) + cos(:lat)*cos(radians(lat))*cos(radians(lon)-:lon)) * :R As D";
            let where1 = " from cities where lat between :minLat AND :maxLat AND lon BETWEEN :minLon and :maxLon";
            // let where2 = " And acos(sin(:lat)*sin(radians(lat)) + cos(:lat)*cos(radians(lat))*cos(radians(lon)-:lon)) * :R < :rad";
            // let orderBy = " Order by D";
            let queryStr = selectors + where1;
            
            sequelize.query(queryStr, 
                {replacements: {minLat: boundingBox.minLat, maxLat: boundingBox.maxLat, 
                    minLon: boundingBox.minLon, maxLon: boundingBox.maxLon, 
                    lat: lat, lon: lon, R: boundingBox.earthRadius, rad: boundingBox.radius},
                type: sequelize.QueryTypes.SELECT })
            .then(data => {
                logger.info(`Repository result: ${data.length}`);
                return resolve(data);
            });
        });
        
    }

    function getByCityId(cityId) {
        return new Promise((resolve, reject) => {
            Cities.findOne({where: {city_id: cityId}})
            .then(data => {
                if (data == null) {
                    logger.error(`City id ${cityId} does not exist`);
                    let errorObj = {
                        code: "NotFoundError",
                        message: "Entity not found"
                    };
                    return reject(errorObj);
                }
                
                let result = {
                    id: data.city_id,
                    name: data.name,
                    lat: data.lat,
                    lng: data.lon
                };
                return resolve(result);
            })
            .catch((err) => reject(err));
        });
    }

    return {
        getByLatLonAndRadius,
        getByCityId
    };
}