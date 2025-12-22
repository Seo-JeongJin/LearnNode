import express from 'express';

const router = express.Router(); // 작은 서버(미니 앱) 역할을 하는 라우터 객체 생성

// app.js에서 이미 '/users'로 연결해줬기 때문에,
// 여기서 '/'는 메인 주소인 '/users' + 현재 주소 '/' = 최종적으로 '/users'가 됨
router.get('/', (req, res) => {
  res.status(201).send('GET: /users'); // "유저 목록을 조회합니다" 같은 기능이 들어가겠죠?
});

export default router; // 이렇게 내보내야 app.js에서 `import userRouter`로 받아 쓸 수 있음
