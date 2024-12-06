// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash');

exports.mochaGlobalSetup = function () {
  dotenv.config();

  const info = _.pick(process.env, ['NOTION_TOKEN', 'NOTION_TOKEN_DEBUG']);

  console.log(`env: ${JSON.stringify(info, null, 2)}`);
};
