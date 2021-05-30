import socketEvents from '../constants/socketEvents';
import { clearFalsy } from '../utils/helpers/ClearFalsy';

const SocketFactory = (type, data) => {
  let message;
  switch (type) {
    case socketEvents.REGISTRATION_CONFIRMED:
      message = 'New user has completed registration. Please confirm.';
      break;
    case socketEvents.EMAIL_CONFIRMED:
      message = 'Your email has been confirmed by Odmen.';
      break;
    case socketEvents.USER_BLOCKED:
      message = 'You have been blocked. Sorry not sorry.';
      break;
    case socketEvents.CHAT_INVITE:
      message = 'You have been invited to chat.';
      break;
    case socketEvents.CHAT_ACCEPTED:
      message = 'One of your chats has been accepted, check it out.';
      break;
    case socketEvents.NEW_MESSAGE:
      message = data;
      break;
    case socketEvents.AUTH_SUCCESS:
      message = 'Authorization successful.';
      break;
    case socketEvents.AUTH_FAIL:
      message = 'Invalid session.';
      break;
    case socketEvents.PARSE_ERROR:
      message = 'Event should be valid JSON with data and type fields.';
      break;
    case socketEvents.INVALID_EVENT:
      message = 'Such event does not exist';
      break;
  }

  return JSON.stringify(clearFalsy({ type, data: message }));
};

export default SocketFactory;
