const Joi = require("joi");

module.exports = app => {
    function validateQueryParams(params) {
        return new Promise((resolve, reject) => {
            const querySchema = Joi.object().keys({
                lat: Joi.number().required(),
                lng: Joi.number().required()
            });
            querySchema.validate(params, {abortEarly: false})
            .then((data) => resolve(data))
            .catch((err) => {
                let errorObj = {
                    code: "BadRequestError",
                    message: "lat/lng required"
                }
                return reject(errorObj);
            });
        });
    }

    return {
        validateQueryParams
    };
};