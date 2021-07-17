import { CallStatuses } from '../../constants/callStatuses';
import { SocketEvents } from '../../constants/socketEvents';

/**
 * Handle accept call
 * @param {UserInstance} user
 * @param {object} payload
 * @param {string} payload.id Id call that will be cancelled
 * @returns {void}
 */
export function acceptCall(user, { id }) {
  let call = this.callsService.getById(id);

  if (user.id === call?.callerId || user.id === call?.calleeId) {
    call = this.callsService.updateCallStatus(id, CallStatuses.APPROVED);
    const { caller, callee } = call;

    [caller, callee].forEach(({ socketId }) => this.emitEvent(socketId, SocketEvents.ACCEPTED_CALL, call));
  }
}
