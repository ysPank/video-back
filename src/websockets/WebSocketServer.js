const io = require('socket.io')({
  path: '/socket'
});
import SocketFactory from './SocketEventsFactory';

export default class WebSocketServer {
  constructor({ UsersService }) {
    this.usersService = UsersService;

    this.pool = [];
  }

  notifyUser(id, ...rest) {
    const socket = this.userPool[id];
    socket.send(SocketFactory(...rest));
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

    this.io.on('connection', () => {
      console.log('conntected');
    });
  }
}
