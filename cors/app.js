import express from 'express';
import cors from 'cors'; // (참고: 실제 실행 시에는 이 패키지 import가 필요합니다)
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();

// --- [방법 1] 수동으로 헤더 설정하기 (주석 처리된 부분) ---
// 미들웨어(app.use)를 통해 모든 요청에 대해 응답 헤더를 직접 심어주는 방식.
// app.use((req, res, next) => {
//   // "http://127.0.0.1:5500 에서 온 요청은 데이터를 가져가도 좋다"고 명시
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//
//   // "OPTIONS, GET, POST... 등의 메서드 방식도 허용한다"고 명시
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, DELETE'
//   );
//   next(); // 다음 로직으로 넘어감
// });

// --- [방법 2] cors 라이브러리 사용 (현재 적용된 코드) ---
// 위처럼 일일이 헤더를 설정하는 번거로움을 줄여주는 'cors' 라이브러리를 사용.
// 내부적으로 'Access-Control-Allow-Origin' 헤더를 자동으로 생성.
const corsOptions = {
  // [핵심] 허용할 출처 목록 (Whitelist)
  // 브라우저 주소창에 'http://127.0.0.1:5500'이 떠 있다면, 서버도 똑같이 적어줘야 함.
  // 배열로 여러 개를 적을 수도 있음. 예: ['http://localhost:3000', 'http://127.0.0.1:5500']
  origin: ['http://127.0.0.1:5500'],

  // 오래된 브라우저(IE 등)를 위한 상태 코드 설정 (보통 204를 쓰지만 200으로 설정함)
  optionsSuccessStatus: 200,

  // [중요] 쿠키나 인증 헤더(Authorization)를 포함한 요청을 허용할지 여부
  // 프론트에서 credentials: 'include' 옵션을 켜서 보낼 경우, 서버도 이걸 true로 해줘야 함
  // 헤더에 'Access-Control-Allow-Credentials: true'가 추가됨
  credentials: true,
};

app.use(express.json());

// Cookie Parser 미들웨어 (외부: cookie-parser)
// 요청 헤더(Cookie)에 있는 문자열 "name=jeongjin; role=admin" 등을
// 자바스크립트 객체 { name: 'jeongjin', role: 'admin' } 형태로 변환해줍니다.
// 이제 'req.cookies.name' 처럼 쉽게 접근할 수 있어요!
// 만약 암호화된 쿠키를 쓴다면 app.use(cookieParser('secretKey')) 처럼 비밀키를 넣기도 해요.
app.use(cookieParser());

// HTTP Request Logger 미들웨어 (외부: morgan)
// "누가, 언제, 어떤 요청을 보냈고, 결과는 어땠는지"를 콘솔에 찍어줍니다.
// 'tiny': 최소한의 정보만 출력 (method, url, status, res content-length, response time)
// 개발할 땐 'dev' 옵션도 많이 써요 (색깔이 들어가서 보기가 편함).
// 예시 출력: GET /api/users 200 150 - 5.678 ms
app.use(morgan('tiny'));

// 보안 헤더 설정 미들웨어 (외부: helmet)
// HTTP 응답 헤더에 보안 관련 설정을 자동으로 추가해줍니다.
// 예: 'X-Powered-By: Express' 헤더를 숨겨서 우리가 Express를 쓴다는 걸 해커에게 들키지 않게 함.
// 그 외에도 XSS 공격 방지, 클릭재킹 방지 등 10개 이상의 보안 헤더를 자동으로 세팅해주는 '헬멧' 같은 존재예요.
app.use(helmet());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  // CORS 검사를 통과한 요청만 이 코드에 도달하여 응답을 받을 수 있음.
  console.log(req.body);
  console.log(req.cookies);
  res.send('Welcome!');
});

app.listen(8080, () => {
  console.log('서버가 8080 포트에서 실행 중입니다!');
});
