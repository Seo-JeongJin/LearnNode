import express from 'express';
import { body, param, validationResult } from 'express-validator';

const app = express();
app.use(express.json()); // JSON 형태의 요청 바디를 파싱하기 위한 미들웨어입니다. ✅

// [공통 에러 처리 미들웨어]
// 유효성 검사 결과를 확인하고, 에러가 있다면 클라이언트에게 400 에러를 반환합니다.
const validate = (req, res, next) => {
  const errors = validationResult(req); // 위에서 정의한 검사 규칙들의 결과를 가져옵니다.
  if (errors.isEmpty()) {
    return next(); // 에러가 없다면 다음 로직(컨트롤러)으로 넘어갑니다.
  }
  // 에러가 있다면 첫 번째 에러 메시지를 JSON 형태로 응답합니다.
  return res.status(400).json({ message: errors.array()[0].msg });
};

// [사용자 생성 API]
app.post(
  '/users',
  [
    // body('필드명'): 요청 바디에 있는 값을 검사합니다.
    body('name').trim().isLength({ min: 2 }).withMessage('이름은 두글자 이상!'), // 공백 제거 후 최소 2자 이상인지 확인
    body('age').isInt().withMessage('숫자를 입력해'), // 정수 형태인지 확인
    body('email').isEmail().withMessage('이메일 입력해요').normalizeEmail(), // 이메일 형식 확인 및 소문자 정규화
    body('job.name').notEmpty(), // 중첩된 객체(job 안의 name)가 비어있지 않은지 확인
    validate, // 설정한 규칙들을 실제로 검사하는 미들웨어 실행
  ],
  (req, res, next) => {
    // 모든 유효성 검사를 통과했을 때만 실행됩니다.
    console.log(req.body);
    res.sendStatus(201);
  },
);

// [특정 이메일 사용자 조회 API]
app.get(
  '/:email',
  [
    // param('변수명'): URL 파라미터(:email)에 있는 값을 검사합니다.
    param('email').isEmail().withMessage('이메일 입력해요'),
    validate,
  ],
  (req, res, next) => {
    // 유효한 이메일 형식일 때만 하트 이모지를 보냅니다.
    res.send('💌');
  },
);

app.listen(8080);
