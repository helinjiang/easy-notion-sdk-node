import _ from 'lodash';

import { createNotionClientSDK, IRawNotionClientSDKTypes } from '../../../raw-notion-client-sdk';
import { IRawQueryRecord } from '../../raw-types';

import { IChildrenListParams, IGetAppendBlocksRes } from './types';

export const childrenList = async (
  notionTokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK,
  blockId: string,
  params?: IChildrenListParams
) => {
  const notionClientSDK = createNotionClientSDK(notionTokenOrClientSDK);

  // 获取记录
  const queryParams = {
    block_id: blockId,
  };

  const t1 = Date.now();

  let res = await notionClientSDK.blocks.children.list(queryParams);

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
    res = await notionClientSDK.blocks.children.list(queryParamsNew);

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

/**
 * 在页面中追加 blocks
 * @param pageId
 * @param appendBlocks
 * @returns
 */
export const childrenAppend = async (
  notionTokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK,
  pageId: string,
  appendBlocks: any[]
): Promise<any[]> => {
  // 如果 appendBlocks 数量大于 100，则需要分页，否则会报如下错误
  // body failed validation: body.children.length should be ≤ `100`, instead was `170`.
  //
  // 详见： https://developers.notion.com/reference/patch-block-children
  // There is a limit of 100 block children that can be appended by a single API request.
  // Arrays of block children longer than 100 will result in an error.

  const notionClientSDK = createNotionClientSDK(notionTokenOrClientSDK);

  console.log(`一共需要追加的blocks数量：${appendBlocks.length}`);
  if (appendBlocks.length <= 100) {
    const res = await notionClientSDK.blocks.children.append({
      block_id: pageId,
      children: appendBlocks,
    });

    return [res];
  }

  // 大于 100 个就要分批追加
  const group = _.chunk(appendBlocks, 100);
  console.log(`需要分为${group.length}组，分批请求`);

  const responseArr: any[] = [];

  for (let index = 0; index < group.length; index++) {
    const children = group[index];
    console.log(`第${index + 1}组，blocks 数量一共${children.length}个`);

    const res = await notionClientSDK.blocks.children.append({
      block_id: pageId,
      children: children,
    });

    responseArr.push(res);
  }

  return responseArr;
};

/**
 * 从一个页面中 copy 所有的 blocks 到另外一个页面
 */
export const copyAllBlocksOfPageFromOneToAnother = async (
  notionTokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK,
  sourcePageId: string,
  distPageId: string
) => {
  const { list: appendBlocks } = await getAppendBlocks(notionTokenOrClientSDK, sourcePageId);

  const distRes = await childrenAppend(notionTokenOrClientSDK, distPageId, appendBlocks);

  return [appendBlocks, distRes];
};

/**
 * 获得一个页面中可以去追加到其他页面的 blocks
 * @param notionTokenOrClientSDK
 * @param pageId
 * @returns
 */
export const getAppendBlocks = async (
  notionTokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK,
  pageId: string
): Promise<IGetAppendBlocksRes> => {
  const notionClientSDK = createNotionClientSDK(notionTokenOrClientSDK);

  const sourceRes = await childrenList(notionClientSDK, pageId, {
    shouldFetchAllRecords: true,
  });

  const appendBlocks: any[] = [];
  const warningTips: string[] = [];

  // 部分 block 是不支持 copy ，或者需要处理下格式才行
  sourceRes.results.forEach((one: any) => {
    // 先检查是否支持 copy，如果不支持，则进行忽略，但是需要做一下提醒
    const unSupportCopyTips = getUnSupportCopyTips(one);
    if (unSupportCopyTips) {
      warningTips.push(`忽略 pageId=${pageId} 中的 blockId=${one.id}，原因：${unSupportCopyTips}`);

      return;
    }

    // 同步块，且如果是 copy 的是源同步块，则复制的时候要修改为 duplicate 同步块的数据格式
    if (one.type === 'synced_block' && !one.synced_block.synced_from) {
      appendBlocks.push({
        type: one.type,
        synced_block: {
          synced_from: {
            type: 'block_id',
            block_id: one.id,
          },
        },
      });
      return;
    }

    // 其他 block 保持原状进行请求 copy，但可能还是会存在无法 copy 的情况，需要更改数据格式，或者转成同步块
    appendBlocks.push(one);
  });

  return {
    list: appendBlocks,
    warningTips,
  };
};

/**
 * 获得不支持 copy 同步块的 tips，如果返回空字符串，则说明是支持 copy 的
 * @param block
 * @returns
 */
export const getUnSupportCopyTips = (block: any): string => {
  // 分栏
  if (block.type === 'column_list') {
    return `[${block.id}] 暂不支持 type = ${block.type} 的同步块，请手动将其转为同步块`;
  }

  // 图片，只支持外部的image，而不支持 notion自己托管的 image（即 type=file）
  if (block.type === 'image') {
    if (block.image.type !== 'external') {
      return `[${block.id}] 暂不支持 type = ${block.type} 且图片类型为 ${block.image.type} 的同步块，请手动转为同步块，或者直接用图片链接方式`;
    }

    // 'body failed validation: body.children[95].image.external.url.length should be ≤ `2000`, instead was `234426`.'
    const imageUrlLength = block.image.external?.url?.length || 0;
    if (imageUrlLength > 2000) {
      // 但发现一个奇怪的情况，某个页面内容中明明没有图片了，但是查接口回来还是有图片
      return `[${block.id}] 当前图片类型为 base64 ，长度为 ${imageUrlLength} ，超过 2000 了，请重新上传`;
    }
  }

  // 表格
  if (block.type === 'table') {
    // body failed validation: body.children[43].table.children should be defined, instead was `undefined`.
    return `[${block.id}] 暂不支持 type = ${block.type} 的表格，请手动将其转为同步块`;
  }

  // 其他 block 默认都 ok，但可能还是会存在无法 copy 的情况，到时候都建议转成同步块
  return '';
};
