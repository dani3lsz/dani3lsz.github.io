export function timeout(ms: number = 0): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export function waitForProperty(obj: any, key: string, val: any, interval: number = 100): Promise<any> {
  return new Promise((res) => {
    const check = () => {
      if (obj[key] === val) { res(true); }
      else { setTimeout(check, interval); }
    };

    setTimeout(check, interval);
  });
}

class TaskInstance {
  isRunning = false;
  cancelled = false;

  async run(generator: (...params: any) => Generator, ...params: any): Promise<any> {
    const iterable = generator(...params);

    this.isRunning = true;

    let yielded: any;

    while (!this.cancelled) {
      const { value, done } = iterable.next(yielded);

      if (done) {
        yielded = value;
        break;
      }

      yielded = await new Promise((res, rej) => {
        if (!value?.then) { res(value); }

        value.then(res).catch(rej);
      });
    }

    this.isRunning = false;

    return yielded;
  }

  cancel(): void {
    this.cancelled = true;
    this.isRunning = false;
  }
}

export class Task {
  constructor(
    generator: (...params: any) => Generator,
    opt: { drop?: boolean, restartable?: boolean, enqueue?: boolean, maxConcurrency?: number } = {}
  ) {
    this.generator = generator;

    if (opt.drop) { this.drop = true; }
    else if (opt.restartable) { this.restartable = true; }
    else if (opt.enqueue) { this.enqueue = true; }
    if (opt.maxConcurrency) { this.maxConcurrency = opt.maxConcurrency; }
  }

  drop = false;
  restartable = false;
  enqueue = false;
  maxConcurrency = 0;
  generator: (...params: any) => Generator;
  instances: Array<TaskInstance> = [];
  lastRun: Promise<any>;

  get isRunning(): boolean {
    return !!this.instances.find((instance) => instance.isRunning);
  }

  get isIdle(): boolean {
    return !this.isRunning;
  }

  perform = (...params: any): Promise<any> => {
    if (!this.isRunning) { return this.addInstance(...params); }
    if (this.drop) { return this.lastRun; }
    if (this.restartable) { return this.performRestartable(...params); }

    return this.addInstance(...params);
  }

  performRestartable(...params: any): Promise<any> {
    const instance = this.instances.pop();

    instance.cancel();

    return this.addInstance(...params);
  }

  addInstance(...params: any): Promise<any> {
    const instance = new TaskInstance();

    this.instances.push(instance);

    this.lastRun = instance.run(this.generator, ...params);

    return this.lastRun;
  }

  cancelAll(): void {
    this.instances.forEach((instance) => {
      if (instance.isRunning) { instance.cancel(); }
    });
  }
}
