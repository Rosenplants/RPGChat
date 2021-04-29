const { STRING, TEXT, BOOLEAN } = require('sequelize');
const db = require('../db');

const Character = db.define('character', {
  name: {
    type: STRING,
  },
  imageURL: {
    type: TEXT,
  },
  description: {
    type: TEXT,
  },
  isGM: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Character;
