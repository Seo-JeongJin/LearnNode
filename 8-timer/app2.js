console.log('code1');
console.time('timeout 0');
setTimeout(() => {
  console.timeEnd('timeout 0');
  console.log('setTimeout 0');
}, 0);

for (let i = 0; i < 1000; i++) {}

// console.log('code1');
// setTimeout(() => {
//   console.log('setTimeout 0');
// }, 0);

// console.log('code2');
// setImmediate(() => {
//   console.log('setImmediate');
// });

// console.log('code3');
// process.nextTick(() => {
//   console.log('process.nextTick');
// });

// 출력 결과
// code1
// code2
// code3
// process.nextTick
// setImmediate
// setTimeout 0
