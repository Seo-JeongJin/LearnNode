import express from 'express';
// 각 기능을 담당할 '부서(라우터)' 파일들을 불러옴
import postRouter from './router/post.js';
import userRouter from './router/user.js';

const app = express();

// 1. JSON 데이터 파싱 (해석) 미들웨어
// 클라이언트(프론트엔드)에서 보내는 데이터가 JSON 형식일 때,
// 이를 자바스크립트 객체로 변환해서 'req.body'에 넣어주는 역할을 함
// 예: { "name": "jeongjin", "age": 25 } -> req.body.name으로 접근 가능해짐
app.use(express.json());

// 2. URL-encoded 데이터 파싱 미들웨어 (주로 HTML Form 요청)
// HTML <form> 태그로 전송된 데이터(application/x-www-form-urlencoded)를 해석함
// extended: false -> Node.js 기본 모듈인 'querystring' 라이브러리를 사용 (단순한 객체 구조만 해석 가능)
// extended: true -> 외부 라이브러리인 'qs'를 사용 (객체 안에 객체가 있는 등 복잡한 구조도 해석 가능)
app.use(express.urlencoded({ extended: false }));

// 3. 정적 파일 제공을 위한 옵션 설정 객체
const options = {
  // .으로 시작하는 파일(예: .env, .git)에 대한 요청이 오면 어떻게 할지 설정
  // 'ignore': 요청을 무시하고 404 에러를 보냄 (보안상 중요!)
  dotfiles: 'ignore',

  // ETag(파일 버전 관리 헤더) 생성을 비활성화
  // 파일이 변경되지 않았는지 확인하는 캐싱 관련 기능을 끔 (서버 부하 줄이거나 캐시 정책 직접 관리 시 사용)
  etag: false,

  // 디렉토리 요청 시 index.html 같은 기본 파일을 자동으로 찾아서 보여줄지 여부
  // false: 폴더 경로로 접근해도 index.html을 자동으로 띄우지 않음
  index: false,

  // 캐시 유지 기간 (Cache-Control 헤더 설정)
  // '1d'는 1일(1 day) 동안 브라우저가 파일을 캐시(저장)하도록 함 (밀리초 단위 숫자나 문자열 가능)
  maxAge: '1d',

  // URL 끝에 슬래시('/')가 없을 때 자동으로 리다이렉트할지 여부
  // false: 경로 끝에 슬래시가 없어도 리다이렉트 하지 않음
  redirect: false,

  // 파일을 보낼 때 HTTP 응답 헤더를 추가로 설정하는 함수
  setHeader: function (res, path, stat) {
    // 'x-timestamp'라는 커스텀 헤더에 현재 시간을 담아서 보냄
    // (참고: 원본 코드의 Data.now()는 오타라서 Date.now()로 수정해야 작동함)
    res.set('x-timestamp', Date.now());
  },
};

// 4. 정적 파일 제공 미들웨어
// 'public'이라는 폴더 안에 있는 파일들(이미지, CSS, JS 파일 등)을
// 브라우저에서 바로 접근할 수 있게 해줌 (예: http://localhost:3000/image.jpg)
// 뒤에 options 객체를 붙여서 위에서 설정한 규칙들을 적용함
app.use(express.static('public', options));

// "주소가 '/posts'로 시작해? 그럼 postRouter(post.js 파일) 네가 처리해!"
// 이제부터 postRouter 내부의 모든 경로는 앞에 '/posts'가 자동으로 붙은 셈이 됨
app.use('/posts', postRouter);

// "주소가 '/users'로 시작해? 그럼 userRouter(user.js 파일) 네가 맡아!"
app.use('/users', userRouter);

app.listen(8080);
