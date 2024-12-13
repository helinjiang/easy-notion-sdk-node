import path from 'path';
import fse from 'fs-extra';
import dotenv from 'dotenv';
import { databases } from '../../../src/core/databases';

dotenv.config();

(async () => {
  // 读取环境变量
  const NOTION_TOKEN = process.env.NOTION_TOKEN!!;

  // https://www.notion.so/1598f56b58b3808c8537f758b86996ae
  const databaseId = '1598f56b58b3808c8537f758b86996ae';

  const res = await databases.extendAPI.query(NOTION_TOKEN, databaseId);

  const saveDir = path.join(__dirname, './cache-data');
  fse.ensureDirSync(saveDir);
  fse.writeJsonSync(path.join(saveDir, `query-${databaseId}.json`), res, { spaces: 2 });
})();
