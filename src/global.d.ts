declare global {
  /**
   * 基于 T，挑除 K 中指定的属性，返回新的对象
   */
  type WithExclude<T, K extends keyof T> = {
    [key in Exclude<keyof T, K>]: T[key];
  };

  type ChangeToOption<T, K extends keyof T> = {
    [key in K]?: T[key];
  };
}

/* 文件内必须包含一个 export 语句 */
export {};
