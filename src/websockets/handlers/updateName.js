import { SocketEvents } from '../../constants/socketEvents';
import ChangeNameSchema from '../../schemas/ChangeNameSchema';
import { ValidationPipe } from '../../utils/validation/ValidationPipe';

const handleError = (socket, user, error) => {
  socket.emit(SocketEvents.MY_DATA, user);
  socket.emit(SocketEvents.CUSTOM_ERROR, error);
};

/**
 * Request call
 * @param {UserInstance} user
 * @param {object} payload
 * @param {string} payload.calleeId Id of user receiving the call
 * @returns {void}
 */
export async function updateName(user, socket, body) {
  console.log(body);
  if(user.name === body.name) return;

  if(this.usersService.getNames().includes(body.name)) return handleError(socket, user, 'Name must be unique');

  try {
    await ValidationPipe.validateAppSchema(new ChangeNameSchema(), { body });
  } catch(err) {
    socket.emit(SocketEvents.CUSTOM_ERROR, err.message);
    return console.log(err.message);
  }

  this.usersService.updateUserName(user.id, body.name);
  user.name = body.name;

  socket.broadcast.emit(SocketEvents.USER_UPDATED, user);
}
