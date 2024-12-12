import retrieveBasePageRes from '../data/fixtures/sample-page/retrieve-15a8f56b58b3807890b4de761706988f.json';
import retrievePageInDatabaseL1M00Res from '../data/fixtures/sample-page/retrieve-15a8f56b58b38174a5bbe82b14eedb2b.json';

export const SAMPLE = {
  // https://www.notion.so/auto_test-sample-page-15a8f56b58b3807890b4de761706988f?pvs=4
  BASE_PAGE: {
    id: '15a8f56b58b3807890b4de761706988f',
    retrieveRes: retrieveBasePageRes,
  },

  // https://www.notion.so/database-page-15a8f56b58b38174a5bbe82b14eedb2b?pvs=4
  PAGE_IN_DATABASE_L1M00: {
    id: '15a8f56b58b38174a5bbe82b14eedb2b',
    retrieveRes: retrievePageInDatabaseL1M00Res,
  },

  // https://www.notion.so/15a8f56b58b380e39447e5254bfbdfb3?pvs=4
  BASE_DATABASE: {
    id: '15a8f56b58b380e39447e5254bfbdfb3',
  },
};
