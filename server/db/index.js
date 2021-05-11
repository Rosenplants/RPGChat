const db = require('./db');
const User = require('./models/user');
const Group = require('./models/group');
const Thread = require('./models/thread');
const Message = require('./models/message');
const Character = require('./models/character');
const Scene = require('./models/scene');
const Roll = require('./models/roll');
const Invite = require('./models/invite');

// Associations
User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Thread, { through: 'members' });
Thread.belongsToMany(User, { through: 'members' });

User.belongsToMany(Group, { through: Character });
Group.belongsToMany(User, { through: Character });

User.hasMany(Scene);
Scene.belongsTo(User);

Scene.hasMany(Message);
Message.belongsTo(Scene);

Roll.hasMany(Message);
Message.belongsTo(Roll);

Group.hasMany(Thread);
Thread.belongsTo(Group);

Thread.hasMany(Message);
Message.belongsTo(Thread);

Invite.belongsTo(User, { as: 'inviter' });
Invite.belongsTo(User, { as: 'invitee' });

Group.hasMany(Invite);
Invite.belongsTo(Group);

module.exports = {
  db,
  models: {
    User,
    Group,
    Thread,
    Message,
    Scene,
    Character,
    Roll,
    Invite,
  },
};
