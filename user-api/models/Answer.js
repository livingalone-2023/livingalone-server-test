// models/Answer.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const User = require('./User');
const Question = require('./Question');

const Answer = sequelize.define('Answer', {
  content: {
    type: DataTypes.TEXT,
  },
  accepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'answers', // 테이블 이름 명시
});

Answer.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Answer.belongsTo(Question, { foreignKey: 'question_id', as: 'question' });

module.exports = Answer;
