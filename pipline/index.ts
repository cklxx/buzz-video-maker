type Task<T> = (result: any, ...args: any[]) => T;
const AsyncFunction = (async () => {}).constructor;

async function excTask(task, param) {
    console.log(
        "[Async]:",
        task instanceof AsyncFunction === true,
        task
    );
	let excutionResult;
	if (task instanceof AsyncFunction === true) {
		excutionResult = await task(param);
	} else {
		excutionResult = task(param);
	}
	return excutionResult;
}

// 任务执行的流水线
class Pipeline<T> {
	tasks: Task<T>[] = [];
	initParams: any = {};
	constructor(initParams, task: Task<T>, ...args: Task<T>[]) {
		this.initParams = initParams;
		this.tasks.push(task);
		if (args && args.length > 0) {
			args.forEach((t) => {
				this.tasks.push(t);
			});
		}
		return this;
	}
	async run() {
		let excutionResult = await excTask(this.tasks[0], this.initParams);
		for (let i = 1; i < this.tasks.length; i++) {
			excutionResult = await excTask(this.tasks[i], excutionResult);
		}
	}

	add(task: Task<T>) {
		this.tasks.push(task);
	}
}

export { Pipeline };
