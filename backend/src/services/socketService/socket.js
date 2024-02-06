// socket.js
import { Server } from 'socket.io';

import updateOnlineStatus from '../../utils/updateOnlineStatusUtils.js';

export default (server) => {
  // server cors
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    },
  });

  io.on('connection', (socket) => {
    let userId;

    socket.on('client_id', (id) => {
      userId = id;
      updateOnlineStatus(userId, socket.id, true);

      setTimeout(() => {
        io.emit('message', `user id${userId}online`);
        console.log('send');
      }, 2000);
    });
    socket.on('disconnect', () => {
      updateOnlineStatus(userId, socket.id, false);
      io.emit('message', `user id${userId}offline`);
      console.log(`Користувач відключився: ${socket.id}`);
    });
  });
};
