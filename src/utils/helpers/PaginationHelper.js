export class PaginationHelper {
  static buildPagination(query, count) {
    return {
      nextOffset: query.offset + query.limit,
      totalCount: count
    };
  }
}
