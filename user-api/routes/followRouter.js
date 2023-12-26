const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'livingalone',
});

router.post('/', (req, res) => {
  // 팔로우 정보 저장 API
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

router.get('/:user_id', (req, res) => {
  // 사용자가 팔로우한 목록 가져오는 API
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

module.exports = router;
