import _ from 'lodash';

import { createNotionClientSDK, IRawNotionClientSDKTypes } from '../../../raw-notion-client-sdk';
import { IRawQueryRecord } from '../../raw-types';

import { IQueryParams } from './types';

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
) => {
  const notionClientSDK = createNotionClientSDK(notionTokenOrClientSDK);

  // 获取 database 中的记录
  const queryParams = {
    database_id: databaseId,
    filter: params?.rawQueryParams?.filter,
    // sorts: [
    //     { property: 'Featured', direction: 'descending' },
    //     { property: 'Published', direction: 'descending' },
    // ],
    // filter: {
    //   and: [
    //     { property: 'Published', checkbox: { equals: true } },
    //   ],
    // },
  };

  const t1 = Date.now();

  let res = await notionClientSDK.databases.query(queryParams);

  // 如果不是要全部拉取，则直接返回结果即可
  if (!params?.shouldFetchAllRecords) {
    return res;
  }

  // 如果没有更多分页，也直接返回结果
  if (!res.has_more || !res.next_cursor) {
    return res;
  }

  let rawRecords = (res.results || []) as unknown as IRawQueryRecord[];

  console.log(`分页请求第 ${1} 次，请求参数： ${JSON.stringify(queryParams)}`);
  console.log(`分页请求第 ${1} 次，返回数量： ${rawRecords.length} 条，耗时：${(Date.now() - t1).toFixed(0)} ms`);

  let i = 2;

  // 判断是否还有记录
  while (res.has_more && res.next_cursor) {
    if (i > 10) {
      throw new Error('query 一次性拉取的记录超过 1000 条，请筛选条件后再重试！');
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

    i++;
  }

  // 直接更新 results，从外部视角看就是一次性返回的
  res.results = rawRecords as any;

  return res;
};
