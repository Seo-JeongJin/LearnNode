const os = require('os');

console.log(os.EOL === '\n'); // End Of the Line -> mac 에서는 \n -> true
console.log(os.EOL === '\r\n'); // -> window 에서 줄바꿈 하는것 -> false

console.log(os.totalmem());
console.log(os.freemem());
console.log(os.type());
console.log(os.userInfo());
console.log(os.cpus());
console.log(os.homedir());
console.log(os.hostname());
