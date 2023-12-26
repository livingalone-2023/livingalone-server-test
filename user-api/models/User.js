// models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database'); // sequelize는 이전에 정의한 연결 객체

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});











module.exports = User;
