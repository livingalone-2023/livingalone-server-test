// models/Question.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const User = require('./User');

const Question = sequelize.define('Question', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
  // 'user_id'는 작성자 정보를 나타내는 외래키
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  },
  // 작성일 추가
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// 'User' 모델과 'Question' 모델 간의 관계 설정
Question.belongsTo(User, { foreignKey: 'user_id', as: 'author' });

module.exports = Question;
