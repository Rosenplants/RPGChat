/* eslint-disable no-console */
const socketImp = require('socket.io');
const mySocket = require('./socket');
const app = require('./app');
const { db } = require('./db');

const PORT = process.env.PORT || 4242;

const init = async () => {
  try {
    await db.sync();
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () => {
      console.log('The road ahead is dangerous.');
      console.log(`Take this port, ${PORT}, with you.`);
    });

    // Initialize a new instace of socket.io with the server
    const io = socketImp(server);

    // Pass the socket.io instace to a function in another file that handles its events
    mySocket(io);
  } catch (ex) {
    console.error(ex);
  }
};

init();
