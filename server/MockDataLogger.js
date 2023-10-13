import ILogger from './ILogger.js';
import { readFile } from 'node:fs/promises';

export default class MockDataLogger extends ILogger {

	constructor({isDebug, dataLen}) {
		super();

		this.dataSize = dataLen;
	}

	async init() {
		this.mockData = JSON.parse((await readFile('./mockData.json')).toString());

		const extraVars = this.dataSize - this.mockData.vars.length;

		this.latestData = new Float32Array(this.mockData.vars.length+extraVars);
		this._currentRow = -1;

		this.sweepGenerator = this.gaugeSweep();
	}

	nextDataRow() {
		this._currentRow = (this._currentRow+1)%this.mockData.data.length;

		return this.mockData.data[this._currentRow];
	}

	*gaugeSweep() {
		const vals = new Float32Array(this.mockData.vars.length);

		while(true) {
			vals[0] = (vals[0]+150)%8000;
			vals[1] = (vals[1]+0.1)%13.8;
			vals[2] = (vals[2]+5)%100;
			vals[3] = (vals[3]+20)%3000;
			vals[4] = (vals[4]+1)%160;

			yield vals;
		}
	}

	async readLogData() {
		const rowData = this.sweepGenerator.next().value;
		// const rowData = this.nextDataRow();

		// console.log(rowData)

		this.latestData.forEach((val, i)=>this.latestData[i] = rowData[i]);
		// console.log(rowData);
	}

	readDTCs() {
		console.log('Read DTCs')
	}

	clearDTCs() {
		console.log('Clear DTCs')
	}

}