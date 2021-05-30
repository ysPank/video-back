import { CustomError } from './CustomError';
import { HttpStatusCodes } from '../../constants/statusCodes';

const DEFAULT_CODE = 'UNPROCESSABLE_ERROR';
const DEFAULT_MESSAGE = 'Unprocessable entity error';

export class UnprocessableError extends CustomError {
  constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(HttpStatusCodes.Unprocessable, code, message, options);
  }
}

