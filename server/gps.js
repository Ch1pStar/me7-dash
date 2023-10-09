import GPS from 'gps';
import { autoDetect } from '@serialport/bindings-cpp'

const Binding = autoDetect()
const ports = (await Binding.list()).filter((p)=>(p.path=='/dev/serial0'||p.path=='COM2'));
const port = await Binding.open({
	path: ports[0].path,
	baudRate: 9600,
	// rtsMode: 'enable',
});


const gps = new GPS;

gps.on('data', data => {
  console.log(data, gps.state);
})

port.on('data', data => {
  gps.updatePartial(data);
})