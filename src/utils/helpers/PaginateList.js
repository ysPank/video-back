/**
 * Paginate list of items
 * @param {T[]}
 * @param {}
 * @returns {T[]}
 */
export const paginateList = (list, { limit, offset }) => list.slice(offset, offset + limit);
