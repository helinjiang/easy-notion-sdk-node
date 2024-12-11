import PropertyBase, { IRawDefine, IRawValue } from '../property-base';

export default class Property extends PropertyBase {
  constructor(rawDefine: IRawDefine, rawValue: IRawValue) {
    super('multi_select', rawDefine, rawValue);
  }

  public getValue(): string[] {
    /**
     * 属性定义
     *  {
        "id": "kg%5De",
        "name": "习题类型",
        "type": "multi_select",
        "multi_select": {
          "options": [
            {
              "id": "I@sQ",
              "name": "3-错题",
              "color": "yellow",
              "description": null
            },
            {
              "id": "U=Ec",
              "name": "2-易错题",
              "color": "brown",
              "description": null
            },
            {
              "id": "`SyC",
              "name": "1-母题",
              "color": "gray",
              "description": null
            }
          ]
        }
      },
     * 
     * 属性值
     * {
          "id": "kg%5De",
          "type": "multi_select",
          "multi_select": [
            {
              "id": "I@sQ",
              "name": "3-错题",
              "color": "yellow"
            },
            {
              "id": "`SyC",
              "name": "1-母题",
              "color": "gray"
            }
          ]
        },
     */

    return (this.rawValue.multi_select || []).map((one: any) => one.name);
  }
}