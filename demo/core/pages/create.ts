import path from 'path';
import fse from 'fs-extra';
import dotenv from 'dotenv';
import { pages } from '../../../src/core/pages';

dotenv.config();

(async () => {
  // 读取环境变量
  const NOTION_TOKEN = process.env.NOTION_TOKEN!!;

  // https://www.notion.so/Test-Pages-1598f56b58b380e59829de226fd854c7?pvs=4
  const parentPageId = '1598f56b58b380e59829de226fd854c7';

  const res = await pages.extendAPI.create(NOTION_TOKEN, parentPageId, 'hello new created page');

  const saveDir = path.join(__dirname, './cache-data');
  fse.ensureDirSync(saveDir);
  fse.writeJsonSync(path.join(saveDir, `create-${parentPageId}.json`), res, { spaces: 2 });
})();
