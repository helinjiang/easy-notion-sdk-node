import { BlockObjectRequest } from '../../src/raw-notion-client-sdk/types';

const BLOCK_HEADING_2: BlockObjectRequest = {
  object: 'block',
  type: 'heading_2',
  heading_2: {
    rich_text: [{ type: 'text', text: { content: 'H2 标题' } }],
  },
};

const BLOCK_PARAGRAPH: BlockObjectRequest = {
  object: 'block',
  type: 'paragraph',
  paragraph: {
    rich_text: [
      {
        type: 'text',
        text: {
          content: '我是超链接，点击跳转到百度',
          link: { url: 'https://www.baidu.com' },
        },
      },
      {
        type: 'text',
        text: {
          content: '，更多写法参考： ',
        },
      },
      {
        type: 'text',
        text: {
          content: 'https://developers.notion.com/reference/block',
          link: { url: 'https://developers.notion.com/reference/block' },
        },
      },
    ],
  },
};

export const SAMPLE_BLOCKS: Record<string, BlockObjectRequest[]> = {
  BASE: [BLOCK_HEADING_2, BLOCK_PARAGRAPH],
};
