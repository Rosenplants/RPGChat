const router = require('express').Router();
const {
  models: { Group, User, Character, Message },
} = require('../db');

module.exports = router;

// Get All Users FOR ADMIN ONLY LATER
// router.get('/')

// To Get ONE User
// router.get('/:id')

// Get the games a user is a member of
router.get('/:id/games', async (req, res, next) => {
  try {
    const games = await Group.findAll({
      include: [
        {
          model: User,
        },
      ],
      where: {
        '$users.id$': req.params.id,
      },
    });
    res.json(games);
  } catch (error) {
    next(error);
  }
});

// Create a message instance when a user sends a message
router.post('/:id/messages', async (req, res, next) => {
  try {
    const { threadId, content } = req.body;
    const message = await Message.create({ content });
    message.setUser(req.params.id);
    console.log(typeof threadID);
    message.setThread(threadId);
    res.json(message);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/games/:gameId/characters', async (req, res, next) => {
  try {
    const character = await Character.findOne({
      where: {
        userId: req.params.userId,
        groupId: req.params.gameId,
      },
    });
    if (!character) {
      const err = new Error(`This user doesn't have access to this game.`);
      err.status = 424;
      throw err;
    } else {
      res.json(character);
    }
  } catch (error) {
    next(error);
  }
});

router.use((req, res, next) => {
  const err = new Error('Route not found.');
  err.status = 404;
  next(err);
});
