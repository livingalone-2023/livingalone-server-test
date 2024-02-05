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

// 답변 작성 API
router.post('/answer', (req, res) => {
  const { user_id, question_id, content } = req.body;

  const query = 'INSERT INTO answers (user_id, question_id, content) VALUES (?, ?, ?)';
  db.query(query, [user_id, question_id, content], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: '답변이 작성되었습니다.' });
  });
});

// 답변 조회 API
router.get('/answers/:question_id', (req, res) => {
  const question_id = req.params.question_id;

  const query = 'SELECT * FROM answers WHERE question_id = ?';
  db.query(query, [question_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ answers: results });
  });
});

// 답변 채택 API
router.put('/answer/:answer_id/accept', (req, res) => {
  const answer_id = req.params.answer_id;

  const updateQuery = 'UPDATE answers SET accepted = true WHERE answer_id = ?';
  db.query(updateQuery, [answer_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: '답변이 채택되었습니다.' });
  });
});

// 채택된 답변 조회 API
router.get('/accepted-answers/:question_id', (req, res) => {
  const question_id = req.params.question_id;

  const query = 'SELECT * FROM answers WHERE question_id = ? AND accepted = true';
  db.query(query, [question_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ acceptedAnswers: results });
  });
});

module.exports = router;
