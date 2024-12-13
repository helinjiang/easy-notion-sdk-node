import { Client } from '@notionhq/client';

export {
  CreatePageParameters,
  CreatePageResponse,
  UpdatePageParameters,
  UpdatePageResponse,
  GetPageParameters,
  GetPageResponse,
  BlockObjectRequest,
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  CreateDatabaseParameters,
  CreateDatabaseResponse,
  UpdateDatabaseParameters,
  UpdateDatabaseResponse,
  GetDatabaseParameters,
  GetDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
export { ClientOptions } from '@notionhq/client/build/src/Client';

export type ITokenOrClientSDK = string | Client;
export type IClientSDK = Client;
