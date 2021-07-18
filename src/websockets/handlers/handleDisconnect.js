import { SocketEvents } from '../../constants/socketEvents';

/**
 * Handle disconnect
 * @param {UserInstance} user
 * @returns {void}
 */
export function handleDisconnect(user) {
  this.usersService.deleteUser(user.id);
  this.broadcastEvent(SocketEvents.USER_LEFT, user.id);

  const call = this.callsService.getCallByParticipant(user.id);

  if (call) {
    const { caller, callee, id } = call;

    this.callsService.cancelCall(id);

    const otherUser = [caller, callee].find(participant => participant.id !== user.id);

    this.emitEvent(otherUser.socketId, SocketEvents.DECLINED_CALL);

    const updatedOtherUser = this.usersService.updateUserStatus(otherUser.id);
    this.broadcastEvent(SocketEvents.USER_UPDATED, updatedOtherUser);
  }
}
