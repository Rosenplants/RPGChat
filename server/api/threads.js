const router = require('express').Router();
const {
  models: { Message },
} = require('../db');

module.exports = router;

router.get('/:id/messages', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: {
        threadId: +req.params.id,
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
});
