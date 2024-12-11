/**
 * 将数组按照指定大小进行拆分
 * @param rawArr 
 * @param size 
 * @returns 
 */
export function splitArray<T>(rawArr: Array<T>, size: number): Array<Array<T>> {
  const group: Array<Array<T>> = [];
  for (let i = 0; i < rawArr.length; i += size) {
    group.push(rawArr.slice(i, i + size));
  }
  return group;
}