import { Client } from '@notionhq/client';

import * as IRawNotionClientSDKTypes from './types';

export { IRawNotionClientSDKTypes };

/**
 * 原始的 notion client sdk 对象，只是重命名了一下
 * 其他用法详见： https://www.npmjs.com/package/@notionhq/client
 */
export const RawNotionClientSDK = Client;

/**
 * 初始化一个 notion client sdk
 *
 * @param tokenOrClientSDK
 * @returns
 */
export const createNotionClientSDK = (
  tokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK,
  options?: IRawNotionClientSDKTypes.ClientOptions
): IRawNotionClientSDKTypes.IClientSDK => {
  // 如果传入的是一个字符串，表明是 token 值，则初始化它
  if (typeof tokenOrClientSDK === 'string') {
    return new Client({
      ...(options || {}),
      auth: tokenOrClientSDK,
    });
  }

  // 如果是 Client 对象，则直接返回
  if (tokenOrClientSDK instanceof Client) {
    return tokenOrClientSDK;
  }

  // 其他情况抛出错误
  throw new Error('[createNotionClientSDK] Unsupported tokenOrClientSDK=' + tokenOrClientSDK);
};
