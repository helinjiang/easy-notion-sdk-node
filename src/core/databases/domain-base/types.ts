
import { IExtendAPITypes } from '../extend-api';
import { IRawQueryRecord } from '../../raw-types';

export type IFetchRemoteParams = IExtendAPITypes.IQueryParams;

/**
 * 请求 database 的基本信息
 */
export interface IReqInfo {
  /**
   * database 的页面地址
   */
  url: string;

  /**
   * database 的名字
   */
  name?: string;

  /**
   * 其他信息
   */
  extra?: Record<string, string>;
}

export interface IVerifyResultItem {
  pageId: string;
  pageUrl: string;
  title: string;
  warningTips: string[];
}


// database 的信息
export interface IParsedData<T> {
  // databse id
  databaseId: string;

  // 页面 url 地址
  databaseUrl: string;

  // 标题
  title: string;

  // 序列化之后的记录的列表，也就是子页面的列表
  parsedRecords: T[];

  // 原始 database 信息
  rawDatabaseInfo: IRawQueryRecord;

  // 原始 database 的子页面的信息列表
  rawRecords: IRawQueryRecord[];
}

// database 中的记录信息，即子页面的信息
export interface IParsedSubPageRecord<T> {
  // 归属的父级 database id
  parentDatabaseId: string;

  // 页面ID，属于这个 database 的子页面
  pageId: string;

  // 页面 url 地址
  pageUrl: string;

  // 是否已归档
  archived: boolean;

  // 属性
  properties: T;
}