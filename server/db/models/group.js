const { STRING } = require('sequelize');
const db = require('../db');
const Thread = require('./thread');

const Group = db.define('group', {
  name: {
    type: STRING,
    allowNull: false,
  },
});

Group.afterCreate(async (group) => {
  const threads = await Promise.all([
    Thread.create({ name: 'Game Room', type: 'group' }),
    Thread.create({ name: 'OOC Lounge', type: 'group' }),
  ]);

  await group.addThread(threads[0]);
  await group.addThread(threads[1]);
});

module.exports = Group;
