import PropertyBase, { IRawDefine, IRawValue } from '../property-base';

export default class Property extends PropertyBase {
  constructor(rawDefine: IRawDefine, rawValue: IRawValue) {
    super('rich_text', rawDefine, rawValue);
  }

  public getValue(): string {
    /**
     * 属性定义
     *  {
        "id": "H%3A%7Dw",
        "name": "同步块ID-练习记录",
        "description": "脚本自动计算，请勿手动修改",
        "type": "rich_text",
        "rich_text": {}
      }
     * 
     * 属性值
     * {
          "id": "H%3A%7Dw",
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "1021f876-2ecb-48cb-8ee6-a2359ee15111",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "1021f876-2ecb-48cb-8ee6-a2359ee15111",
              "href": null
            }
          ]
        }
     */

    return (this.rawValue.rich_text || []).map((one: any) => one.plain_text).join('').trim();
  }
}