const io = require('socket.io')({
  path: '/socket'
});
import { SocketEvents } from '../constants/socketEvents';

export default class WebSocketServer {
  constructor({ UsersService }) {
    this.usersService = UsersService;

    this.pool = [];
  }

  closeConnection({ role, id } = {}) {
    if (!role) return;
    const pool = this.pools[role];

    if (pool) {
      pool[id] = undefined;
    }
  }

  init(server) {
    this.io = io.attach(server);

    this.io.on('connection', (socket) => {
      const user = this.usersService.handleUserCreation(socket.id);

      socket.broadcast.emit({ event: SocketEvents.USER_JOINED, data: user });
      socket.emit({ event: SocketEvents.MY_DATA, data: user });

      socket.on('disconnecting', () => {
        this.usersService.deleteUser(user.id);
        socket.broadcast.emit({ event: SocketEvents.USER_LEFT, data: user });
      });
    });
  }
}
