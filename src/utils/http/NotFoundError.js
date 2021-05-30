import { CustomError } from './CustomError';
import { HttpStatusCodes } from '../../constants/statusCodes';

const DEFAULT_CODE = 'NOT_FOUND_ERROR';
const DEFAULT_MESSAGE = 'Entity not found';

export class NotFoundError extends CustomError {
  constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(HttpStatusCodes.NotFound, code, message, options);
  }
}

