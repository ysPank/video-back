import { SocketEvents } from '../../constants/socketEvents';

/**
 * Handle decline or cancel call,
 * will be only sent to opponent
 * @param {UserInstance} user
 * @param {object} payload
 * @param {string} payload.id Id call that will be cancelled
 * @returns {void}
 */
export function declineCall(user, { id }) {
  const call = this.callsService.getById(id);

  if (user.id === call?.callerId || user.id === call?.calleeId) {
    const { callerId, calleeId, caller, callee } = this.callsService.cancelCall(id);

    this.emitEvent([caller, callee].find(participant => participant.id !== user.id).socketId, SocketEvents.DECLINED_CALL);

    [calleeId, callerId]
      .map(userId => this.usersService.updateUserStatus(userId))
      .forEach(updated => this.broadcastEvent(SocketEvents.USER_UPDATED, updated));
  }
}
