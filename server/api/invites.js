const router = require('express').Router();
const {
  models: { Group, User, Invite },
} = require('../db');

module.exports = router;

router.put('/:id', async (req, res, next) => {
  try {
    const invite = await Invite.findByPk(req.params.id, {
      include: [{ model: Group }],
    });

    const group = await Group.findOne({
      where: {
        name: invite.group.name,
      },
    });

    if (invite.inviteeId) {
      group.addUser(invite.inviteeId);
    } else {
      const user = User.findOne({
        where: {
          email: invite.email,
        },
      });
      group.addUser(user);
    }

    await invite.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const invite = await Invite.findByPk(req.params.id);
    await invite.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
