import 'mocha';
import { expect } from 'chai';

import { desc } from '../../src/index';

describe('./index.ts', function () {
  describe('basic check', function () {
    it('desc should be string', () => {
      expect(desc).to.be.a('string');
    });
  });

  describe('check desc', function () {
    it('check desc return correct', async () => {
      expect(desc).to.equal('Coming soon!');
    });
  });
});
