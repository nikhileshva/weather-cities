const db = require('../db/sequelize');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

const Cities = sequelize.define('cities', {
    city_id: {
        type: Sequelize.BIGINT,
        primaryKey: true
    }, 
    name: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    lat: {
        type: Sequelize.DOUBLE
    },
    lon: {
        type: Sequelize.DOUBLE
    }
});
module.exports = {
    Cities
};

