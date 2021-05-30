import { CustomError } from './CustomError';
import { HttpStatusCodes } from '../../constants/statusCodes';

const DEFAULT_CODE = 'GATEWAY_TIMEOUT_ERROR';
const DEFAULT_MESSAGE = 'Gateway timeout error';

export class GatewayTimeOutError extends CustomError {
  constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(HttpStatusCodes.GatewayTimeOut, code, message, options);
  }
}

