import { IRawNotionClientSDKTypes } from '../../../raw-notion-client-sdk';

export interface IQueryParams {
  // 是否获取所有的 records ，如果是分页拉取的，则按分页拉取
  shouldFetchAllRecords?: boolean;

  rawQueryParams?: {
    filter_properties?: Array<string>;
    sorts?: Array<
      | {
          property: string;
          direction: 'ascending' | 'descending';
        }
      | {
          timestamp: 'created_time' | 'last_edited_time';
          direction: 'ascending' | 'descending';
        }
    >;
    filter?: any;
    page_size?: number;
    archived?: boolean;
  };
}

export type ICreateInPageParameters = Partial<
  Pick<IRawNotionClientSDKTypes.CreatePageParameters, 'properties' | 'icon' | 'cover' | 'children'>
>;

export type ICreateInDatabaseParameters = Partial<
  Pick<IRawNotionClientSDKTypes.CreatePageParameters, 'properties' | 'icon' | 'cover' | 'children'>
>;

export type IUpdateParameters = Partial<
  Pick<
    IRawNotionClientSDKTypes.UpdatePageParameters,
    'page_id' | 'properties' | 'icon' | 'cover' | 'archived' | 'in_trash'
  >
> & {
  title?: string;
};
