const { STRING, TEXT, BOOLEAN } = require('sequelize');
const db = require('../db');

const Character = db.define('character', {
  name: {
    type: STRING,
  },
  imageURL: {
    type: TEXT,
    defaultValue:
      'https://www.jing.fm/clipimg/detail/116-1168390_baidu-person-outline-comments-human-head-icon-png.png',
  },
  description: {
    type: TEXT,
    defaultValue: '',
  },
  isGM: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Character;
