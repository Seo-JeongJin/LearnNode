const fs = require('fs');

// 비효율적임
const beforeMem = process.memoryUsage().rss; // 현재 사용중인 메모리 상태를 저장
// 파일 읽기
fs.readFile('./file.txt', (_, data) => {
  fs.writeFile('./file2.txt', data, () => {}); // 읽은 데이터를 새로운 파일에 저장
  // calculate -> 실제로 메모리 사용에 얼마나 큰 변화가 있는지
  const afterMem = process.memoryUsage().rss; //
  const diff = afterMem - beforeMem;
  const consumed = diff / 1024 / 1024;
  console.log(diff);
  console.log(`Consumed Memory: ${consumed}MB`); // 현재 데이터를 다 읽어서 새로운 데이터로 저장하는데까지 소모된 메모리
});
