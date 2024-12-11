
import { domainBase } from './domain-base';
import { extendAPI } from './extend-api';
import { propertyHandler } from './property-handler';

import * as IDatabaseTypes from './types';

export { IDatabaseTypes };

export const databases = {
  domainBase,
  extendAPI,
  propertyHandler
};
