import { FindOptions } from 'sequelize';

export interface PaginationParams {
  limit: number;
  offset: number;
  orderBy: string;
  order: string;
}

export function paginationWithDefaults(params: PaginationParams): PaginationParams {
  return {
    limit: 10,
    offset: 0,
    orderBy: 'createdAt',
    order: 'DESC',
    ...params,
  };
}

export function sequelizePaginationWithDefaults(params: PaginationParams): Partial<FindOptions> {
  const paramsWithDefault = paginationWithDefaults(params);
  return {
    order: [[paramsWithDefault.orderBy, paramsWithDefault.order]],
    limit: paramsWithDefault.limit,
    offset: paramsWithDefault.offset,
  };
}
