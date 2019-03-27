"use strict";

let Sequelize = require('sequelize');
let _ = require('lodash');

const db = {};
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`User: ${process.env.DB_USERNAME}`);
console.log(`Name: ${process.env.DB_NAME}`);
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
	host:process.env.DB_HOST,
	dialect:'postgres',
	pool:{
		max:5,
		min:0,
		idle:100000
	},
	benchmark:true,
	logging:false
});

// const modelsDir = path.normalize(`${__dirname}/../models`);

// fs.readdirSync(modelsDir)
// .filter(file => (file.indexOf('.') !== 0) && (file.indexOf('.map') === -1))
// // import model files and save model names
// .forEach((file) => {
// 	console.log(`Loading model file ${file}`); // eslint-disable-line no-console
// 	const model = sequelize.import(path.join(modelsDir, file));
// 	db[model.name] = model;
// });

sequelize
.sync()
.then(() => {
	console.log('Database synchronized'); // eslint-disable-line no-console
})
.catch((error) => {
	if (error) console.log('An error occured %j', error); // eslint-disable-line no-console
});

    // assign the sequelize variables to the db object and returning the db.
module.exports = _.extend({
	sequelize,
	Sequelize,
}, db);
