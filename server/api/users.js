const router = require('express').Router();
const {
  models: { Group, User, Character, Message, Roll, Scene },
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
    await message.setUser(req.params.id);
    await message.setThread(threadId);
    res.json(
      await Message.findOne({
        where: {
          id: message.id,
        },
        include: [
          {
            model: User,
          },
          { model: Scene, as: 'scene' },
          { model: Roll, as: 'roll' },
        ],
      })
    );
  } catch (error) {
    next(error);
  }
});

router.post('/:id/rolls', async (req, res, next) => {
  try {
    const { threadId, rolls } = req.body;
    const roll = await Roll.create({ userInput: rolls });
    const message = await Message.create();
    await message.setRoll(roll);
    await message.setThread(threadId);
    await message.setUser(req.params.id);
    res.json(
      await Message.findOne({
        where: {
          id: message.id,
        },
        include: [
          {
            model: User,
          },
          { model: Scene, as: 'scene' },
          { model: Roll, as: 'roll' },
        ],
      })
    );
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
