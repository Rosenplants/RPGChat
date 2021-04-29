/* eslint-disable no-console */
const app = require('./app');
const { db } = require('./db');

const PORT = process.env.PORT || 4242;

const init = async () => {
  try {
    await db.sync();
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => {
      console.log('The road ahead is dangerous.');
      console.log(`Take this port, ${PORT}, with you.`);
    });
  } catch (ex) {
    console.error(ex);
  }
};

init();
