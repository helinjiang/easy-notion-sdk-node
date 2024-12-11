import { createNotionClientSDK, IRawNotionClientSDKTypes } from '../../../raw-notion-client-sdk';
import { getStandardTitle } from '../../../helpers/platform-rule';

import { IRawQueryRecord } from '../../raw-types';

import { IPropertyHandlerTypes } from '../property-handler';
import { extendAPI } from '../extend-api';

import { getPageIdInUrl } from './help';
import { IFetchRemoteParams, IReqInfo, IVerifyResultItem } from './types';

/**
 * database 基类
 */
export default class DomainBase<T_DATA, T_RECORD> {
  public notionClientSDK: IRawNotionClientSDKTypes.IClientSDK;

  /**
   * 请求 database 的基础信息
   */
  public reqInfo: IReqInfo;

  /**
   * 实际的数据信息
   */
  public data: T_DATA | null;

  /**
   * database id，从 url 中获取，不是 uuid 形式，即没有携带 - 线
   */
  public databaseIdInUrl: string;

  constructor(notionTokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK, reqInfo: IReqInfo) {
    this.notionClientSDK = createNotionClientSDK(notionTokenOrClientSDK);

    this.databaseIdInUrl = getPageIdInUrl(reqInfo.url);
    this.reqInfo = reqInfo;

    this.data = null;
  }

  public async fetchRemoteAndCache(params?: IFetchRemoteParams): Promise<void> {
    this.data = await this.fetchRemote(params);
  }

  public async fetchRemote(params?: IFetchRemoteParams): Promise<T_DATA> {
    // 获取 database 中的记录

    // 是否需要拉取所有的记录，目前的场景下，大部分是需要拉取所有记录的，因此，默认值为 true
    const shouldFetchAllRecords =
      typeof params?.shouldFetchAllRecords === 'boolean' ? params?.shouldFetchAllRecords : true;
    const databaseQueryRes = await extendAPI.query(this.notionClientSDK, this.databaseIdInUrl, {
      ...params,
      shouldFetchAllRecords,
    });
    const rawRecords = (databaseQueryRes.results || []) as unknown as IRawQueryRecord[];

    // 获取 database 的字段定义等信息，方便未来获取相关的字段值
    const databaseRetrieveRes = await this.notionClientSDK.databases.retrieve({
      database_id: this.databaseIdInUrl,
    });

    const rawDatabaseInfo = (databaseRetrieveRes || {}) as IRawQueryRecord;

    return {
      databaseId: rawDatabaseInfo.id,

      databaseUrl: rawDatabaseInfo.url || '',

      title: rawDatabaseInfo.title[0].plain_text,

      rawDatabaseInfo,

      rawRecords,

      // 序列化处理数据看的记录
      parsedRecords: this.convertToParsedRecords(rawDatabaseInfo.properties, rawRecords),
    } as T_DATA;
  }

