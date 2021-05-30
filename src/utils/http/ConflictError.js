import { CustomError } from './CustomError';
import { HttpStatusCodes } from '../../constants/statusCodes';

const DEFAULT_CODE = 'CONFLICT_ERROR';
const DEFAULT_MESSAGE = 'Conflict error';

export class ConflictError extends CustomError {
  constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(HttpStatusCodes.Conflict, code, message, options);
  }
}

