import { IRawDefine } from './property-base';
import { IRawQueryRecord } from '../../raw-types';

import PropertyDate from './properties/date';
import PropertyFormula from './properties/formula';
import PropertyMultiSelect from './properties/multi_select';
import PropertyNumber from './properties/number';
import PropertyRelation from './properties/relation';
import PropertyRichText from './properties/rich_text';
import PropertySelect from './properties/select';
import PropertyTitle from './properties/title';
import PropertyUniqueId from './properties/unique_id';

export default class PropertyHandler {
  private rawPropertyDefineMap: Record<string, IRawDefine>;
  private rawRecord: IRawQueryRecord;

  constructor(
    rawPropertyDefineMap: Record<string, IRawDefine>,
    rawRecord: IRawQueryRecord
  ) {

    this.rawPropertyDefineMap = rawPropertyDefineMap;
    this.rawRecord = rawRecord;
  }

  public getValue<T>(name: string, valueType?: string): T {
    // 有可能修改了表头名字找不到属性名，此时抛出错误
    const rawPropertyDefine = this.rawPropertyDefineMap[name];
    if (!rawPropertyDefine) {
      throw new Error(`找不此属性名(${name} ) 对应的定义，有可能是修改了 database 的字段名！`);
    }

    // 有可能修改了表头名字找不到属性名，此时抛出错误
    const rawPropertyValue = this.rawRecord.properties[name];
    if (!rawPropertyValue) {
      throw new Error(`找不此属性名(${name} ) 对应的值，可能出现了什么问题`);
    }

    // 依次进行匹配做处理
    const propertyArr = [
      PropertyDate,
      PropertyFormula,
      PropertyMultiSelect,
      PropertyNumber,
      PropertyRelation,
      PropertyRichText,
      PropertySelect,
      PropertyTitle,
      PropertyUniqueId,
    ];

    for (let index = 0; index < propertyArr.length; index++) {
      const Property = propertyArr[index];
      const property = new Property(rawPropertyDefine, rawPropertyValue);
      if (property.isMatch()) {
        let value = property.getValue();

        if (valueType === 'string') {
          value = `${value}`;
        } else if (valueType === 'number') {
          value = parseFloat(`${value}`);
        }

        return value as T;
      }
    }

    // 有可能还没有适配，此时直接返回原始数据
    console.error(`找不属性类型为 ${rawPropertyDefine.type} 的处理方式，需要在脚本中添加`);


    return rawPropertyValue as T;
  }
}