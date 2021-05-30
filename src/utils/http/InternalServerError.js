import { CustomError } from './CustomError';
import { HttpStatusCodes } from '../../constants/statusCodes';

const DEFAULT_CODE = 'INTERNAL_SERVER_ERROR';
const DEFAULT_MESSAGE = 'Internal server error';

export class InternalServerError extends CustomError {
  constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(HttpStatusCodes.InternalError, code, message, options);
  }
}

