const router = require('express').Router();
const {
  models: { Group, Thread, User },
} = require('../db');
const Invite = require('../db/models/invite');

module.exports = router;

// Get All Groups FOR ADMIN ONLY LATER
// router.get('/')

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

router.post('/:groupId/users', async (req, res, next) => {
  try {
    let user;
    let invite;

    if (req.body.username) {
      user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (!user) throw new Error('No such user exists');
    } else if (req.body.email) {
      user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
    }

    if (!user) {
      invite = await Invite.create({ email: req.body.email });
    } else {
      invite = await Invite.create();
      await invite.setInvitee(user);
    }

    invite.setInviter(req.body.inviter);
    invite.setGroup(req.params.groupId);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});
