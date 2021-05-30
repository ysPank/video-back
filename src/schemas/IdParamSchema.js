import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class IdParamSchema extends AppSchema {
  get params() {
    return Joi.object()
      .keys({
        id: Joi
          .number()
          .integer()
          .required()
      })
      .concat(super.params);
  }
}
