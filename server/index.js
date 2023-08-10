import { KWP2000 } from 'me7log';
import { WebSocketServer } from 'ws';
import { setTimeout as delay } from 'node:timers/promises';

const wss = new WebSocketServer({ port: 8085 });

wss.on('connection', (ws) => {
	console.log('Connected');
	ws.on('message', (data) => {
		console.log('received: %s', data);
	});
});

initLogger();

async function initLogger() {
	const diag = new KWP2000({isDebug: false});

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
