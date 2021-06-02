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
    socket.on('send message', ({ message, to }) => {
      socket.to(to).emit('receive message', {
        message,
        from: message.user,
      });
    });

    socket.on('joinRoom', ({ room }) => {
      socket.join(room);
    });

    socket.on('leaveRoom', ({ room }) => {
      socket.leave(room);
    });
  });
};
