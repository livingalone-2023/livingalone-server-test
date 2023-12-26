const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'livingalone',
});

router.post('/login', (req, res) => {
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

module.exports = router;
