const { ENUM, TEXT } = require('sequelize');
const db = require('../db');

const Message = db.define('message', {
  content: {
    type: TEXT,
  },
  status: {
    type: ENUM(['sent', 'draft']),
    defaultValue: 'sent',
  },
});

module.exports = Message;
