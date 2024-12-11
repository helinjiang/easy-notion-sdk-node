import _ from 'lodash';
import { createNotionClientSDK, IRawNotionClientSDKTypes } from '../../../raw-notion-client-sdk';
import { ICreateInPageParameters, ICreateInDatabaseParameters } from './types';

/**
 * 创建一篇文档，挂载在 page 类型文档下
 * https://developers.notion.com/reference/post-page
 * @param notionTokenOrClientSDK
 * @param parentPageId 文档挂载的父页面ID
 * @param titlePlainText 文档标题
 * @param parameters 额外的参数
 * @returns
 */
export const createInPage = async (
  notionTokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK,
  parentPageId: string,
  titlePlainText: string,
  parameters?: ICreateInPageParameters
): Promise<IRawNotionClientSDKTypes.CreatePageResponse> => {
  const notionClientSDK = createNotionClientSDK(notionTokenOrClientSDK);

  const createPageParameters: IRawNotionClientSDKTypes.CreatePageParameters = {
    parent: {
      page_id: parentPageId,
      type: 'page_id',
    },
    properties: {
      // 当父文档是一个 page 时，只有 title 这一个属性
      title: [
        {
          text: {
            content: titlePlainText,
          },
        },
      ],
    },
  };

  // 如果有额外的参数，则进行合并
  if (parameters?.icon) {
    createPageParameters.icon = parameters.icon;
  }

  if (parameters?.cover) {
    createPageParameters.cover = parameters.cover;
  }

  if (parameters?.children) {
    createPageParameters.children = parameters.children;
  }

  return notionClientSDK.pages.create(createPageParameters);
};

/**
 * 创建一篇文档，挂载在 database 下
 * https://developers.notion.com/reference/post-page
 * @param notionTokenOrClientSDK
 * @param parentPageId 文档挂载的父页面ID
 * @param titlePlainText 文档标题
 * @param parameters 额外的参数
 * @returns
 */
export const createInDatabase = async (
  notionTokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK,
  parentPageId: string,
  titlePlainText: string,
  parameters?: ICreateInDatabaseParameters
): Promise<IRawNotionClientSDKTypes.CreatePageResponse> => {
  const notionClientSDK = createNotionClientSDK(notionTokenOrClientSDK);

  const createPageParameters: IRawNotionClientSDKTypes.CreatePageParameters = {
    parent: {
      database_id: parentPageId,
      type: 'database_id',
    },
    properties: {
      title: [
        {
          text: {
            content: titlePlainText,
          },
        },
      ],
    },
  };

  // 如果有额外的参数，则进行合并
  if (parameters?.properties) {
    createPageParameters.properties = {
      ...parameters.properties,

      名称: {
        title: [
          {
            text: {
              content: titlePlainText,
            },
          },
        ],
      },
    };
  }

  if (parameters?.icon) {
    createPageParameters.icon = parameters.icon;
  }

  if (parameters?.cover) {
    createPageParameters.cover = parameters.cover;
  }

  if (parameters?.children) {
    createPageParameters.children = parameters.children;
  }

  return notionClientSDK.pages.create(createPageParameters);
};
