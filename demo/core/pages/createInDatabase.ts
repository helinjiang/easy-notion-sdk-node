import path from 'path';
import fse from 'fs-extra';
import dotenv from 'dotenv';

import { pages } from '../../../src/core/pages';
import { getCurTimeToDisplay } from '../../../src/helpers/date';
import { SAMPLE_BLOCKS } from '../../../test/helpers';

dotenv.config();

(async () => {
  // 读取环境变量
  const NOTION_TOKEN = process.env.NOTION_TOKEN!!;

  // https://www.notion.so/1598f56b58b3808c8537f758b86996ae
  const parentPageId = '1598f56b58b3808c8537f758b86996ae';
  const title = `new created page in database at ${getCurTimeToDisplay()}`;

  const res = await pages.extendAPI.createInDatabase(NOTION_TOKEN, parentPageId, title, {
    properties: {
      备注: {
        rich_text: [
          {
            text: {
              content: 'A dark green leafy vegetable',
            },
          },
        ],
      },
      性别: {
        select: {
          name: '男',
        },
      },
      年龄: { number: 10086 },
    },
    children: SAMPLE_BLOCKS.BASE,
  });

  const saveDir = path.join(__dirname, './cache-data');
  fse.ensureDirSync(saveDir);
  fse.writeJsonSync(path.join(saveDir, `createInDatabase-${parentPageId}.json`), res, { spaces: 2 });
})();
