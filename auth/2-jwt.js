const jwt = require('jsonwebtoken');

// 1. 비밀 키 설정: 토큰의 '지문'을 대조할 때 사용하는 열쇠입니다. 🔐
const secret = 'fSTWh2471^%Vw9dmUyYR$BXL*VJhq&N&';

// 2. 토큰 발행: 유저 정보(id, isAdmin)를 넣고 '2초'간 유효한 토큰을 만듭니다.
const token = jwt.sign(
  {
    id: 'ellie',
    isAdmin: false,
  },
  secret,
  { expiresIn: 2 },
);

// 3. 생성된 토큰을 콘솔에 출력합니다. (이 문자열은 누구나 읽을 수 있지만 수정은 불가능합니다.)
console.log(token);

// [추가된 부분] 4. 즉시 검증: 토큰이 생성되자마자 검증을 수행합니다. 🚀
jwt.verify(token, secret, (error, decode) => {
  // 생성 직후이므로 만료되지 않았습니다.
  // error는 null이고, decode에는 { id: 'ellie', isAdmin: false, iat: ..., exp: ... }가 출력됩니다. ✅
  console.log(error, decode);
});

// 5. 지연 검증: 3초(3000ms)를 기다린 후 검증을 수행합니다. ⏳
setTimeout(() => {
  jwt.verify(token, secret, (error, decoded) => {
    // 토큰의 수명은 2초인데 3초가 지났으므로 'TokenExpiredError'가 발생합니다.
    // 보안을 위해 만료된 토큰은 더 이상 사용할 수 없음을 보여줍니다. ❌
    console.log(error, decoded);
  });
}, 3000);
