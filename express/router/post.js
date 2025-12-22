import express from 'express';

const router = express.Router();

// app.js의 '/posts' + 여기의 '/' = 실제 요청 주소 '/posts'
// 즉, 누군가 'GET /posts'를 호출하면 이 코드가 실행됨
router.get('/', (req, res) => {
  res.status(201).send('GET: /posts'); // 게시글 전체 목록 조회
});

// 실제 요청 주소: '/posts' (메서드만 POST로 다름)
router.post('/', (req, res) => {
  res.status(201).send('POST: /posts'); // 새 게시글 작성
});

// app.js의 '/posts' + 여기의 '/:id' = 실제 요청 주소 '/posts/1' 또는 '/posts/100'
// ':id'는 게시글 번호처럼 변하는 값이 들어오는 자리
router.put('/:id', (req, res) => {
  // 나중에 req.params.id 로 저 숫자(id)를 꺼내 쓸 수 있음
  res.status(201).send('PUT: /posts'); // 특정 게시글 수정
});

// 실제 요청 주소: '/posts/123' (DELETE)
router.delete('/:id', (req, res) => {
  res.status(201).send('DELETE: /posts'); // 특정 게시글 삭제
});

export default router; // 이 라우터를 app.js로 배달
