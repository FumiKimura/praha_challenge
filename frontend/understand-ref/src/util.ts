export class CheckPerformance {
  private startTs: number;
  private endTs: number;

  constructor() {
    this.startTs = 0;
    this.endTs = 0;
  }

  public start() {
    this.startTs = window.performance.now();
  }

  public end() {
    this.endTs = window.performance.now();
  }

  public getPerformanceInMilliSeconds(): number {
    return this.endTs - this.startTs;
  }
}
