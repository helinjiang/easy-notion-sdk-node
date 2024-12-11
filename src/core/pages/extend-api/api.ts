import { createNotionClientSDK, IRawNotionClientSDKTypes } from '../../../raw-notion-client-sdk';

/**
 * 创建一篇文档
 * https://developers.notion.com/reference/post-page
 * @param notionTokenOrClientSDK
 * @param parentPageId 文档挂载的父页面ID
 * @param titlePlainText 文档标题
 * @returns
 */
export const create = async (
  notionTokenOrClientSDK: IRawNotionClientSDKTypes.ITokenOrClientSDK,
  parentPageId: string,
  titlePlainText: string
): Promise<IRawNotionClientSDKTypes.CreatePageResponse> => {
  const notionClientSDK = createNotionClientSDK(notionTokenOrClientSDK);

  return notionClientSDK.pages.create({
    parent: {
      page_id: parentPageId,
      type: 'page_id',
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
  });
};
