import { v4 as uuid } from 'uuid';

import { CallStatuses } from '../constants/callStatuses';
import { UserStatuses } from '../constants/userStatuses';

export default class CallsService {
  constructor({ UsersService }) {
    /**
     * @typedef Array<CallInstance>
     */
    this.calls = [];
    this.usersService = UsersService;
    this.usersService = UsersService;
  }

  /**
   * Create invitation
   * @param {string} body.callerId
   * @param {string} body.calleeId
   * @returns {CallInstance}
  */
  createPendingCall({ callerId, calleeId }) {
    if (this.canCallBeCreated([callerId, calleeId])) {
      const call = Object.assign(
        {
          status: CallStatuses.PENDING,
          id: uuid()
        },
        { callerId, calleeId }
      );

      this.calls.push(call);

      [calleeId, callerId].forEach(id => this.usersService.updateUserStatus(id, UserStatuses.PENDING));
      return call;
    }
  }

  /**
   * Check if users are not engaged in other calls
   * @param {Array<string>}
   * @returns {boolean}
   */
  canCallBeCreated(ids) {
    return !this.calls.find(call => ids.include(call.callerId) || ids.include(call.calleeId));
  }

  /**
   * Clear all invitations by user
   * @param {string} id
   * @returns {void}
  */
  clearCalls(id) {
    this.calls = this.calls.filter(({ callerId, calleeId }) => callerId !== id && calleeId != id);
  }

  /**
   * Cancel or decline pending call
   * @param {string} id
   * @returns {CallInstance}
   */
  cancelCall(id) {
    const removedIndex = this.calls.findIndex(({ id: callId }) => callId === id);
    const removedCall = this.calls[removedIndex];

    this.calls.splice(removedIndex, 1);
    return removedCall;
  }
}
