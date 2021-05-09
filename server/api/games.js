const router = require('express').Router();
const {
  models: { Group, Thread, User },
} = require('../db');

module.exports = router;

// Get All Groups FOR ADMIN ONLY LATER
// router.get('/')

// Create a new group
router.post('/', async (req, res, next) => {
  try {
    const { name, userId } = req.body;
    const game = await Group.create({ name });
    await game.addUser(userId, { through: { isGM: true } });
    res.json(game).status(201);
  } catch (error) {
    next(error);
  }
});

// To Get ONE Group
router.get('/:id', async (req, res, next) => {
  try {
    const game = await Group.findByPk(req.params.id);
    res.json(game);
  } catch (error) {
    next(error);
  }
});

// Get ALL of One Group's Threads
router.get('/:groupId/threads', async (req, res, next) => {
  try {
    const threads = await Thread.findAll({
      where: {
        groupId: req.params.groupId,
      },
    });
    res.json(threads);
  } catch (error) {
    next(error);
  }
});

// Associate a new user with a group
router.post('/:groupId/users', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: req.body,
    });

    if (!user) throw new Error('No such user exists');

    await user.addGroup(req.params.groupId);

    res.sendStatus(201);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send('User has already been invited');
    } else {
      next(error);
    }
  }
});
