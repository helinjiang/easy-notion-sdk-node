import moment from 'moment';

export const getMomentUtc = (value?: moment.MomentInput, format?: moment.MomentFormatSpecification) => {
  // 注意要取东八区时间，否则服务器里面可能会有偏差
  return moment(value, format).utcOffset(8);
};

/**
 * 获得当前时间来展示
 * @param format
 */
export const getCurTimeToDisplay = (format?: string): string => {
  // 注意要取东八区时间，否则服务器里面可能会有偏差
  return getMomentUtc().format(format || 'YYYY-MM-DD HH:mm:ss');
};