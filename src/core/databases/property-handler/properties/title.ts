import PropertyBase, { IRawDefine, IRawValue } from '../property-base';

export default class Property extends PropertyBase {
  constructor(rawDefine: IRawDefine, rawValue: IRawValue) {
    super('title', rawDefine, rawValue);
  }

  public getValue(): string {
    /**
     * 属性定义
     *  {
          "id": "title",
          "name": "练习记录",
          "type": "title",
          "title": {}
        }
     * 
     * 属性值
     * {
          "id": "title",
          "type": "title",
          "title": [
            {
              "type": "text",
              "text": {
                "content": "练习 ",
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
              "plain_text": "练习 ",
              "href": null
            },
            {
              "type": "mention",
              "mention": {
                "type": "date",
                "date": {
                  "start": "2024-02-27",
                  "end": null,
                  "time_zone": null
                }
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "2024-02-27",
              "href": null
            },
            {
              "type": "text",
              "text": {
                "content": " ",
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
              "plain_text": " ",
              "href": null
            },
            {
              "type": "mention",
              "mention": {
                "type": "date",
                "date": {
                  "start": "2024-02-27",
                  "end": null,
                  "time_zone": null
                }
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "2024-02-27",
              "href": null
            },
            {
              "type": "text",
              "text": {
                "content": " ",
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
              "plain_text": " ",
              "href": null
            }
          ]
        }
      }
     */

    return (this.rawValue.title || []).map((one: any) => one.plain_text).join('').trim();
  }
}