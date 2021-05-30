import * as Joi from 'joi';
import { BadRequestError } from '../http';

export class ValidationPipe {
  static validate(schema, data, options) {
    return Joi.validate(data, schema, options);
  }

  static async validateAppSchema(appSchema, request) {
    const options = {
      abortEarly: true,
      convert: true,
    };

    if (appSchema.body) {
      const result = ValidationPipe.validate(appSchema.body, request.body, options);
      if (result.error) {
        throw new BadRequestError(result.error.details[0].message, 'VALIDATION_ERROR');
      }

      request.body = result.value;
    }

    if (appSchema.query) {
      const result = ValidationPipe.validate(appSchema.query, request.query, options);
      if (result.error) {
        throw new BadRequestError(result.error.details[0].message, 'VALIDATION_ERROR');
      }

      request.query = result.value;
    }

    if (appSchema.params) {
      const result = ValidationPipe.validate(appSchema.params, request.params, options);
      if (result.error) {
        throw new BadRequestError(result.error.details[0].message, 'VALIDATION_ERROR');
      }

      request.params = result.value;
    }
  }
}
