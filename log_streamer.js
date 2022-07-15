const { WebSocketServer } = require('ws');
const csv = require('csv-parser');
const { spawn } = require('node:child_process');
const CSVParser = require('./CSVParser');

const wss = new WebSocketServer({ port: 8085 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
});

startLog();

function startLog() {
  const csvParser = new CSVParser();
  const isRealtime = process.argv.includes('--realtime')
  const ls = isRealtime ?
    spawn('./bin/ME7Logger.exe', ['-R', '-h', 'configs/dash_log.cfg'], {cwd: './me7logger/me7logger/'}) :
    spawn('node.exe', ['csv_log_stream_simulator.js']);

  ls.stdout
  .pipe(csv())
  .on('data', (data) => {
    const parsed = csvParser.parseRow(data);

    if(parsed) {
      wss.clients.forEach((ws)=>{
        // console.log(parsed)
        ws.send(parsed);
      });
    }
  })
  .on('end', ()=>{
    csvParser.resetCursor();

    if(isRealtime) {
      process.exit(0);
    }

    startLog();
  });
}