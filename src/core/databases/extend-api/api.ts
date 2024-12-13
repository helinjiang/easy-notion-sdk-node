import _ from 'lodash';

import { createNotionClientSDK, IRawNotionClientSDKTypes } from '../../../raw-notion-client-sdk';
import { IRawQueryRecord } from '../../raw-types';

import { IQueryParams, ICreateDatabaseProperties, ICreateInPageParameters } from './types';

/**
 * 查询 database 中的数据列表
 * https://developers.notion.com/reference/post-database-query
 * @param notionTokenOrClientSDK
 * @param databaseId
 * @param params
 * @returns
 */
export const query = async (
  notionTokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK,
  databaseId: string,
  params?: IQueryParams
): Promise<IRawNotionClientSDKTypes.QueryDatabaseResponse> => {
  const notionClientSDK = createNotionClientSDK(notionTokenOrClientSDK);

  // 获取 database 中的记录
  const queryParams: IRawNotionClientSDKTypes.QueryDatabaseParameters = _.merge(params?.rawQueryParams, {
    database_id: databaseId,
  });

  const t1 = Date.now();

  let res = await notionClientSDK.databases.query(queryParams);

  // 如果不是要全部拉取，则直接返回结果即可
  if (!params?.shouldFetchAllRecords) {
    return res;
  }

  // 如果是分页拉取，但当前没有更多分页，也直接返回结果
  if (!res.has_more || !res.next_cursor) {
    return res;
  }

  let rawRecords = (res.results || []) as unknown as IRawQueryRecord[];
  let i = 1;

  console.log(`\n分页请求开始...`);
  console.log(`分页请求第 ${i} 次，请求参数： ${JSON.stringify(queryParams)}`);
  console.log(`分页请求第 ${i} 次，返回数量： ${rawRecords.length} 条，耗时：${(Date.now() - t1).toFixed(0)} ms`);

  // 判断是否还有记录
  while (res.has_more && res.next_cursor) {
    i++;

    if (i > 10) {
      throw new Error('query 一次性拉取的记录超过 1000 条了，请筛选条件后再重试！');
    }

    const tx = Date.now();

    // 一定要设置 start_cursor 来分页拉取
    const queryParamsNew = _.merge({}, queryParams, { start_cursor: res.next_cursor });
    console.log(`分页请求第 ${i} 次，请求参数： ${JSON.stringify(queryParamsNew)}`);

    // 分页请求
    res = await notionClientSDK.databases.query(queryParamsNew);

    // 获取分页拉取的新的列表
    const rawRecordsNew = (res.results || []) as unknown as IRawQueryRecord[];
    console.log(`分页请求第 ${i} 次，返回数量： ${rawRecordsNew.length} 条，耗时：${(Date.now() - tx).toFixed(0)} ms`);

    // 合并
    rawRecords = _.union([], rawRecords, rawRecordsNew);
  }

  // 直接更新 results，从外部视角看就是一次性返回的
  res.results = rawRecords as any;
  console.log(`分页请求结束，返回数量： ${rawRecords.length} 条，总耗时：${(Date.now() - t1).toFixed(0)} ms`);

  return res;
};

/**
 * 创建一个 database
 * https://developers.notion.com/reference/create-a-database
 *
 * @param notionTokenOrClientSDK
 * @param parentPageId 文档挂载的父页面ID
 * @param titlePlainText 文档标题
 * @param properties 属性
 * @param parameters 额外的参数
 * @returns
 */
export const createInPage = async (
  notionTokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK,
  parentPageId: string,
  titlePlainText: string,
  properties: ICreateDatabaseProperties,
  parameters?: ICreateInPageParameters
): Promise<IRawNotionClientSDKTypes.CreateDatabaseResponse> => {
  const notionClientSDK = createNotionClientSDK(notionTokenOrClientSDK);

  const createPageParameters: IRawNotionClientSDKTypes.CreateDatabaseParameters = {
    parent: {
      page_id: parentPageId,
      type: 'page_id',
    },
    properties,
    title: [
      {
        text: {
          content: titlePlainText,
        },
      },
    ],
  };

  // 合并其他参数
  const mergedParams = _.merge(parameters, createPageParameters);

  return notionClientSDK.databases.create(mergedParams);
};

/**
 * 检索页面的信息
 * https://developers.notion.com/reference/retrieve-a-database
 *
 * @param notionTokenOrClientSDK
 * @param databaseId 文档 ID
 * @param filterProperties 指定要过滤出的属性，结果只会有指定的属性
 * @returns
 */
export const retrieve = async (
  notionTokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK,
  databaseId: string
): Promise<IRawNotionClientSDKTypes.GetDatabaseResponse> => {
  const notionClientSDK = createNotionClientSDK(notionTokenOrClientSDK);

  const getPageParameters: IRawNotionClientSDKTypes.GetDatabaseParameters = {
    database_id: databaseId,
  };

  // 合并其他参数
  const mergedParams = _.merge({}, getPageParameters);

  return notionClientSDK.databases.retrieve(mergedParams);
};
