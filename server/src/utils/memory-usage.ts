export class MemoryUsage {
  unit: Array<string>;
  constructor() {
    this.unit = ['', 'K', 'M', 'G', 'T', 'P'];
  }
  bytesToSize(this: MemoryUsage, input: any, precision: number) {
    const index = Math.floor(Math.log(input) / Math.log(1024));
    // @ts-ignore
    if (this.unit >= this.unit.length) return input + ' B';
    return (
      (input / Math.pow(1024, index)).toFixed(precision) +
      ' ' +
      this.unit[index] +
      'B'
    );
  }
  testUsage(this: MemoryUsage) {
    const usage = process.memoryUsage();
    console.log('==================================');
    console.log('  Empty Node Module Memory Usage  ');
    console.log('==================================');

    setInterval(() => {
      console.log(
        'RSS: ' + this.bytesToSize(usage.rss, 3),
        'and Heap:',
        this.bytesToSize(usage.heapUsed, 3),
        'of',
        this.bytesToSize(usage.heapTotal, 3),
        'total'
      );
    }, 1000);
  }
}
