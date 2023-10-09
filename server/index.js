import { readFile, open, mkdir } from 'node:fs/promises';
import { stdout } from 'node:process';
import https from 'node:https';
import { KWP2000 } from 'me7log';
import { WebSocketServer } from 'ws';
import { setTimeout as delay } from 'node:timers/promises';
import { parseArgs } from "node:util";
import MockDataLogger from './MockDataLogger.js'

try { await mkdir('logs'); }catch(e) {}

// const logFile = await open(`logs/log_${new Date().toLocaleString('en-GB').replace(' ', '_')}`, 'a');
const logFile = await open(`logs/log_${Date.now()}`, 'a');

stdout.write = (str) => {
	console.error(str)
	logFile.write(str);
}

const options = {
	key: (await readFile('./cert/key.pem')),
	cert: (await readFile('./cert/cert.pem'))
}
const server = new https.createServer(options).listen(8085);
const wss = new WebSocketServer({ server });
// const wss = new WebSocketServer({ port: 8085 });

let diag;

wss.on('connection', (ws) => {
	console.log('Connected');
	ws.on('message', (msg) => {
		const {command, data} = JSON.parse(msg);

		switch(command) {
		case 'readDTCs':
			diag.readDTCs();

			break;
		case 'clearDTCs':
			diag.clearDTCs();

			break;
		}
	});
});

const args = parseArgs({
  options: {
    'use-mock-data': {
      type: "boolean",
      short: "n",
    },
  },
  // tokens: true,
});

initLogger({
	useMockData: args.values['use-mock-data'],
});

async function initLogger({useMockData}) {
	diag = useMockData ? new MockDataLogger({isDebug: false}) :  new KWP2000({isDebug: false});

	await diag.init();
	await diag.wakeupECU();

	await diag.startDiagS();
	await diag.getECUId();
	await diag.setTimingParams();
	await diag.readDTCs();

	const pointerAddress = await diag.readPointerLoc();

	// console.log(pointerAddress)

	await diag.loadHandler();
	await diag.verifyHandler();
	await diag.readPointerLoc();
	await diag.redirectHandlerPointer();
	await diag.keepAlive();
	await diag.setLoggingVars();

	while(true) {
		// console.log('--------------------------')
		// console.time('read vars');
		await diag.readLogData();
		diag.parseLoggedData();
		// console.timeEnd('read vars');

		wss.clients.forEach((ws)=>{
			// console.log(parsed)
			ws.send(diag.latestData);
		});

		// console.log(data);
		await delay(50);
	}
}
