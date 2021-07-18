import { SocketEvents } from '../../constants/socketEvents';

/**
 * Request call
 * @param {UserInstance} user
 * @param {object} payload
 * @param {string} payload.calleeId Id of user receiving the call
 * @returns {void}
 */
export function handleRequestCall(user, { calleeId }) {
  const callerId = user.id;
  const createdCall = this.callsService.createPendingCall({ callerId, calleeId });

  if (!createdCall) return this.emitEvent(user.socketId, SocketEvents.DECLINED_CALL);

  [this.usersService.getById(callerId), this.usersService.getById(calleeId)]
    .forEach((updated, _, [caller, callee]) => {
      this.broadcastEvent(SocketEvents.USER_UPDATED, updated);
      this.emitEvent(updated.socketId, SocketEvents.REQUESTED_CALL, Object.assign(createdCall, { caller, callee }));
    });
}
