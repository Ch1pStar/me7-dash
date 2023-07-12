module.exports = class CSVParser {
	constructor(headerEndLine = 'Log started at') {
		// headerEndLine = '-> Start logging'
		this.headerEndLine = headerEndLine;
		this.resetCursor();
	}

	parseRow(data) {
		data = Object.values(data).map(v=>v.trim());

		const firstCol = data[0];

		if(!firstCol) return;

		// console.log(firstCol)

		// don't continue parsing until the header segment is fully read
		if(firstCol.includes(this.headerEndLine)) {
			this.headerLinesRead = true;
			return;
		}
		if(!this.headerLinesRead) return;

		// set var names, maybe will be used in the future
		if(firstCol == 'TimeStamp') this.varNames = data;

		// dont continue parsing until data indices are mapped
		if(firstCol == 'TIME') this._setDataIndices(data);
		if(!this.unitNames) return;

		// do the actual parsing and measure the time since last row
		const parsed = this._formatDataRow(data);
		const oldTimestamp = this.lastTimestamp;
		this.lastTimestamp = process.hrtime.bigint();
		const elapsed = parseInt(this.lastTimestamp - BigInt(oldTimestamp))/1000000;

		// console.log(elapsed, parsed)

		return parsed;
	}

	_formatDataRow(data) {
		data = data.map(v=>parseFloat(v));

		const parsed = new Float32Array(5);

		parsed[0] = data[this.boostIndex] || 0;
		parsed[1] = data[this.rpmIndex] || 0;
		parsed[2] = data[this.wTempIndex] || 0;
		parsed[3] = data[this.voltageIndex] || 0;
		parsed[4] = data[this.accelPedalPosIndex] || 0;

		return parsed;
	}

	_setDataIndices(data) {
		this.unitNames = data;

		if(this.rpmIndex < 0) this.rpmIndex = this.unitNames.indexOf('EngineSpeed');
		if(this.wTempIndex < 0) this.wTempIndex = this.unitNames.indexOf('CoolantTemperature');
		if(this.voltageIndex < 0) this.voltageIndex = this.unitNames.indexOf('BatteryVoltage');
		if(this.boostIndex < 0) this.boostIndex = this.unitNames.indexOf('BoostPressureDesired');
		if(this.accelPedalPosIndex < 0) this.accelPedalPosIndex = this.unitNames.indexOf('AccelPedalPosition');	
	}

	resetCursor() {
		this.headerLinesRead = false;

		this.varNames = null;
		this.unitNames = null;
		this.varDesc = null;

		this.rpmIndex = -1;
		this.wTempIndex = -1;
		this.voltageIndex = -1;
		this.boostIndex = -1;
		this.accelPedalPosIndex = -1;

		this.lastTimestamp = 0;
	}

}