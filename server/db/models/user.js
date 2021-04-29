const { STRING, BOOLEAN } = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  email: {
    type: STRING,
    validate: {
      isEmail: true,
    },
  },
  username: {
    type: STRING,
  },
  password: {
    type: STRING,
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
