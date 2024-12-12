import path from 'path';
import fse from 'fs-extra';
import dotenv from 'dotenv';

import { pages } from '../../../src/core/pages';
import { getCurTimeToDisplay } from '../../../src/helpers/date';

dotenv.config();

(async () => {
  // 读取环境变量
  const NOTION_TOKEN = process.env.NOTION_TOKEN!!;

  // https://www.notion.so/Test-Pages-1598f56b58b380e59829de226fd854c7?pvs=4
  const parentPageId = '1598f56b58b380e59829de226fd854c7';
  const title = `new created page in page at ${getCurTimeToDisplay()}`;

  const res = await pages.extendAPI.createInPage(NOTION_TOKEN, parentPageId, title, {
    children: [
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ type: 'text', text: { content: 'H2 标题' } }],
        },
      },
      {
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
      },
    ],
  });

  const saveDir = path.join(__dirname, './cache-data');
  fse.ensureDirSync(saveDir);
  fse.writeJsonSync(path.join(saveDir, `createInPage-${parentPageId}.json`), res, { spaces: 2 });
})();
