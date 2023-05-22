const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db.js');

const User = sequelize.define('User', {
  // Google ID
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // Full name
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Email address
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // Profile picture URL
  picture: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
});

module.exports = User;