import path from 'path';
import fse from 'fs-extra';
import dotenv from 'dotenv';
import { pages } from '../../../src/core/pages';

dotenv.config();

(async () => {
  // 读取环境变量
  const NOTION_TOKEN = process.env.NOTION_TOKEN!!;

  // https://www.notion.so/new-title-0-92577-15a8f56b58b381a1a028d230d7c7713f?pvs=4
  const pageId = '15a8f56b58b381a1a028d230d7c7713f';

  const res = await pages.extendAPI.deletePage(NOTION_TOKEN, pageId);

  const saveDir = path.join(__dirname, './cache-data');
  fse.ensureDirSync(saveDir);
  fse.writeJsonSync(path.join(saveDir, `deletePage-${pageId}.json`), res, { spaces: 2 });
})();
