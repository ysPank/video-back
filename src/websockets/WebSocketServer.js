const io = require('socket.io')({
  path: '/socket'
});

import { CallStatuses } from '../constants/callStatuses';
import { SocketEvents } from '../constants/socketEvents';

export default class WebSocketServer {
  constructor({ UsersService, CallsService }) {
    this.usersService = UsersService;
    this.callsService = CallsService;
  }

  /**
   * Send event to specific socket
   * @param {string} id
   * @param {string} event
   * @param {object} data
   */
  emitEvent(id, event, data) {
    this.io.sockets.to(id).emit(event, data);
  }

  /**
   * Broadcast event to every available socket
   * @param {string} event
   * @param {object} data
   */
  broadcastEvent(event, data) {
    this.io.sockets.emit(event, data);
  }

  init(server) {
    this.io = io.attach(server);

    this.io.on('connection', (socket) => {
      const user = this.usersService.handleUserCreation(socket.id);

      socket.broadcast.emit(SocketEvents.USER_JOINED, user);
      socket.emit(SocketEvents.MY_DATA, user);

      /**
       * Request call
       */
      socket.on(SocketEvents.REQUESTED_CALL, ({ calleeId }) => {
        const callerId = user.id;
        const createdCall = this.callsService.createPendingCall({ callerId, calleeId });

        if (!createdCall) return socket.emit(SocketEvents.DECLINED_CALL);

        [this.usersService.getById(callerId), this.usersService.getById(calleeId)]
          .forEach((updated, _, [caller, callee]) => {
            this.broadcastEvent(SocketEvents.USER_UPDATED, updated);
            this.emitEvent(updated.socketId, SocketEvents.REQUESTED_CALL, Object.assign(createdCall, { caller, callee }));
          });
      });

      /**
       * Handle decline or cancel call
       */
      socket.on(SocketEvents.DECLINED_CALL, ({ id }) => {
        const { callerId, calleeId } = this.callsService.cancelCall(id);

        this.emitEvent([callerId, calleeId].find(userId => userId !== user.id).socketId, SocketEvents.DECLINED_CALL);

        [calleeId, callerId]
          .map(userId => this.usersService.updateUserStatus(userId))
          .forEach(updated => this.broadcastEvent(SocketEvents.USER_UPDATED, updated));
      });

      socket.on(SocketEvents.ACCEPTED_CALL, ({ id }) => {
        const call = this.callsService.updateCallStatus(id, CallStatuses.APPROVED);

        console.log(call);

        const { caller, callee } = call;

        [caller, callee].forEach(({ socketId }) => this.emitEvent(socketId, SocketEvents.ACCEPTED_CALL, call));
      });

      socket.on('disconnecting', () => {
        this.usersService.deleteUser(user.id);
        socket.broadcast.emit(SocketEvents.USER_LEFT, { data: user });
      });
    });
  }
}
