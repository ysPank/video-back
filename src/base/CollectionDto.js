import { PaginationDto } from '../base/PaginationDto';

export const generateCollection = (dto) =>
  class CollectionDto {
    constructor(users, pagination) {
      if (users.length) {
        this.data = users.map(user => new dto(user));
      } else {
        this.data = [];
      }

      this.pagination = new PaginationDto(pagination);
    }

    static get schema() {
      return {
        title: `${dto.schema.title} Collection`,
        type: 'object',
        required: [
          'data',
          'pagination'
        ],
        properties: {
          data: {
            type: 'array',
            items: dto.schema
          },
          pagination: PaginationDto.schema,
        }
      };
    }
  };
