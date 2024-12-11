/**
 * 复制一个同步块
 * https://developers.notion.com/reference/block#duplicate-synced-block
 * @param blockId 
 * @returns 
 */
export const syncedBlock = (blockId: string): any => {
  return {
    "type": "synced_block",
    "synced_block": {
      "synced_from": {
        "type": "block_id",
        "block_id": blockId
      }
    }
  };
};

/**
 * 一个文本段落
 * https://developers.notion.com/reference/block#paragraph
 * @param plainText 
 * @returns 
 */
export const paragraphOfPlainText = (plainText?: string, url?: string): any => {
  return {
    "type": "paragraph",
    "paragraph": {
      "rich_text": plainText ? [{
        "type": "text",
        "text": {
          "content": plainText,
          "link": url ? {
            "url": url
          } : null
        }
      }] : [],
      "color": "default"
    }
  };
};

/**
 * 一个文本标题
 * https://developers.notion.com/reference/block#headings
 * @param type 
 * @param plainText 
 * @param isToggleAble 
 * @returns 
 */
export const headingOfPlainText = (
  type: 'h1' | 'h2' | 'h3',
  plainText: string,
  url?: string,
  isToggleAble?: boolean
): any => {
  const headingConfig = {
    "rich_text": [{
      "type": "text",
      "text": {
        "content": plainText,
        "link": url ? {
          "url": url
        } : null
      }
    }],
    "color": "default",
    "is_toggleable": typeof isToggleAble === 'boolean' ? isToggleAble : false
  };

  if (type === 'h2') {
    return {
      "type": "heading_2",
      "heading_2": headingConfig,
    };
  }

  if (type === 'h3') {
    return {
      "type": "heading_3",
      "heading_3": headingConfig,
    };
  }

  return {
    "type": "heading_1",
    "heading_1": headingConfig,
  };
};

/**
 * 一个文本引用
 * https://developers.notion.com/reference/block#quote
 * @param plainText 
 * @returns 
 */
export const quoteOfPlainText = (plainText: string): any => {
  return {
    "type": "quote",
    "quote": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": plainText,
          "link": null
        }
      }],
      "color": "default"
    }
  };
};

/**
 * 一个文本引用
 * https://developers.notion.com/reference/block#table-of-contents
 * 
 * @returns 
 */
export const tableOfContents = (): any => {
  return {
    "type": "table_of_contents",
    "table_of_contents": {
      "color": "gray"
    }
  };
};