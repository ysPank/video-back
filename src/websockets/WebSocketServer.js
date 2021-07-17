const io = require('socket.io')({
  path: '/socket'
});

import { SocketEvents } from '../constants/socketEvents';
import { acceptCall } from './handlers/acceptCall';
import { declineCall } from './handlers/declineCall';
import { handleDisconnect } from './handlers/handleDisconnect';
import { handleRequestCall } from './handlers/requestCall';

export default class WebSocketServer {
  constructor({ UsersService, CallsService, TwilioService }) {
    this.usersService = UsersService;
    this.callsService = CallsService;
    this.twilioService = TwilioService;
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

    this.io.on(SocketEvents.CONNECT, (socket) => {
      const user = this.usersService.handleUserCreation(socket.id, socket.request._query?.name);

      socket.broadcast.emit(SocketEvents.USER_JOINED, user);
      socket.emit(SocketEvents.MY_DATA, user);

      socket.on(SocketEvents.USER_UPDATED, handleRequestCall.bind(this, user));

      socket.on(SocketEvents.REQUESTED_CALL, handleRequestCall.bind(this, user));
      socket.on(SocketEvents.DECLINED_CALL, declineCall.bind(this, user));
      socket.on(SocketEvents.ACCEPTED_CALL, acceptCall.bind(this, user));

      socket.on(SocketEvents.OFFER, payload => this.emitEvent(payload.target, SocketEvents.OFFER, payload));
      socket.on(SocketEvents.ANSWER, payload => this.emitEvent(payload.target, SocketEvents.ANSWER, payload));
      socket.on(SocketEvents.ICE_CANDIDATE, ({ candidate, target }) => this.emitEvent(target, SocketEvents.ICE_CANDIDATE, candidate));

      socket.on(SocketEvents.DISCONNECT, handleDisconnect.bind(this, user));
    });
  }
}
