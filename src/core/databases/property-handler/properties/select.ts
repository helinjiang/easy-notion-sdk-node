import PropertyBase, { IRawDefine, IRawValue } from '../property-base';

export default class Property extends PropertyBase {
  constructor(rawDefine: IRawDefine, rawValue: IRawValue) {
    super('select', rawDefine, rawValue);
  }

  public getValue(): string {
    /**
     * 属性定义
     *  {
        "id": "uF%3Fb",
        "name": "伴学人",
        "type": "select",
        "select": {
          "options": [
            {
              "id": "hT{j",
              "name": "倪小喵",
              "color": "purple",
              "description": null
            },
            {
              "id": "lGI[",
              "name": "何好帅",
              "color": "green",
              "description": null
            }
          ]
        }
      }
     * 
     * 属性值
     * {
        "id": "uF%3Fb",
        "type": "select",
        "select": {
          "id": "lGI[",
          "name": "何好帅",
          "color": "green"
        }
      },
     */

    return this.rawValue.select?.name || '';
  }
}