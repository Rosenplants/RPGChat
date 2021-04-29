const { STRING } = require('sequelize');
const db = require('../db');

const Group = db.define('group', {
  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Group;
