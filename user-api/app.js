const express = require('express');
const app = express();
const port = 3000;

const usersRouter = require('./usersRouter');
const boardsRouter = require('./boardsRouter');
const followRouter = require('./followRouter');
const authRouter = require('./authRouter');

app.use(express.json());

app.use('/users', usersRouter);
app.use('/boards', boardsRouter);
app.use('/follow', followRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
