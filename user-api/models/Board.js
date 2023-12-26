// models/Board.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database'); // sequelize는 이전에 정의한 연결 객체

const Board = sequelize.define('Board', {
  board_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING,
  },
  board_content: {
    type: DataTypes.TEXT,
  },
});

module.exports = Board;
