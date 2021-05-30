import * as Joi from 'joi';
import convert from 'joi-to-json-schema';

export class AppSchema {
  get body() { return null; }
  get query() { return null; }
  get params() {
    return Joi.object()
      .keys({
        version: Joi
          .string()
          .required()
          .default('v1')
      });
  }

  toSchema() {
    return {
      requestBody: this.configRequestBody(),
      parameters: this.configRequestParams()
    };
  }

  configRequestBody() {
    const parameters = {};
    if (this.body) {
      parameters.content = {
        'application/json': {
          schema: convert(this.body)
        }
      };
    }
    return parameters;
  }

  configRequestParams() {
    const parameters = [];
    if (this.params) {
      const convertedSchema = convert(this.params);
      Object.keys(convertedSchema.properties)
        .forEach((key) => {
          parameters.push({
            in: 'path',
            name: key,
            required: convertedSchema.required && convertedSchema.required.indexOf(key) >= 0,
            schema: convertedSchema.properties[key],
            description: convertedSchema.properties[key].description || '',
          });
        });
    }
    if (this.query) {
      const convertedSchema = convert(this.query);
      Object.keys(convertedSchema.properties)
        .forEach((key) => {
          parameters.push({
            in: 'query',
            name: key,
            required: convertedSchema.required && convertedSchema.required.indexOf(key) >= 0,
            schema: convertedSchema.properties[key],
            description: convertedSchema.properties[key].description || '',
          });
        });
    }
    return parameters;
  }
}
