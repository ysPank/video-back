import { CustomError } from './CustomError';
import { HttpStatusCodes } from '../../constants/statusCodes';

const DEFAULT_CODE = 'BAD_REQUEST_ERROR';
const DEFAULT_MESSAGE = 'Bad request error';

export class BadRequestError extends CustomError {
  constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(HttpStatusCodes.BadRequest, code, message, options);
  }
}

