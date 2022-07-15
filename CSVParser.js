module.exports = class CSVParser {
	constructor() {
		this.headerCommentLen = 20;
		this.varNames;
		this.unitNames;
		this.varDesc;

		this.rpmIndex = -1;
		this.wTempIndex = -1;
		this.voltageIndex = -1;
		this.boostIndex = -1;
		this.rowCounter = 0;

		this.lastTimestamp = 0;
	}

	parseRow(data) {
	  data = Object.values(data).map(v=>v.trim());

	  if(this.rowCounter == this.headerCommentLen) this.varNames = data;
	  if(this.rowCounter == this.headerCommentLen+1) this.unitNames = data;;
	  if(this.rowCounter == this.headerCommentLen+2) this.varDesc = data;;

	  this.rowCounter++;
	  if(this.rowCounter < this.headerCommentLen) return;
	  if(!this.varNames) return;

	  data = data.map(v=>parseFloat(v));

	  if(this.rpmIndex < 0) this.rpmIndex = this.varNames.indexOf('nmot');
	  if(this.wTempIndex < 0) this.wTempIndex = this.varNames.indexOf('tmot');
	  if(this.voltageIndex < 0) this.voltageIndex = this.varNames.indexOf('ub');
	  if(this.boostIndex < 0) this.boostIndex = this.varNames.indexOf('pvdks_w');

	  const parsed = new Float32Array(4);

	  parsed[0] = data[this.boostIndex];
	  parsed[1] = data[this.rpmIndex];
	  parsed[2] = data[this.wTempIndex];
	  parsed[3] = data[this.voltageIndex];

	  const oldTimestamp = this.lastTimestamp;
	  this.lastTimestamp = process.hrtime.bigint();
	  const elapsed = parseInt(this.lastTimestamp - BigInt(oldTimestamp))/1000000;

	  console.log(elapsed, parsed)

	  return parsed;
	}

	resetCursor() {
	    this.varNames = null;
	    this.unitNames = null;
	    this.varDesc = null;
	    this.rpmIndex = -1;
	    this.wTempIndex = -1;
	    this.voltageIndex = -1;
	    this.rowCounter = 0;
	}

}