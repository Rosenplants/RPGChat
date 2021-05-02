const router = require('express').Router();
const {
  models: { Group, Thread },
} = require('../db');

module.exports = router;

// Get All Groups FOR ADMIN ONLY LATER
// router.get('/')

// To Get ONE Group
// router.get('/:id')

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
