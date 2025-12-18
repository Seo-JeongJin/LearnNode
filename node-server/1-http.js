const http = require('http');
// const http2 = require('http2'); // https와 함께 적용됨

const fs = require('fs');

// console.log(http.STATUS_CODES);
// console.log(http.METHODS);

// 자바에서는 apache 필요하지만 node 에서는 기본적으로 이렇게만 작성해도 동작함
const server = http.createServer((req, res) => {
  console.log('incoming...');
  console.log(req.headers);
  console.log(req.httpVersion);
  console.log(req.method);
  console.log(req.url);

  const url = req.url;
  // url 이 아무런 경로가 없다면
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('./html/index.html').pipe(res);
    // res.write('<html>');
    // res.write('<head><title>Academy</title></head>');
    // res.write('<body><h1>Welcome!</h1></body>');
    // res.write('</html>');
  } else if (url === '/courses') {
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('./html/courses.html').pipe(res);
    // res.write('<html>');
    // res.write('<head><title>Academy</title></head>');
    // res.write('<body><h1>Courses</h1></body>');
    // res.write('</html>');
  } else {
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('./html/not-found.html').pipe(res);
    // res.write('<html>');
    // res.write('<head><title>Academy</title></head>');
    // res.write('<body><h1>Not Found</h1></body>');
    // res.write('</html>');
  }

  // res.end();
});

server.listen(8080); // 어떤 포트를 통해서 내 서버가 계속 들을건지
