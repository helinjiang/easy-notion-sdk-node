import path from 'path';
import fse from 'fs-extra';
import dotenv from 'dotenv';
import { pages } from '../../../src/core/pages';

dotenv.config();

(async () => {
  // 读取环境变量
  const NOTION_TOKEN = process.env.NOTION_TOKEN!!;

  // https://www.notion.so/test-sample-update-1598f56b58b3802f8f26eed034135046?pvs=4
  const pageId = '1598f56b58b3802f8f26eed034135046';

  const res = await pages.extendAPI.update(NOTION_TOKEN, pageId, `【test-sample】update ${Math.random().toFixed(5)}`);

  const saveDir = path.join(__dirname, './cache-data');
  fse.ensureDirSync(saveDir);
  fse.writeJsonSync(path.join(saveDir, `update-${pageId}.json`), res, { spaces: 2 });
})();
