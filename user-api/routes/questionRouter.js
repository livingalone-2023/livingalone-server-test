const express = require('express');
const router = express.Router();


// 질문 등록 API
router.post('/', async (req, res) => {
  try {
    const { title, content, user_id} = req.body;

    // 질문 등록
    const question = await Question.create({
      title,
      content,
      user_id,
    });

    res.json({ message: '질문이 등록되었습니다.', question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 질문 및 작성자 정보 조회 API
router.get('/:question_id', async (req, res) => {
  try {
    const question_id = req.params.question_id;

    // 질문 및 작성자 정보 조회
    const questionWithAuthor = await Question.findOne({
      where: { id: question_id },
      include: [{ model: User, as: 'author', attributes: ['id', 'user_name'] }],
    });

    if (!questionWithAuthor) {
      return res.status(404).json({ error: '질문을 찾을 수 없습니다.' });
    }

    res.json({ question: questionWithAuthor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
