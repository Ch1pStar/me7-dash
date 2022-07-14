const fs = require('fs')

const logfilePath = 'test-logs/4.csv';
let logData = '';
const sampleRate = 1000/20; // 20 samples per second or 50ms between samples

fs.createReadStream(logfilePath)
.on('data', (data) => logData+=data.toString())
.on('end', simulateRealtimeLog);

async function simulateRealtimeLog() {
  logData = logData.split('\r\n');

  for(let i=0;i<logData.length;i++) {
    const data = logData[i];

    console.log(data);
    await new Promise((res)=>setTimeout(res, sampleRate));
  }
}
