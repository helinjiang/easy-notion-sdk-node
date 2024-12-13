import { IRawNotionClientSDKTypes } from '../../../raw-notion-client-sdk';

export interface IQueryParams {
  // 是否获取所有的 records ，如果是分页拉取的，则按分页拉取
  shouldFetchAllRecords?: boolean;

  // 原始的请求参数
  // 过滤器详见 https://developers.notion.com/reference/post-database-query-filter
  rawQueryParams?: Pick<
    IRawNotionClientSDKTypes.QueryDatabaseParameters,
    'filter_properties' | 'sorts' | 'filter' | 'page_size' | 'archived'
  >;
}

export type ICreateDatabaseProperties = IRawNotionClientSDKTypes.CreateDatabaseParameters['properties'];

export type ICreateInPageParameters = Partial<
  Pick<IRawNotionClientSDKTypes.CreateDatabaseParameters, 'icon' | 'cover' | 'description' | 'is_inline'>
>;
