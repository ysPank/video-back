import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class ChangeNameSchema extends AppSchema {

  constructor() {
    super();

  }

  get body() {
    return Joi.object()
      .keys({
        name: Joi.string()
      });
  }
}
