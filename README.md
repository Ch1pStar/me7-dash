# 🚀 Digital Car Dashboard Frontend for ME7 family Bosch ECUs - Linux(ARM/x86) and Windows support

- Logging is done via a pure javascript library(https://github.com/Ch1pStar/me7log) so it should run on all platforms that have Node.js
- Logging method is based on the famous [ME7Logger](http://nefariousmotorsports.com/forum/index.php?topic=837.0)
- Tested with CH340 china cable on Windows and Raspberry Pi 400 and `8N0906018BP 0002` ECU.

# Usage

To start the logging server
```
cd server && node index.js
```

And to build the frontend
```
npm run build
```
