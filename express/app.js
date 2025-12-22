import express from 'express';
import fs from 'fs'; // 파일 시스템(File System) 모듈 (기본, 콜백/동기 방식용)
import fsAsync from 'fs/promises'; // 파일 시스템 모듈의 Promise 버전 (비동기 처리에 최적화됨)

// Express 애플리케이션 생성
const app = express(); // 'app'이라는 이름으로 서버 객체를 만듦

// 미들웨어 설정
// 들어오는 요청의 본문(body)이 JSON 형태라면 자동으로 파싱(분석)해서 자바스크립트 객체로 만들어줌
app.use(express.json());

// [경로 1] 동기(Synchronous) 방식으로 파일 읽기
app.get('/file1', (req, res) => {
  // 1. (주석 처리된 부분) : 콜백(Callback) 방식
  // fs.readFile('/file1.txt', (err, data) => { // 파일을 읽고 나서 함수를 실행
  //   if (err) {
  //     res.sendStatus(404); // 에러나면 404 응답
  //   }
  // });

  // 2. 동기(Sync) 방식 : 현재 실행 중인 코드
  try {
    // readFileSync는 파일을 다 읽을 때까지 코드 실행을 '멈추고' 기다림
    // 파일이 크다면 그동안 다른 사용자의 요청을 처리 못 할 수도 있음
    const data = fs.readFileSync('/file1.txt');

    // (이 예제에는 없지만 보통 읽은 data를 res.send(data)로 보내줌)
  } catch (error) {
    // 파일을 찾을 수 없거나 에러가 나면 catch 블록으로 넘어옴
    res.sendStatus(404); // "Not Found" 상태 코드를 보냄
  }
});

// [경로 2] 비동기(Promise) 방식으로 파일 읽기 (체이닝 방식)
app.get('/file2', (req, res) => {
  fsAsync
    .readFile('/file2.txt') // 1. 파일을 비동기로 읽음. (기다리지 않고 Promise 반환)
    .then((data) => {
      // 2. 성공하면 .then() 내부가 실행됨.
      res.send(data); // 읽은 데이터를 클라이언트에게 보냄.
    })
    .catch((error) => {
      // 3. 실패하면 .catch() 내부가 실행됨.
      res.sendStatus(404); // 에러 발생 시 404 응답
    });
});

// [경로 3] 비동기(Async/Await) 방식으로 파일 읽기
// 콜백이나 .then() 체이닝보다 코드가 직관적이고 읽기 쉬움
app.get('/file3', async (req, res) => {
  // 비동기 함수임을 알리기 위해 'async' 키워드 붙임
  try {
    // 'await' 키워드: 비동기 작업인 readFile이 끝날 때까지 기다림.
    // 하지만 동기(Sync) 방식과 달리 서버 전체를 멈추지 않고, 이 요청만 기다림. (효율적!)
    const data = await fsAsync.readFile('/file2.txt');

    // (여기서도 읽은 data를 res.send(data)로 보내주는 게 일반적)
  } catch {
    // 에러가 발생하면 catch 블록으로 넘어옴
    res.sendStatus(404);
  }
});

// 에러 처리 핸들러 (Safety Net)
// 버전 5 이하에서는: require('express-async-errors'); 같은 라이브러리가 필요했지만,

// Express 5부터는 비동기 에러도 자동으로 이 미들웨어로 넘어옴
app.use((error, req, res, next) => {
  console.error(error); // 서버 콘솔에 에러 내용을 출력해 개발자가 볼 수 있게 함

  // 클라이언트에게는 500(서버 내부 오류) 상태 코드와 메시지를 보냄
  res.status(500).json({ message: 'Something went wrong' });
});

// 서버 시작
// 8080 포트에서 요청을 기다림
app.listen(8080);
