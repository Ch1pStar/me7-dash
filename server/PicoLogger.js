import { autoDetect } from '@serialport/bindings-cpp'
import { SerialPort } from 'serialport';

export default class PicoLogger {

	constructor(portName = 'COM3') {
		this.port = null;
		this._portName = portName;

		this.sensorData = new Uint32Array(2);

		this._connectPico();
	} 

	get speed() {
		return this.sensorData[0];
	}

	async _connectPico() {
		if(this.port) return;

		const WindowsBinding = autoDetect()
		const ports = (await WindowsBinding.list()).filter((p)=>(p.path=='/dev/serial0'||p.path=='COM3'||p.path==this._portName));

		this.port = new SerialPort({
			path: ports[0].path,
			baudRate: 56000,
			// rtsMode: 'enable',
		});

		this.port.on('data', this._onData.bind(this));
	}

	_onData(data) {
		this.sensorData[0] = data.readUInt32BE(0);
		this.sensorData[1] = data.readUInt16BE(4);
	}
}
