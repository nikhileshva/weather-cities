'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cities', {
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
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cities');
  }
};