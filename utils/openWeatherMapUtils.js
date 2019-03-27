let request = require("request-promise");
let moment = require("moment");
module.exports = app => {
    let logger = app.helpers.logger;

    function getWeatherData(cityId) {
        return new Promise((resolve, reject) => {
            let url = getUrl(cityId);
            let options = {
                method: 'GET',
                uri: url,
                resolveWithFullResponse: true
            };
            request(options)
            .then((response) => {
                // logger.info(response);
                let res = JSON.parse(response.body);
                // logger.info(res.weather);
                let result = {
                    type: res.weather[0].main,
                    type_description: res.weather[0].main,
                    sunrise: moment(res.sys.sunrise*1000).toISOString(),
                    sunset: moment(res.sys.sunset*1000).toISOString(),
                    temp: res.main.temp,
                    temp_min: res.main.temp_min,
                    temp_max: res.main.temp_max,
                    humidity: res.main.humidity,
                    pressure: res.main.pressure,
                    clouds_percent: res.clouds.all,
                    wind_speed: res.wind.speed
                };
                return resolve(result);
            }).catch((err) => {
                let errorObj = {
                    code: "OpenWeatherServiceError",
                    message: err.message
                };
                return reject(errorObj);
            });
        });
    }

    function getUrl(cityId) {
        let baseUrl = process.env.OPENWEATHER_BASE_URL;
        let url = new URL(baseUrl);
        url.searchParams.append('id', cityId);
        url.searchParams.append('APPID', process.env.OPENWEATHER_KEY);
        return url.href;
    }

    return {
        getWeatherData
    };
};