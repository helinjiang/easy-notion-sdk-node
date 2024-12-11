import PropertyBase, { IRawDefine, IRawValue } from '../property-base';

export default class Property extends PropertyBase {
  constructor(rawDefine: IRawDefine, rawValue: IRawValue) {
    super('number', rawDefine, rawValue);
  }

  public getValue(): number {
    /**
     * 属性定义
     *  {
        "id": "wk_f",
        "name": "正确率",
        "description": "按照实际情况折算为正确率",
        "type": "number",
        "number": {
          "format": "percent"
        }
      }
     * 
     * 属性值
     * {
          "id": "wk_f",
          "type": "number",
          "number": 0.33
        },
     */

    return this.rawValue.number || 0;
  }
}