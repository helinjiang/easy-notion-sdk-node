import { databases } from './databases';
import { blocks } from './blocks';
import { pages } from './pages';

import * as INotionAPITypes from './types';

export { INotionAPITypes };

export const notionAPI = {
  databases,
  blocks,
  pages
};
