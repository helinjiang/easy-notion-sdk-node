export type IPropertyType =
  | 'title'
  | 'date'
  | 'relation'
  | 'select'
  | 'multi_select'
  | 'number'
  | 'formula'
  | 'unique_id';

export interface IRawDefine {
  id: string;
  name: string;
  type: IPropertyType;
  description?: string;
  [key: string]: any;
}

export interface IRawValue {
  id: string;
  type: IPropertyType;
  [key: string]: any;
}

export default class PropertyBase {
  // 属性定义
  public rawDefine: IRawDefine;

  // 属性值
  public rawValue: IRawValue;

  private readonly type: string;

  constructor(type: string, rawDefine: IRawDefine, rawValue: IRawValue) {
    this.type = type;
    this.rawValue = rawValue;
    this.rawDefine = rawDefine;
  }

  public isMatch(): boolean {
    return this.rawDefine.type === this.type;
  }

  public getValue(): any {
    throw new Error('Should override getValue()!');
  }
}
