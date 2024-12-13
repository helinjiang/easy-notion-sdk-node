import 'mocha';
import { expect } from 'chai';
import _ from 'lodash';

import {
  getCurTimeToDisplay,
  getTitleByPageObject,
  SAMPLE_BLOCKS,
  SAMPLE_DATABASES,
  SAMPLE_PAGES,
} from '../../../../helpers';

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

    it('check SAMPLE_PAGES.BASE', async () => {
      const res = await retrieve(NOTION_TOKEN, SAMPLE_PAGES.BASE.id);
      const expectedData = SAMPLE_PAGES.BASE.retrieveRes;

      expect(_.pick(res, checkedBaseInfoProperties)).to.eql(_.pick(expectedData, checkedBaseInfoProperties));
    });

    it('check SAMPLE_PAGES.PAGE_IN_DATABASE_L1M00', async () => {
      const res = await retrieve(NOTION_TOKEN, SAMPLE_PAGES.PAGE_IN_DATABASE_L1M00.id);
      const expectedData = SAMPLE_PAGES.PAGE_IN_DATABASE_L1M00.retrieveRes;

      expect(_.pick(res, checkedBaseInfoProperties)).to.eql(_.pick(expectedData, checkedBaseInfoProperties));
    });

    it('check SAMPLE_PAGES.PAGE_IN_DATABASE_L21M11', async () => {
      const res = await retrieve(NOTION_TOKEN, SAMPLE_PAGES.PAGE_IN_DATABASE_L21M11.id);
      const expectedData = SAMPLE_PAGES.PAGE_IN_DATABASE_L21M11.retrieveRes;

      expect(_.pick(res, checkedBaseInfoProperties)).to.eql(_.pick(expectedData, checkedBaseInfoProperties));
    });
  });

  describe.skip('createInPage()', function () {
    this.timeout(24000);

    it('create page under SAMPLE_PAGES.AUTO_TEST_CORE_PAGE_SAMPLE without content', async () => {
      const pageTitle = `createInPage created at ${getCurTimeToDisplay()} without content`;
      const createRes = await createInPage(NOTION_TOKEN, SAMPLE_PAGES.AUTO_TEST_CORE_PAGE_SAMPLE.id, pageTitle);

      // 校对重要的信息
      expect(createRes.object).to.equal('page');
      expect(getTitleByPageObject(createRes)).to.equal(pageTitle);

      // 修改标题
      const newPageTitle = `new title at ${getCurTimeToDisplay()}`;
      const changeTitleRes = await changeTitle(NOTION_TOKEN, createRes.id, newPageTitle);
      expect(getTitleByPageObject(changeTitleRes)).to.equal(newPageTitle);

      // 删除页面
      const deletePageRes = await deletePage(NOTION_TOKEN, createRes.id);
      expect((deletePageRes as any).archived).to.be.true;
    });

    it('create page under SAMPLE_PAGES.AUTO_TEST_CORE_PAGE_SAMPLE with content', async () => {
      const pageTitle = `createInPage created at ${getCurTimeToDisplay()} with content`;
      const createRes = await createInPage(NOTION_TOKEN, SAMPLE_PAGES.AUTO_TEST_CORE_PAGE_SAMPLE.id, pageTitle, {
        children: SAMPLE_BLOCKS.BASE,
      });

      // 校对重要的信息
      expect(createRes.object).to.equal('page');
      expect(getTitleByPageObject(createRes)).to.equal(pageTitle);

      // 删除页面
      const deletePageRes = await deletePage(NOTION_TOKEN, createRes.id);
      expect((deletePageRes as any).archived).to.be.true;
    });
  });

  describe.skip('createInDatabase()', function () {
    this.timeout(24000);

    it('create page under SAMPLE_DATABASES.AUTO_TEST_CORE_PAGE_SAMPLE without content', async () => {
      const pageTitle = `createInDatabase created at ${getCurTimeToDisplay()} without content`;
      const createRes = await createInDatabase(NOTION_TOKEN, SAMPLE_DATABASES.AUTO_TEST_CORE_PAGE_SAMPLE.id, pageTitle);

      // 校对重要的信息
      expect(createRes.object).to.equal('page');
      expect(getTitleByPageObject(createRes)).to.equal(pageTitle);

      // 修改标题
      const newPageTitle = `new title at ${getCurTimeToDisplay()}`;
      const changeTitleRes = await changeTitle(NOTION_TOKEN, createRes.id, newPageTitle);
      expect(getTitleByPageObject(changeTitleRes)).to.equal(newPageTitle);

      // 删除页面
      const deletePageRes = await deletePage(NOTION_TOKEN, createRes.id);
      expect((deletePageRes as any).archived).to.be.true;
    });

    it('create page under SAMPLE_DATABASES.AUTO_TEST_CORE_PAGE_SAMPLE with content', async () => {
      const pageTitle = `createInDatabase created at ${getCurTimeToDisplay()} with content`;
      const createRes = await createInDatabase(
        NOTION_TOKEN,
        SAMPLE_DATABASES.AUTO_TEST_CORE_PAGE_SAMPLE.id,
        pageTitle,
        {
          children: SAMPLE_BLOCKS.BASE,
          properties: {
            备注: {
              rich_text: [
                {
                  text: {
                    content: `备注： create at ${getCurTimeToDisplay()} `,
                  },
                },
              ],
            },
            性别: {
              select: {
                name: '男',
              },
            },
            年龄: { number: Math.round(10086 * Math.random()) },
          },
        }
      );

      // 校对重要的信息
      expect(createRes.object).to.equal('page');
      expect(getTitleByPageObject(createRes)).to.equal(pageTitle);

      // 删除页面
      const deletePageRes = await deletePage(NOTION_TOKEN, createRes.id);
      expect((deletePageRes as any).archived).to.be.true;
    });
  });
});
