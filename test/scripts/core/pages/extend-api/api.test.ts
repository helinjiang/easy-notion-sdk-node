import 'mocha';
import { expect } from 'chai';
import _ from 'lodash';

import { SAMPLE, getCurTimeToDisplay } from '../../../../helpers';

import {
  createInPage,
  createInDatabase,
  updateProperties,
  retrieve,
  changeTitle,
  deletePage,
} from '../../../../../src/core/pages/extend-api/api';

import * as allExported from '../../../../../src/core/pages/extend-api/api';

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

describe('./core/pages/extend-api/api.ts', function () {
  let NOTION_TOKEN: string;

  before(() => {
    // 读取环境变量
    NOTION_TOKEN = `${process.env.NOTION_TOKEN}`;
  });

  describe('basic check', function () {
    it('check export', () => {
      expect(Object.keys(allExported).sort()).to.eql(
        ['createInPage', 'createInDatabase', 'updateProperties', 'retrieve', 'changeTitle', 'deletePage'].sort()
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

    it('changeTitle should be function', () => {
      expect(changeTitle).to.be.a('function');
    });

    it('deletePage should be function', () => {
      expect(deletePage).to.be.a('function');
    });
  });

  describe('retrieve()', function () {
    this.timeout(8000);

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

  describe('createInPage()', function () {
    this.timeout(24000);

    it('create page under SAMPLE.AUTO_TEST_CORE_PAGE', async () => {
      const pageTitle = `page created at ${getCurTimeToDisplay()} without content`;
      const createRes = await createInPage(NOTION_TOKEN, SAMPLE.AUTO_TEST_CORE_PAGE.id, pageTitle);

      // 校对重要的信息
      expect(createRes.object).to.equal('page');
      expect(_.get(createRes, 'properties.title.title[0].plain_text')).to.equal(pageTitle);

      // 复查一下属性信息
      const retrieveRes = await retrieve(NOTION_TOKEN, createRes.id);
      expect(_.pick(createRes, checkedBaseInfoProperties)).to.eql(_.pick(retrieveRes, checkedBaseInfoProperties));

      // 修改标题
      const newPageTitle = `new title at ${getCurTimeToDisplay()}`;
      const changeTitleRes = await changeTitle(NOTION_TOKEN, createRes.id, newPageTitle);
      expect(_.get(changeTitleRes, 'properties.title.title[0].plain_text')).to.equal(newPageTitle);

      // 删除页面
      const deletePageRes = await deletePage(NOTION_TOKEN, createRes.id);
      expect((deletePageRes as any).archived).to.be.true;
    });
  });
});
