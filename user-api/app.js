const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
const port = 3000;

// Sequelize 연결 설정
const sequelize = new Sequelize( 'livingalone', 'root','0000', {
  host: 'localhost',
  dialect: 'mysql'
});

// 모델 정의
const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});

// 데이터베이스 동기화 및 서버 실행
sequelize.sync()
  .then(() => {
    console.log('데이터베이스 연결 성공');
    app.listen(port, () => {
      console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
    });
  })
  .catch(err => {
    console.error('데이터베이스 연결 실패', err);
  });

// 기존 코드 계속 사용
const usersRouter = require('./routes/usersRouter');
const boardsRouter = require('./routes/boardsRouter');
const followRouter = require('./routes/followRouter');
const authRouter = require('./routes/authRouter');

app.use(express.json());

app.use('/users', usersRouter);
app.use('/boards', boardsRouter);
app.use('/follow', followRouter);
app.use('/auth', authRouter);
