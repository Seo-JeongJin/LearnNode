const process = require('process');

console.log(process.execPath);
console.log(process.version);
console.log(process.pid);
console.log(process.ppid);
console.log(process.platform);
console.log(process.env);
console.log(process.uptime());
console.log(process.cwd());
console.log(process.cpuUsage());

setTimeout(() => {
  console.log('setTimeout');
}, 0);

process.nextTick(() => {
  // task queue에 다른 콜백 함수가 있어도 순서를 무시하고 nextTick의 콜백함수를 task queue의 가장 앞부분에 위치 시킴
  console.log('nextTick'); // -> setTimeout보다 먼저 출력됨
});

for (let i = 0; i < 100; i++) {
  console.log('for loop');
}
