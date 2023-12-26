const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'livingalone',
});

db.connect(err => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    return;
  }
  console.log('MySQL 연결 성공');
});

app.use(express.json());

// 사용자 정보 저장 API
app.post('/users', (req, res) => {
  const { user_id, user_name, user_password, user_email } = req.body;

  const query = 'INSERT INTO users (user_id, user_name, user_password, user_email) VALUES (?, ?, ?, ?)';
  db.query(query, [user_id, user_name, user_password, user_email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: '사용자 정보가 성공적으로 저장되었습니다.' });
  });
});

// 팔로우 정보 저장 API
app.post('/follow', (req, res) => {
  const { user_id, following_id } = req.body;

  // MySQL 데이터베이스에 팔로우 정보 추가
  const query = 'INSERT INTO following (user_id, following_id) VALUES (?, ?)';
  db.query(query, [user_id, following_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: '팔로우되었습니다.' });
  });
});

// 사용자가 팔로우한 목록 가져오는 API
app.get('/following/:user_id', (req, res) => {
  const user_id = req.params.user_id;

  // MySQL 데이터베이스에서 사용자가 팔로우한 목록 가져오기
  const query = 'SELECT following_id FROM following WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const followingList = results.map(result => result.following_id);
    res.json({ following: followingList });
  });
});

// 게시판 글 목록 가져오는 API (모든 사용자가 접근 가능)
app.get('/board', (req, res) => { // 게시판 페이지 누르면 default로 목록이 나와야하니까 /board
  const query = 'SELECT board_no, board_title, user_name FROM board';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ result: results });
  });
});

// 게시판 글 쓰는 API
app.post('/board/write', (req, res) => {
  const {board_title, user_id, user_name, board_content} = req.body;

  // MySQL 데이터베이스에 게시글 추가
  const query = 'INSERT INTO board (board_title, user_id, user_name, board_content) VALUES (?, ?, ?, ?)';
  db.query(query, [board_title, user_id, user_name, board_content], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: '게시되었습니다.' });
  });
});


app.post('/login', (req, res) => {
  const { user_id, user_password } = req.body;

  // MySQL 데이터베이스에서 사용자 정보 확인
  const query = 'SELECT * FROM users WHERE user_id = ? AND user_password = ?';
  db.query(query, [user_id, user_password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      // 유효한 사용자인 경우
      const user = results[0]; // 첫 번째 사용자 정보를 가져옴

      
      res.json({ message: '로그인 성공', user: user });
    } else {
      
      res.status(401).json({ error: '로그인 실패' });
    }
  });
});


app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
