/**
 * 用 customId 来生成标准的标题
 * 例如： 【XT-222】我是习题
 * @param originalTitle 
 * @param customId 
 * @returns 
 */
export const getStandardTitle = (originalTitle: string, customId: string): string => {
  return originalTitle.replace(/(^【[^】]*】)(.*)/i, (...args) => {
    return `【${customId}】${args[2]}`;
  });
}