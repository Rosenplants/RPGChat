const { STRING } = require('sequelize');
const db = require('../db');

const Invite = db.define('invite', {
  email: {
    type: STRING,
  },
});

module.exports = Invite;
