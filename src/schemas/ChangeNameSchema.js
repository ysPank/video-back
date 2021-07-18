import * as Joi from 'joi';

import { NAME_MAX_LENGTH } from '../constants/validations';
import { AppSchema } from '../utils/validation/AppSchema';

export default class ChangeNameSchema extends AppSchema {
  get body() {
    return Joi.object()
      .keys({
        name: Joi
          .string()
          .max(NAME_MAX_LENGTH)
      });
  }
}
