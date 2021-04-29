const { STRING, ENUM } = require('sequelize');
const db = require('../db');

const Thread = db.define('thread', {
  name: {
    type: STRING,
  },
  type: {
    type: ENUM(['group', 'private']),
  },
});

module.exports = Thread;
