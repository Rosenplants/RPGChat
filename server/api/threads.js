const router = require('express').Router();
const {
  models: { Message, User, Scene, Roll },
} = require('../db');

module.exports = router;

router.get('/:id/messages', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: {
        threadId: +req.params.id,
      },
      include: [
        {
          model: User,
        },
        { model: Scene, as: 'scene' },
        { model: Roll, as: 'roll' },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
});
