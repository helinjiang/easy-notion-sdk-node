import path from 'path';
import fse from 'fs-extra';
import dotenv from 'dotenv';

import { databases } from '../../../src/core/databases';
import { getCurTimeToDisplay } from '../../../src/helpers/date';

dotenv.config();

(async () => {
  // 读取环境变量
  const NOTION_TOKEN = process.env.NOTION_TOKEN!!;

  // https://www.notion.so/auto_test-core-databases-15b8f56b58b380c38953cefac0805ca2?pvs=4
  const parentPageId = '15b8f56b58b380c38953cefac0805ca2';
  const title = `new created database in page at ${getCurTimeToDisplay()}`;

  const res = await databases.extendAPI.createInPage(NOTION_TOKEN, parentPageId, title, {
    Name: {
      title: {},
    },
    Description: {
      rich_text: {},
    },
    'In stock': {
      checkbox: {},
    },
  });

  const saveDir = path.join(__dirname, './cache-data');
  fse.ensureDirSync(saveDir);
  fse.writeJsonSync(path.join(saveDir, `createInPage-${parentPageId}.json`), res, { spaces: 2 });
})();
