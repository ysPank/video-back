import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class PaginationSchema extends AppSchema {

  constructor({ CommonFieldsSchema }) {
    super();
    this.commonFieldsSchema = CommonFieldsSchema;
  }

  get query() {
    return Joi.object()
      .keys(this.commonFieldsSchema.pagination());
  }
}
