module.exports = (io) => {
  io.use((socket, next) => {
    const { username, userid } = socket.handshake.auth;
    if (!username) {
      return next(new Error('invalid username'));
    }
    socket.username = username;
    socket.userid = userid;
    next();
  });

  io.on('connection', (socket) => {
    socket.on('send message', ({ content, to }) => {
      console.log('sending message to: ', to);
      socket.to(to).emit('receive message', {
        content,
        from: { username: socket.username, userid: socket.userid },
      });
    });

    socket.on('joinRoom', ({ room }) => {
      socket.join(room);
      console.log(`I have joined ${room}`);
      console.log(socket.rooms);
    });

    socket.on('leaveRoom', ({ room }) => {
      socket.leave(room);
      socket.removeAllListeners(room);
      console.log(`I have left ${room}`);
      console.log(socket.rooms);
    });
  });
};
