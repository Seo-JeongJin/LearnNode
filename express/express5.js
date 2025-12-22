import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';

const app = express();

app.use(express.json());

// [경로 1] 동기 방식 (Sync)
app.get('/file1', (req, res) => {
  try {
    const data = fs.readFileSync('/file1.txt');
    res.send(data); // 차이점 1: 아까는 읽기만 하고 전송 코드가 없었는데, 이제 데이터를 보냄
  } catch (error) {
    res.sendStatus(404); // 여기는 여전히 직접 에러를 잡음 (동기 방식은 try-catch가 필수!)
  }
});

// [경로 2] 비동기 Promise 체이닝 방식
app.get('/file2', (req, res) => {
  // 차이점 2: 'return'이 생김
  // Express 5에서는 Promise를 리턴해주면, 나중에 에러가 났을 때 Express가 알아서 잡아서 밑으로 보냄
  return fsAsync.readFile('/file2.txt').then((data) => {
    res.send(data);
  });
  // 차이점 3: .catch()가 사라짐
  // 아까는 여기서 에러나면 404를 보냈지만, 지금은 에러 처리를 안 하고 그냥 둠
  // 그러면 에러가 '전파'되어 맨 아래 app.use(에러 핸들러)로 넘어감
});

// [경로 3] Async/Await 방식
app.get('/file3', async (req, res) => {
  // 차이점 4: try-catch 문이 완전히 사라짐
  // 코드가 훨씬 깔끔해짐
  // 내부적으로 readFile에서 에러가 터지면(throw), Express 5가 이걸 감지해서
  // 자동으로 맨 아래 에러 핸들러(next(err))로 넘겨버림
  const data = await fsAsync.readFile('/file2.txt');
  res.send(data);
});

// 글로벌 에러 핸들러 (Centralized Error Handling)
// 위쪽 /file2, /file3에서 발생한 에러들이 처리되지 않고 여기까지 내려옴
app.use((error, req, res, next) => {
  console.error(error);
  // 즉, 파일이 없으면 아까는 404가 떴지만,
  // 지금은 여기서 잡아서 일괄적으로 500 에러 메시지를 보내게 됨
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(8080);
