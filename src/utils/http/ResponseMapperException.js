import { InternalServerError } from './InternalServerError';

const DEFAULT_CODE = 'RESPONSE_MAPPING_ERROR';

export class ResponseMapperException extends InternalServerError {
  constructor(e) {
    super(DEFAULT_CODE, e.message, {});
  }
}

