const { WebSocketServer } = require('ws');
const csv = require('csv-parser');
const { spawn } = require('node:child_process');


const wss = new WebSocketServer({ port: 8085 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
});

streamFile();

const headerCommentLen = 20;
let varNames;
let unitNames;
let varDesc;

let rpmIndex = -1;
let wTempIndex = -1;
let voltageIndex = -1;
let boostIndex = -1;
let rowCounter = 0;

let lastTimestamp = 0;

function parseRow(data) {
  data = Object.values(data).map(v=>v.trim());

  if(rowCounter == headerCommentLen) varNames = data;
  if(rowCounter == headerCommentLen+1) unitNames = data;;
  if(rowCounter == headerCommentLen+2) varDesc = data;;

  rowCounter++;
  if(rowCounter < headerCommentLen) return;
  if(!varNames) return;

  data = data.map(v=>parseFloat(v));

  if(rpmIndex < 0) rpmIndex = varNames.indexOf('nmot');
  if(wTempIndex < 0) wTempIndex = varNames.indexOf('tmot');
  if(voltageIndex < 0) voltageIndex = varNames.indexOf('ub');
  if(boostIndex < 0) boostIndex = varNames.indexOf('pvdks_w');

  const parsed = new Float32Array(4);

  parsed[0] = data[boostIndex];
  parsed[1] = data[rpmIndex];
  parsed[2] = data[wTempIndex];
  parsed[3] = data[voltageIndex];

  const oldTimestamp = lastTimestamp;
  lastTimestamp = process.hrtime.bigint();
  const elapsed = parseInt(lastTimestamp - BigInt(oldTimestamp))/1000000;

  console.log(elapsed, parsed)

  return parsed;
}

function streamFile() {
  const ls = spawn('node.exe', ['csv_log_stream.js']);

  ls.stdout
  .pipe(csv())
  .on('data', (data) => {
    const parsed = parseRow(data);

    if(parsed) {
      wss.clients.forEach((ws)=>{
        // console.log(parsed)
        ws.send(parsed);
      });
    }
  })
  .on('end', ()=>{
    varNames = null;
    unitNames = null;
    varDesc = null;
    rpmIndex = -1;
    wTempIndex = -1;
    voltageIndex = -1;
    rowCounter = 0;

    streamFile();
  });
}