import { Client } from '@notionhq/client';

import * as INotionClientSDKTypes from './types';

export type INotionTokenOrClientSDK = string | Client;

export type INotionClientSDK = Client;

export { INotionClientSDKTypes };

/**
 * 初始化一个 notion client sdk
 * 
 * @param notionTokenOrClientSDK 
 * @returns 
 */
export const createNotionClientSDK = (
  notionTokenOrClientSDK: INotionTokenOrClientSDK,
): INotionClientSDK => {
  // 如果传入的是一个字符串，表明是 token 值，则初始化它
  if (typeof notionTokenOrClientSDK === 'string') {
    return new Client({ auth: notionTokenOrClientSDK });
  }

  // 如果是 Client 对象，则直接返回
  if (notionTokenOrClientSDK instanceof Client) {
    return notionTokenOrClientSDK;
  }

  // 其他情况抛出错误
  throw new Error('[createNotionClientSDK] Unsupported notionTokenOrClientSDK=' + notionTokenOrClientSDK);
};

