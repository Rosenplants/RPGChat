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

// invite a user to a group
router.post('/:groupId/users', async (req, res, next) => {
  try {
    let user;
    let invite;
    let inviteExists;

    const group = await Group.findByPk(req.params.groupId);
    const players = await group.getUsers();

    if (req.body.username) {
      user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (!user) {
        const noUsernameError = new Error('No such user exists');
        noUsernameError.name = 'NoUserWithUsername';
        throw noUsernameError;
      }
    } else if (req.body.email) {
      user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
    }

    if (!user) {
      inviteExists = await Invite.findOne({
        where: {
          groupId: req.params.groupId,
          email: req.body.email,
        },
      });
      if (inviteExists !== null) {
        const invitePending = new Error();
        invitePending.name = 'UserAlreadyInvited';
        throw invitePending;
      }
      invite = await Invite.create({ email: req.body.email });
    } else if (players.some((player) => player.id === user.id)) {
      const invitedError = new Error();
      invitedError.name = 'UserIsAlreadyPlayer';
      throw invitedError;
    } else {
      inviteExists = await Invite.findOne({
        where: {
          groupId: req.params.groupId,
          inviteeId: user.id,
        },
      });
      if (inviteExists !== null) {
        const invitePending = new Error();
        invitePending.name = 'UserAlreadyInvited';
        throw invitePending;
      }
      invite = await Invite.create();
      await invite.setInvitee(user);
    }

    invite.setInviter(req.body.inviter);
    invite.setGroup(group);

    res.sendStatus(201);
  } catch (error) {
    if (error.name === 'NoUserWithUsername') {
      res.status(400).send('There is no user with that username');
    } else if (error.name === 'UserIsAlreadyPlayer') {
      res.status(400).send('User has already joined this game');
    } else if (error.name === 'UserAlreadyInvited') {
      res.status(400).send('User has already been invited to this game');
    } else {
      next(error);
    }
  }
});
