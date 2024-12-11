import { Client } from '@notionhq/client';

export {
  CreatePageParameters,
  UpdatePageParameters,
  CreatePageResponse,
  BlockObjectRequest,
} from '@notionhq/client/build/src/api-endpoints';
export { ClientOptions } from '@notionhq/client/build/src/Client';

export type ITokenOrClientSDK = string | Client;
export type IClientSDK = Client;
