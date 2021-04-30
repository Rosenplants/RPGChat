/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const { STRING, BOOLEAN } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const User = db.define('user', {
  email: {
    type: STRING,
    validate: {
      isEmail: true,
    },
  },
  username: {
    type: STRING,
  },
  password: {
    type: STRING,
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;

// Check if the password is right
User.prototype.correctPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Create a token for them
User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

// authenticate email and password
User.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect email/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

// Find user instance by token
User.findByToken = async (token) => {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw Error('Sneaky sneaky');
    }
    return user;
  } catch (err) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

// Hashing the Password
const hashPassword = async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => {
  users.forEach(hashPassword);
});
