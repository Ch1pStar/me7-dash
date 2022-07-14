const csv = require('csv-parser')
const fs = require('fs')
const results = [];


const headerCommentLen = 19;

// Object.values(results[headerCommentLen]);
let varNames;
let unitNames ;
let varDesc ;

let rpmIndex = -1;
let wTempIndex = -1;
let voltageIndex = -1;
let rowCounter = 0;


fs.createReadStream('test-logs/3.csv')
  .pipe(csv({
    skipComments: true,
  }))
  .on('data', (data) => {
    data = Object.values(data);
    
    console.log(data)

    if(rowCounter == headerCommentLen) varNames = data.map((n)=>n.trim());
    if(rowCounter == headerCommentLen+1) unitNames = data.map((n)=>n.trim());;
    if(rowCounter == headerCommentLen+2) varDesc = data.map((n)=>n.trim());;

    rowCounter++;
    if(rowCounter < headerCommentLen) return;

    if(!rpmIndex) rpmIndex = varNames.indexOf('nmot');
    if(!wTempIndex) wTempIndex = varNames.indexOf('tmot');
    if(!voltageIndex) voltageIndex = varNames.indexOf('uv');

    const parsed = [data[rpmIndex]];

      console.log(data)
  })
  .on('end', () => {

    console.log(varNames.indexOf('nmot'))

  });