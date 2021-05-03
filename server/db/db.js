const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const config = {
  logging: false,
};

// if (process.env.DATABASE_URL) {
//   config.dialectOptions = {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   };
// }

// process.env.DATABASE_URL ||
const db = new Sequelize(`postgres://localhost:5432/${databaseName}`, config);

module.exports = db;
