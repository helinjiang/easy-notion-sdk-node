/**
 * 附带耗时计算的日志打印对象
 */
export default class CostLogger {
  public logs: {
    info: string[];
    warn: string[];
  };

  private logCostMap: Record<string, number>;
  private shouldPrintByConsole: boolean;


  constructor(shouldPrintByConsole?: boolean) {
    this.shouldPrintByConsole = !!shouldPrintByConsole;
    this.logCostMap = {};
    this.logs = { info: [], warn: [] };
  }

  /**
   * 计时开始
   * @param logKey
   * @param appendMsg
   */
  public start(logKey: string, appendMsg?: string | Record<string, any>): void {
    this.logCostMap[logKey] = Date.now();

    const space = getStrWithMultiSpaces(Object.keys(this.logCostMap).length);

    this.info(`${space}开始: ${logKey}`, appendMsg);
  }

  /**
   * 计时结束
   * @param logKey
   * @param appendMsg
   */
  public end(logKey: string, appendMsg?: string | Record<string, any>): void {
    const space = getStrWithMultiSpaces(Object.keys(this.logCostMap).length);

    this.info(`${space}完成: ${logKey}，总耗时：${Date.now() - this.logCostMap[logKey]}ms`, appendMsg);

    delete this.logCostMap[logKey];
  }

  /**
   * 打印日志
   * @param msg
   * @param appendMsg
   * @param type
   */
  public info(msg: string | Record<string, any>, appendMsg?: string | Record<string, any>, type?: 'info' | 'warn'): void {
    const arr: string[] = [
      typeof msg === 'string' ? msg : JSON.stringify(msg),
    ];

    if (typeof appendMsg !== 'undefined') {
      arr.push(typeof appendMsg === 'string' ? appendMsg : JSON.stringify(appendMsg));
    }

    const tips = arr.join('，');

    // 普通消息
    this.logs.info.push(tips);

    // 警告消息
    if (type === 'warn') {
      this.logs.warn.push(tips);
    }

    if (this.shouldPrintByConsole) {
      console.log(tips);
    }
  }

  /**
  * 打印警告
  * @param msg
  * @param appendMsg
  */
  public warn(msg: string | Record<string, any>, appendMsg?: string | Record<string, any>): void {
    this.info(msg, appendMsg, 'warn');
  }

  /**
   * 获得警告日志
   * @returns 
   */
  public getWarnLogs(): string[] {
    return this.logs.warn || [];
  }
}

/**
 * 获得指定空格数量的字符串
 * @param count
 */
function getStrWithMultiSpaces(count: number): string {
  return new Array(count).fill('  ').join('');
}

export const costLogger = new CostLogger(true);
