export class PaginationDto {
  constructor(pagination) {
    this.nextOffset = pagination.nextOffset;
    this.totalCount = pagination.totalCount;
  }

  static get schema() {
    return {
      type: 'object',
      required: [
        'nextOffset',
        'totalCount'
      ],
      properties: {
        nextOffset: {
          type: 'integer',
          description: 'Next offset'
        },
        totalCount: {
          type: 'integer',
          description: 'Total amount of records'
        }
      }
    };
  }
}
