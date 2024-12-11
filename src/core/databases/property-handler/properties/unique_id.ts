import PropertyBase, { IRawDefine, IRawValue } from '../property-base';

export default class Property extends PropertyBase {
  constructor(rawDefine: IRawDefine, rawValue: IRawValue) {
    super('unique_id', rawDefine, rawValue);
  }

  public getValue(): string | number {
    /**
     * 属性定义
     *  {
        "id": "YJYL",
        "name": "编号",
        "description": "XT：习题的拼音首字母",
        "type": "unique_id",
        "unique_id": {
          "prefix": null
        }
      }

      {
        "id": "w%5BOT",
        "name": "编号",
        "description": "ZS：知识的拼音首字母",
        "type": "unique_id",
        "unique_id": {
          "prefix": "ZS"
        }
      }
     * 
     * 属性值
     * {
          "id": "YJYL",
          "type": "unique_id",
          "unique_id": {
            "prefix": null,
            "number": 1
          }
        },

        {
          "id": "w%5BOT",
          "type": "unique_id",
          "unique_id": {
            "prefix": "ZS",
            "number": 3
          }
        }
     */

    const prefix = this.rawValue.unique_id?.prefix || '';
    const number = this.rawValue.unique_id?.number || 0;

    return prefix ? `${prefix}-${number}` : number;
  }
}