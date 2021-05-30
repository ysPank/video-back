import * as Joi from 'joi';
import { MAX_LIMIT, MIN_LIMIT, DEFAULT_LIMIT, MIN_OFFSET } from '../constants';
import { AppSchema } from '../utils/validation/AppSchema';

export default class CommonFieldsSchema extends AppSchema {

  pagination() {
    return {
      limit: Joi.number()
        .integer()
        .min(MIN_LIMIT)
        .max(MAX_LIMIT)
        .default(DEFAULT_LIMIT)
        .description('Amount of entities to return')
        .optional(),
      offset: Joi.number()
        .integer()
        .min(MIN_OFFSET)
        .default(MIN_OFFSET)
        .description('Pagination offset')
        .optional()
    };
  }

  order(fields) {
    return {
      orderBy: Joi
        .string()
        .valid(['createdAt', fields])
        .description(`Order fields: ${['createdAt', fields].join(', ')}`)
        .default('createdAt')
        .optional(),
      orderType: Joi
        .string()
        .valid('asc', 'desc')
        .description('Order types: asc, desc')
        .default('desc')
        .optional()
    };
  }

  search() {
    return {
      query: Joi
        .string()
        .description('Word for search')
        .allow('')
        .optional(),
    };
  }
}
