const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const crypto = require('crypto');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'livingalone',
});

router.post('/', (req, res) => {
  // 사용자 정보 저장 API
  const { user_id, user_name, user_password = crypto.createHash('sha512').update(user_password).digest('base64'), user_email } = req.body;

  const query = 'INSERT INTO users (user_id, user_name, user_password, user_email) VALUES (?, ?, ?, ?)';
  db.query(query, [user_id, user_name, user_password, user_email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: '사용자 정보가 성공적으로 저장되었습니다.' });
  });
});

router.post('/signup', (req, res) => {
  // 회원가입 중복 확인 API
  let { user_id, user_name, user_password, user_email } = req.body;
  user_password = crypto.createHash('sha512').update(user_password).digest('base64');

  const checkQuery = 'SELECT * FROM users WHERE user_id = ? OR user_email = ?';
  db.query(checkQuery, [user_id, user_email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      res.status(400).json({ error: '이미 가입된 사용자입니다.' });
    } else {
      const insertQuery = 'INSERT INTO users (user_id, user_name, user_password, user_email) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [user_id, user_name, user_password, user_email], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({ message: '회원가입이 완료되었습니다.' });
      });
    }
  });
});

module.exports = router;
