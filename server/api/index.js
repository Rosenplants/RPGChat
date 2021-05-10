const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/games', require('./games'));
router.use('/threads', require('./threads'));
router.use('/invites', require('./invites'));

router.use((req, res, next) => {
  const err = new Error('Route not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
