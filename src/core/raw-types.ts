import { IDatabaseTypes } from './databases';

/**
 * notion api 提供的原始的 query 记录
 * 详见： https://developers.notion.com/reference/post-database-query
 */
export interface IRawQueryRecord {
  object: "page" | "database" | "block";
  id: "string";
  created_time: "string";
  last_edited_time: "string";
  parent: {
    type: "database_id",
    database_id: string;
  } | {
    type: "page_id",
    page_id: string;
  },
  archived: boolean,
  properties: Record<string, IDatabaseTypes.IPropertyHandlerTypes.IRawDefine>,
  url: string,

  // block 才有
  has_children?: boolean,

  // block 才有
  type?: string,

  [key: string]: any;
}
