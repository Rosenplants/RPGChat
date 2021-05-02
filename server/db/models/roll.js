const { TEXT, STRING, ENUM, INTEGER } = require('sequelize');
const db = require('../db');

const Roll = db.define('roll', {
  userInput: {
    type: TEXT,
    allowNull: false,
  },
  totalValue: {
    type: INTEGER,
  },
});

Roll.beforeCreate((roll) => {
  const dieArr = roll.userInput.split(',');
  let total = 0;
  dieArr.forEach((die) => {
    const [amt, type] = die.split('d');
    for (let i = 0; i < amt; i++) {
      total += Math.ceil(Math.random() * type);
    }
  });
  roll.totalValue = total;
});

module.exports = Roll;
