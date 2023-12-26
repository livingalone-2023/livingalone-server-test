// models/Following.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database'); // sequelize는 이전에 정의한 연결 객체

const Following = sequelize.define('Following', {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  following_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Following;
