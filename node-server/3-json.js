const http = require('http');
const fs = require('fs');

const courses = [
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'JS' },
  { name: 'Node' },
  { name: 'FrontEnd' },
];

const server = http.createServer((req, res) => {
  const url = req.url; // what?
  const method = req.method; // how?, action?
  if (url === '/courses') {
    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      // 자바스크립트 배열(courses)은 네트워크로 바로 못 보냄
      // 그래서 문자열(String)로 변환(JSON.stringify)해서 보내고 응답을 끝냄
      res.end(JSON.stringify(courses)); // js 객체(배열)를 json 문자열로 변환
    } else if (method === 'POST') {
      const body = [];
      // req.on('data'): 데이터가 스트림(물줄기)처럼 쪼개져서 들어올 때마다 실행
      // chunk 는 데이터의 작은 조각
      req.on('data', (chunk) => {
        console.log(chunk); // 조각난 데이터(버퍼) 눈으로 확인
        body.push(chunk);
      });
      // req.on('end'): 데이터 전송이 다 끝났을 때 실행
      req.on('end', () => {
        // 받은 json 문자열을 JS 객체로 변환
        // 1) Buffer.concat(body): 바구니에 담긴 조각들을 하나로 합침
        // 2) .toString(): 합친 기계어(Buffer)를 사람이 읽을 수 있는 문자열로 바꿈
        // 3) JSON.parse(): 문자열을 다시 자바스크립트 객체로 바꿈
        const course = JSON.parse(Buffer.concat(body).toString());
        courses.push(course);
        console.log(course);
        res.writeHead(201);
        res.end();
      });
    }
  }
});

server.listen(8080); // 어떤 포트를 통해서 내 서버가 계속 들을건지
