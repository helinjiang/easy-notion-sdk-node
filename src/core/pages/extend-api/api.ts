import _ from 'lodash';
import { createNotionClientSDK, IRawNotionClientSDKTypes } from '../../../raw-notion-client-sdk';
import { ICreateInPageParameters, ICreateInDatabaseParameters, IUpdateParameters } from './types';

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

/**
 * 检索页面的信息
 * https://developers.notion.com/reference/retrieve-a-page
 * 特别注意，对于页面的属性中引用值，最多只会返回 25 个引用值，
 * 如果要获取完整的列表，则需要用 retrievePropertyItems 接口
 *
 * @param notionTokenOrClientSDK
 * @param pageId 文档 ID
 * @param filterProperties 指定要过滤出的属性，结果只会有指定的属性
 * @returns
 */
export const retrieve = async (
  notionTokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK,
  pageId: string,
  filterProperties?: Array<string>
): Promise<IRawNotionClientSDKTypes.GetPageResponse> => {
  const notionClientSDK = createNotionClientSDK(notionTokenOrClientSDK);

  const mergedParams: IRawNotionClientSDKTypes.GetPageParameters = {
    page_id: pageId,
    filter_properties: filterProperties,
  };

  return notionClientSDK.pages.retrieve(mergedParams);
};

/**
 * 更新一篇文档的属性，比如标题、是否移动到垃圾箱等
 * https://developers.notion.com/reference/patch-page
 * @param notionTokenOrClientSDK
 * @param pageId 文档 ID
 * @param parameters 额外的参数
 * @returns
 */
export const updateProperties = async (
  notionTokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK,
  pageId: string,
  parameters?: IUpdateParameters
): Promise<IRawNotionClientSDKTypes.UpdatePageResponse> => {
  const notionClientSDK = createNotionClientSDK(notionTokenOrClientSDK);

  const updatePageParameters: IRawNotionClientSDKTypes.UpdatePageParameters = {
    page_id: pageId,
  };

  // 标题
  if (parameters?.title) {
    updatePageParameters.properties = {
      title: [
        {
          text: {
            content: parameters?.title,
          },
        },
      ],
    };
  }

  // 其他属性
  if (parameters?.properties) {
    updatePageParameters.properties = _.merge(parameters?.properties, updatePageParameters.properties);
  }

  // 合并其他参数
  const mergedParams = _.merge(parameters, updatePageParameters);

  return notionClientSDK.pages.update(mergedParams);
};

/**
 * 更新一篇文档的标题
 * https://developers.notion.com/reference/patch-page
 * @param notionTokenOrClientSDK
 * @param pageId 文档 ID
 * @param titlePlainText 文档标题
 * @returns
 */
export const changePageTitle = async (
  notionTokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK,
  pageId: string,
  titlePlainText: string
): Promise<IRawNotionClientSDKTypes.UpdatePageResponse> => {
  const notionClientSDK = createNotionClientSDK(notionTokenOrClientSDK);

  const updatePageParameters: IRawNotionClientSDKTypes.UpdatePageParameters = {
    page_id: pageId,
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

  // 合并其他参数
  const mergedParams = _.merge({}, updatePageParameters);

  return notionClientSDK.pages.update(mergedParams);
};
