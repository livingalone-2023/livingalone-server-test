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

router.get('/', (req, res) => {
  // 게시판 글 목록 가져오는 API
  const query = 'SELECT board_no, board_title, user_name FROM board';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ result: results });
  });
});

router.post('/write', (req, res) => {
  // 게시판 글 쓰는 API
  const { board_title, user_id, user_name, board_content } = req.body;

  const query = 'INSERT INTO board (board_title, user_id, user_name, board_content) VALUES (?, ?, ?, ?)';
  db.query(query, [board_title, user_id, user_name, board_content], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: '게시되었습니다.' });
  });
});

module.exports = router;
