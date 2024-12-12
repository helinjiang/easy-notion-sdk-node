import 'mocha';
import { expect } from 'chai';
import _ from 'lodash';

import { SAMPLE } from '../../../../helpers/sample';

import {
  createInPage,
  createInDatabase,
  updateProperties,
  retrieve,
} from '../../../../../src/core/pages/extend-api/api';

import * as allExported from '../../../../../src/core/pages/extend-api/api';

describe('./core/pages/extend-api/api.ts', function () {
  let NOTION_TOKEN: string;

  before(() => {
    // 读取环境变量
    NOTION_TOKEN = `${process.env.NOTION_TOKEN}`;
  });

  describe('basic check', function () {
    it('check export', () => {
      expect(Object.keys(allExported).sort()).to.eql(
        ['createInPage', 'createInDatabase', 'updateProperties', 'retrieve', 'changePageTitle'].sort()
      );
    });

    it('createInPage should be function', () => {
      expect(createInPage).to.be.a('function');
    });

    it('createInDatabase should be function', () => {
      expect(createInDatabase).to.be.a('function');
    });

    it('updateProperties should be function', () => {
      expect(updateProperties).to.be.a('function');
    });

    it('retrieve should be function', () => {
      expect(retrieve).to.be.a('function');
    });
  });

  describe('retrieve()', function () {
    this.timeout(8000);
    // 检查下基本信息
    const checkedBaseInfoProperties = [
      'object',
      'id',
      'cover',
      'icon',
      'parent',
      'archived',
      'in_trash',
      'properties',
      'url',
      'public_url',
    ];

    it('check SAMPLE.BASE_PAGE', async () => {
      const res = await retrieve(NOTION_TOKEN, SAMPLE.BASE_PAGE.id);
      const expectedData = SAMPLE.BASE_PAGE.retrieveRes;

      expect(_.pick(res, checkedBaseInfoProperties)).to.eql(_.pick(expectedData, checkedBaseInfoProperties));
    });

    it('check SAMPLE.PAGE_IN_DATABASE_L1M00', async () => {
      const res = await retrieve(NOTION_TOKEN, SAMPLE.PAGE_IN_DATABASE_L1M00.id);
      const expectedData = SAMPLE.PAGE_IN_DATABASE_L1M00.retrieveRes;

      expect(_.pick(res, checkedBaseInfoProperties)).to.eql(_.pick(expectedData, checkedBaseInfoProperties));
    });

    it('check SAMPLE.PAGE_IN_DATABASE_L21M11', async () => {
      const res = await retrieve(NOTION_TOKEN, SAMPLE.PAGE_IN_DATABASE_L21M11.id);
      const expectedData = SAMPLE.PAGE_IN_DATABASE_L21M11.retrieveRes;

      expect(_.pick(res, checkedBaseInfoProperties)).to.eql(_.pick(expectedData, checkedBaseInfoProperties));
    });
  });

  // describe('createInPage()', function () {
  //   this.timeout(15000);

  //   let res: any = null;

  //   before(async () => {
  //     // 读取环境变量
  //     const NOTION_TOKEN = `${process.env.NOTION_TOKEN}`;

  //     const timeStart = Date.now();
  //     // https://www.notion.so/core-pages-15a8f56b58b3807c838ee62024a7dc61?pvs=4
  //     const parentPageId = '15a8f56b58b3807c838ee62024a7dc61';

  //     res = await createInPage(NOTION_TOKEN, parentPageId, '自动测试创建的文档');

  //     console.log('createInPage cost: ', Date.now() - timeStart);
  //   });

  //   // it('check basic info', () => {
  //   //   const basicInfo = _.pick(data, ['databaseId', 'databaseUrl', 'title']);
  //   //   const basicInfoExpect = _.pick(EXPECT_DATA, ['databaseId', 'databaseUrl', 'title']);
  //   //   expect(basicInfo).to.eql(basicInfoExpect);
  //   // });

  //   // it('check rawDatabaseInfo', () => {
  //   //   const rawDatabaseInfo = data.rawDatabaseInfo;
  //   //   const rawDatabaseInfoExpect = EXPECT_DATA.rawDatabaseInfo;

  //   //   expect(rawDatabaseInfo.object).to.equal(rawDatabaseInfoExpect.object);
  //   //   expect(rawDatabaseInfo.id).to.equal(rawDatabaseInfoExpect.id);

  //   //   // 检查下属性字段得是一样的，担心数据表被改动
  //   //   const getPropertiesCheckInfo = (properties: any) => {
  //   //     const arr: { name: string; type: string; id: string }[] = [];

  //   //     Object.keys(properties).forEach((key) => {
  //   //       const property = properties[key];
  //   //       arr.push({
  //   //         name: property.name,
  //   //         type: property.type,
  //   //         id: property.id,
  //   //       });
  //   //     });

  //   //     return arr;
  //   //   };
  //   //   expect(getPropertiesCheckInfo(rawDatabaseInfo.properties)).to.eql(
  //   //     getPropertiesCheckInfo(rawDatabaseInfoExpect.properties)
  //   //   );
  //   // });

  //   // it('check rawRecords', () => {
  //   //   const rawRecords = data.rawRecords;
  //   //   const rawRecordsExpect = EXPECT_DATA.rawRecords;

  //   //   expect(rawRecords.length).to.equal(rawRecordsExpect.length);

  //   //   // 检查下数据结果得是一样的，担心数据表被改动
  //   //   const getCheckInfo = (rawRecords: any) => {
  //   //     const arr: any[] = [];

  //   //     rawRecords.forEach((rawRecord: any) => {
  //   //       const data = _.pick(rawRecord, ['object', 'id', 'url']);
  //   //       arr.push({
  //   //         ...data,
  //   //         properties: Object.keys(rawRecord.properties).map((key) => {
  //   //           const property = rawRecord.properties[key];
  //   //           return {
  //   //             name: key,
  //   //             type: property.type,
  //   //             id: property.id,
  //   //           };
  //   //         }),
  //   //       });
  //   //     });

  //   //     return arr;
  //   //   };

  //   //   expect(getCheckInfo(rawRecords)).to.eql(getCheckInfo(rawRecordsExpect));
  //   // });

  //   // it('check parsedRecords', () => {
  //   //   expect(data.parsedRecords).to.eql(EXPECT_DATA.parsedRecords);
  //   // });
  // });
});
