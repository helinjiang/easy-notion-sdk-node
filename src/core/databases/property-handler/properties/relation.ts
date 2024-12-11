import PropertyBase, { IRawDefine, IRawValue } from '../property-base';

export default class Property extends PropertyBase {
  constructor(rawDefine: IRawDefine, rawValue: IRawValue) {
    // https://developers.notion.com/reference/property-value-object#relation-property-values
    super('relation', rawDefine, rawValue);
  }

  public getValue(): string[] {
    /**
     * 属性定义
     *  {
          "id": "alHS",
          "name": "关联S4练习题",
          "type": "relation",
          "relation": {
            "database_id": "6d1bd1bf-8407-4717-a24f-15e802f2971a",
            "type": "dual_property",
            "dual_property": {
              "synced_property_name": "关联S5练习记录",
              "synced_property_id": "HRk%5D"
            }
          }
        }
     * 
     * 属性值
     * {
        "id": "alHS",
        "type": "relation",
        "relation": [
          {
            "id": "f2fa6248-c23f-4281-b060-77149274dfa3"
          }
        ],
        "has_more": false
      },
      
      特别注意，如果 relation 个数大于 25个，则 has_more 值为 true
     */

    return (this.rawValue.relation || []).map((item: any) => item.id);
  }
}