'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
	const Cities = require('../data/city.list.json');
	let citiesArr = [];
	Cities.forEach(element => {
		citiesArr.push({
			city_id: element.id,
			name: element.name,
			country: element.country,
			lat: element.coord.lat,
			lon: element.coord.lon,
			createdAt: new Date(),
      updatedAt: new Date()
		});
	});
	return queryInterface.bulkInsert('cities', citiesArr);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
