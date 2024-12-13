import { QueryDatabaseParameters } from '../../../raw-notion-client-sdk/types';

export interface IQueryParams {
  // 是否获取所有的 records ，如果是分页拉取的，则按分页拉取
  shouldFetchAllRecords?: boolean;

  // 原始的请求参数
  // 过滤器详见 https://developers.notion.com/reference/post-database-query-filter
  rawQueryParams?: Pick<QueryDatabaseParameters, 'filter_properties' | 'sorts' | 'filter' | 'page_size' | 'archived'>;
}
