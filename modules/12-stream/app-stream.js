const fs = require('fs');

const data = []; // 읽어온 파일 조각(chunk)들을 담을 배열

// stream 생성
fs.createReadStream('./file.txt', {
  highWaterMark: 8, // 한 번에 읽어올 조각의 크기 설정 -> 64 kbytes(default)
  // encoding: 'utf-8', // utf-8로 설정하면 버퍼가 아닌 문자열로 읽힘
})
  // data 조각(chunk)가 들어올 때마다 함수 실행
  .on('data', (chunk) => {
    // console.log(chunk); -> 들어온 조각 내용을 출력해보는 코드
    data.push(chunk);
    console.count('data'); // 'data'라는 라벨과 함께 이 함수가 몇 번째 실행되었는지
  })
  // readStream이 끝나면(end 이벤트가 발생하면)
  .on('end', () => {
    console.log(data.join('')); // data에 있는 배열들을 묶어줌
  })
  .on('error', (error) => {
    console.log(error);
  });
