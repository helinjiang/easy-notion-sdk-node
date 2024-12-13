import path from 'path';
import fse from 'fs-extra';
import dotenv from 'dotenv';
import { databases } from '../../../src/core/databases';
import { getCurTimeToDisplay } from '../../../src/helpers/date';

dotenv.config();

(async () => {
  // 读取环境变量
  const NOTION_TOKEN = process.env.NOTION_TOKEN!!;

  // https://www.notion.so/1598f56b58b3808c8537f758b86996ae?pvs=4
  const databaseId = '1598f56b58b3808c8537f758b86996ae';

  const res = await databases.extendAPI.update(NOTION_TOKEN, databaseId, {
    description: [
      {
        text: {
          content: 'change description at ' + getCurTimeToDisplay(),
        },
      },
    ],
  });

  const saveDir = path.join(__dirname, './cache-data');
  fse.ensureDirSync(saveDir);
  fse.writeJsonSync(path.join(saveDir, `update-${databaseId}.json`), res, { spaces: 2 });
})();
