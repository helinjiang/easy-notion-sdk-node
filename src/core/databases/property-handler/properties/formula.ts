import PropertyBase, { IRawDefine, IRawValue } from '../property-base';

export default class Property extends PropertyBase {
  constructor(rawDefine: IRawDefine, rawValue: IRawValue) {
    super('formula', rawDefine, rawValue);
  }

  public getValue(): any {
    /**
     * 属性定义
     *  {
        "id": "%7C%3AB%3F",
        "name": "熟练度分数",
        "description": "由正确率和练后效果评估进行折算，百分制",
        "type": "formula",
        "formula": {
          "expression": "ifs({{notion:block_property:yX%5CS:00000000-0000-0000-0000-000000000000:6728ecfc-5f15-4bfb-b937-a40c28e514cf}}.contains(\"L5\"), 100,{{notion:block_property:yX%5CS:00000000-0000-0000-0000-000000000000:6728ecfc-5f15-4bfb-b937-a40c28e514cf}}.contains(\"L4\"), 80,{{notion:block_property:yX%5CS:00000000-0000-0000-0000-000000000000:6728ecfc-5f15-4bfb-b937-a40c28e514cf}}.contains(\"L3\"), 60,{{notion:block_property:yX%5CS:00000000-0000-0000-0000-000000000000:6728ecfc-5f15-4bfb-b937-a40c28e514cf}}.contains(\"L2\"), 40,{{notion:block_property:yX%5CS:00000000-0000-0000-0000-000000000000:6728ecfc-5f15-4bfb-b937-a40c28e514cf}}.contains(\"L1\"), 20)*0.8+{{notion:block_property:wk_f:00000000-0000-0000-0000-000000000000:6728ecfc-5f15-4bfb-b937-a40c28e514cf}}*20"
        }
      }
     * 
     * 属性值
     * {
          "id": "%7C%3AB%3F",
          "type": "formula",
          "formula": {
            "type": "number",
            "number": 0
          }
        }

        {
          "id": "Wlz%3A",
          "type": "formula",
          "formula": {
            "type": "string",
            "string": "【2024-03-02】100,【2024-02-26】48"
          }
        }
     */

    // 根据 formula 的 type 来获取对应的值
    const type = this.rawValue.formula.type;

    return this.rawValue.formula[type] || (typeof type === 'number' ? 0 : '');
  }
}