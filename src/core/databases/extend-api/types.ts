export interface IQueryParams {
  // 是否获取所有的 records ，如果是分页拉取的，则按分页拉取
  shouldFetchAllRecords?: boolean;

  rawQueryParams?: {
    filter_properties?: Array<string>;
    sorts?: Array<{
      property: string;
      direction: "ascending" | "descending";
    } | {
      timestamp: "created_time" | "last_edited_time";
      direction: "ascending" | "descending";
    }>;

    // 过滤器详见 https://developers.notion.com/reference/post-database-query-filter
    filter?: any;

    page_size?: number;
    archived?: boolean;
  };
}