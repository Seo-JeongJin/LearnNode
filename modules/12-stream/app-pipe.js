const fs = require('fs');

// 파일 압축을 위한 Node.js 내장 모듈인 'zlib'을 가져옴.
const zlib = require('zlib');

// './file.txt'를 읽어들이는 빨대(읽기 스트림)를 꽂음.
const readStream = fs.createReadStream('./file.txt');

// 데이터를 받아서 압축(gzip)해주는 변환 스트림(Transform Stream)을 만듭니다.
// (이 녀석은 중간에서 데이터를 받아 압축한 뒤 다음으로 넘겨주는 역할.)
const zlibStream = zlib.createGzip();

// 압축된 데이터를 './file4.zip'이라는 파일로 쓸(저장할) 준비를 하는 쓰기 스트림을 만듬.
const writeStream = fs.createWriteStream('./file4.zip');

// 파이프(pipe)를 줄줄이 연결.
// 순서: [읽기 스트림] -> (연결) -> [압축 스트림] -> (연결) -> [쓰기 스트림]
// 즉, file.txt 내용이 -> 압축기계를 통과해 -> file4.zip에 써짐.
const piping = readStream.pipe(zlibStream).pipe(writeStream);

// 모든 데이터가 다 흘러가고, 마지막 'writeStream' 작업이 끝났을 때(finish) 실행.
piping.on('finish', () => {
  // 완료되었다는 로그를 출력.
  console.log('Done!');
});

const http = require('http');
// 서버를 생성. (req: 요청 정보, res: 응답을 보낼 도구)
// 누군가 서버에 접속할 때마다 이 함수가 실행됨.
const server = http.createServer((req, res) => {
  // './file.txt'를 읽는 스트림을 생성.
  const stream = fs.createReadStream('./file.txt');

  // 읽은 스트림을 'res(응답)'에 바로 파이프(pipe)로 연결.
  // **중요 포인트**: res(response) 객체도 사실 '쓰기 가능한 스트림'.
  // 그래서 파일을 읽는 족족 브라우저(res)로 바로 데이터를 흘려보냄.
  stream.pipe(res);
});

// 3000번 포트에서 서버를 대기시킵니다. (localhost:3000 접속 가능)
server.listen(3000);
