import PropertyBase, { IRawDefine, IRawValue } from '../property-base';

export default class Property extends PropertyBase {
  constructor(rawDefine: IRawDefine, rawValue: IRawValue) {
    super('date', rawDefine, rawValue);
  }

  public getValue(): string {
    /**
     * 属性定义
     *  {
          "id": "GNCH",
          "name": "练习日期",
          "type": "date",
          "date": {}
        }
     * 
     * 属性值
     * {
        "id": "GNCH",
        "type": "date",
        "date": {
          "start": "2024-02-27",
          "end": null,
          "time_zone": null
        }
      },
     */

    return this.rawValue.date?.start || '';
  }
}