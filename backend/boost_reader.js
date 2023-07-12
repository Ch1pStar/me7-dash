const { SerialPort } = require('serialport')
const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
const tokPa = (value)=>map(value, 0.2, 4.9, 0, 250);

const port = new SerialPort({
  path: '/dev/ttyACM0',
  baudRate: 57600,
});
let report_mBar = console.log;


port.on('data', function (data) {
    // const mbar = tokPa(Number(data.toString()))*10;
    const mbar = Number(data.toString());

    report_mBar(mbar);
});

module.exports = function registerCallback(cb) {
    report_mBar = cb;
}
