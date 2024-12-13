import retrieveBasePageRes from '../data/fixtures/sample-page/retrieve-15a8f56b58b3807890b4de761706988f.json';
import retrievePageInDatabaseL1M00Res from '../data/fixtures/sample-page/retrieve-15a8f56b58b38174a5bbe82b14eedb2b.json';
import retrievePageInDatabaseL21M11Res from '../data/fixtures/sample-page/retrieve-15a8f56b58b3808bbdc9dfad24364e7f.json';

export const SAMPLE_PAGES = {
  // https://www.notion.so/auto_test-sample-page-15a8f56b58b3807890b4de761706988f?pvs=4
  BASE: {
    id: '15a8f56b58b3807890b4de761706988f',
    retrieveRes: retrieveBasePageRes,
  },

  // https://www.notion.so/database-page-15a8f56b58b38174a5bbe82b14eedb2b?pvs=4
  PAGE_IN_DATABASE_L1M00: {
    id: '15a8f56b58b38174a5bbe82b14eedb2b',
    retrieveRes: retrievePageInDatabaseL1M00Res,
  },

  // https://www.notion.so/database-page-15a8f56b58b3808bbdc9dfad24364e7f?pvs=4
  PAGE_IN_DATABASE_L21M11: {
    id: '15a8f56b58b3808bbdc9dfad24364e7f',
    retrieveRes: retrievePageInDatabaseL21M11Res,
  },

  // https://www.notion.so/core-pages-sample-page-15a8f56b58b38019b4a8e911ac7a32e2?pvs=4
  AUTO_TEST_CORE_PAGE_SAMPLE: {
    id: '15a8f56b58b38019b4a8e911ac7a32e2',
  },
};
