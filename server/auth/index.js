const router = require('express').Router();

const User = require('../db/models/user');

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else if (err.name === 'SequelizeValidationError') {
      res.status(400).send('Please submit a valid email.');
    } else {
      next(err);
    }
  }
});

router.get('/user', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.use((req, res, next) => {
  const err = new Error('Route not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
