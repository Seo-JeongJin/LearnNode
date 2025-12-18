const http = require('http');
// const http2 = require('http2'); // https와 함께 적용됨

const fs = require('fs');
const ejs = require('ejs');

// console.log(http.STATUS_CODES);
// console.log(http.METHODS);

// 자바에서는 apache 필요하지만 node 에서는 기본적으로 이렇게만 작성해도 동작함
const name = 'Jina';
const courses = [
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'JS' },
  { name: 'Node' },
  { name: 'FrontEnd' },
];
const server = http.createServer((req, res) => {
  const url = req.url;
  res.setHeader('Content-Type', 'text/html');
  // url에 아무런 경로가 없다면
  if (url === '/') {
    ejs
      .renderFile('./template/index.ejs', { name })
      .then((data) => res.end(data));
  } else if (url === '/courses') {
    ejs
      .renderFile('./template/courses.ejs', { courses })
      .then((data) => res.end(data));
  } else {
    ejs
      .renderFile('./template/not-found.ejs', { name })
      .then((data) => res.end(data));
  }
});

server.listen(8080); // 어떤 포트를 통해서 내 서버가 계속 들을건지
