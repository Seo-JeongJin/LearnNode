const bcrypt = require('bcrypt');

const password = 'abcd1234';
const hashed = bcrypt.hashSync(password, 10);
console.log(`password: ${password}, hashed: ${hashed}`);

// 패스워드와 해싱된 값이 일치한 값인지 불린으로 반환
const result = bcrypt.compareSync('abcd1234', hashed);
console.log(result);
