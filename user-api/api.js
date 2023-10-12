const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
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


app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
