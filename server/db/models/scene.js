const { TEXT, BOOLEAN } = require('sequelize');
const db = require('../db');

const Scene = db.define('scene', {
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
