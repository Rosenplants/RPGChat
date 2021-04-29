const { TEXT, BOOLEAN, STRING } = require('sequelize');
const db = require('../db');

const Scene = db.define('scene', {
  name: {
    type: STRING,
    unique: true,
  },
  text: {
    type: TEXT,
  },
  imageURL: {
    type: TEXT,
  },
  audioURL: {
    type: TEXT,
  },
  isDefault: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Scene;