  /**
   * 自我检查，将一些不符合的情况暴露出来，以便人工去修正
   * @param handlePage
   * @param handleBlocks
   * @returns
   */
  public async verify(
    handlePage?: (record: T_RECORD) => Promise<string[]>,
    handleBlocks?: (blocks: any[], record: T_RECORD) => Promise<string[]>
  ): Promise<IVerifyResultItem[]> {
    const results: IVerifyResultItem[] = [];

    console.log(`\n即将开始检查: ${this.reqInfo.name} ，页面地址： ${this.reqInfo.url}`);
    const t1 = Date.now();

    // 获取所有的子页面的信息
    if (!this.data) {
      await this.fetchRemoteAndCache();
    }

    console.log(`\n成功获取 database 所有记录，耗时： ${(Date.now() - t1).toFixed(0)} ms`);

    // 依次（并发）进行请求这些页面，获取其 block 等信息，如果分析有问题，则记录到结果中
    // @ts-ignore
    const parsedRecords = this.data.parsedRecords || [];
    console.log(`共 ${parsedRecords.length} 条记录，开始检查...`);

    for (let i = 0; i < parsedRecords.length; i++) {
      const listT1 = Date.now();
      const record = parsedRecords[i];
      const desc = `[${record.pageId}](${record.properties.title})`;
      const warningTips: string[] = [];

      console.log(`\n${i + 1}/${parsedRecords.length}： ${desc}`);

      try {
        // 检查标题是否包含了编号，如果没有，需要补上编号
        const customId = record.properties.customId;
        if (customId) {
          const originalTitle = record.properties.title;
          const standardTitle = getStandardTitle(originalTitle, record.properties.customId);

          if (originalTitle !== standardTitle) {
            console.log(`标题不规范，当前： ${originalTitle} ， 理论上： ${standardTitle}`);

            try {
              await this.updatePageTitle(record.pageId, standardTitle);
              console.log(`标题更新成功`);

              // 注意更新下这里，采用新的标题
              record.properties.title = standardTitle;
            } catch (err) {
              this.addWarningTips(`标题更新失败，错误信息： ${err ? (err as Error).message : err}`, warningTips);
            }
          }
        }

        // 检查 page 的其他属性
        if (typeof handlePage === 'function') {
          this.addWarningTips(await handlePage(record), warningTips);
        }

        // 检查 blocks
        if (typeof handleBlocks === 'function') {
          const blockChildrenListRes = await this.notionClientSDK.blocks.children.list({
            block_id: record.pageId,
          });

          this.addWarningTips(await handleBlocks(blockChildrenListRes.results, record), warningTips);
        }
      } catch (err) {
        this.addWarningTips(`检查出现异常： ${err ? (err as Error).message : err}`, warningTips);
      }

      if (warningTips.length) {
        results.push({
          pageId: record.pageId,
          pageUrl: record.pageUrl,
          title: record.properties.title,
          warningTips,
        });
      }

      console.log(`耗时： ${(Date.now() - listT1).toFixed(0)} ms`);
    }

    console.log(
      `\n检查完成，总耗时${(Date.now() - t1).toFixed(0)} ms，不合格情况为: ${results.length}/${parsedRecords.length}`
    );

    return results;
  }

  /**
   * 将 database 中的原始记录数据解析为一个标准的数据记录
   * @param rawPropertyDefineMap
   * @param rawRecord
   */
  public parseForOne(
    rawPropertyDefineMap: Record<string, IPropertyHandlerTypes.IRawDefine>,
    rawRecord: IRawQueryRecord
  ): T_RECORD {
    console.error('Should override parseForOne', rawPropertyDefineMap, rawPropertyDefineMap, rawRecord);
    throw new Error('Should override parseForOne');
  }

  /**
   * 更新 page 的标题
   * @param pageId
   * @param newTitle
   * @returns
   */
  public async updatePageTitle(pageId: string, newTitle: string) {
    return this.notionClientSDK.pages.update({
      page_id: pageId,
      properties: {
        title: [
          {
            text: {
              content: newTitle,
            },
          },
        ],
      },
    });
  }

  /**
   * 更新 page 的 property 为 Text 的值
   *
   * @param pageId
   * @param propertyName 字段名
   * @param newValue
   * @returns
   */
  public async updatePagePropertyText(pageId: string, propertyName: string, newValue: string) {
    return this.notionClientSDK.pages.update({
      page_id: pageId,
      properties: {
        [propertyName]: [
          {
            text: {
              content: newValue,
            },
          },
        ],
      },
    });
  }

  public getRecordByPageId(pageId: string): T_RECORD | null {
    // @ts-ignore
    const parsedRecords = this.data?.parsedRecords || [];
    return parsedRecords.find((record: any) => record.pageId === pageId) || null;
  }

  private convertToParsedRecords(
    rawPropertyDefineMap: Record<string, IPropertyHandlerTypes.IRawDefine>,
    rawRecords: IRawQueryRecord[]
  ): T_RECORD[] {
    const parsedRecords: T_RECORD[] = [];

    for (let i = 0; i < rawRecords.length; i++) {
      const rawRecord = rawRecords[i];

      try {
        parsedRecords.push(this.parseForOne(rawPropertyDefineMap, rawRecord));
      } catch (err) {
        console.error(`Parse error`, rawRecord, err ? (err as Error).message : err);
      }
    }

    console.log(`convertToParsedRecords success! total=${rawRecords.length} , actual=${parsedRecords.length}`);

    return parsedRecords;
  }

  public addWarningTips(tips: string | string[], warningTips: string[]) {
    const arr: string[] = Array.isArray(tips) ? tips : [tips];

    arr.forEach((item) => {
      console.log(item);
      warningTips.push(item);
    });

    return warningTips;
  }
}
