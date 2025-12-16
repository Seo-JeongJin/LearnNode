const path = require('path');

// POSIX (Unix: Mac, Linux): 'User/temp/myfile.html'
// Windows: 'C:\\temp\\myfile.html'

console.log(__dirname); // /Users/a1/node/9-path
console.log(__filename); // /Users/a1/node/9-path/app.js

console.log(path.sep); // / -> 경로 구분자
console.log(path.delimiter); //  -> 환경 변수 구분자

// basename
console.log(path.basename(__filename)); // app.js
console.log(path.basename(__filename, '.js')); // app

// dirname -> 디렉토리 이름
console.log(path.dirname(__filename)); // /Users/a1/node/9-path

// extension -> 확장자
console.log(path.extname(__filename)); // .js

// parse
const parsed = path.parse(__filename);
console.log(parsed);
console.log(parsed.root); // /
console.log(parsed.name); // app

const str = path.format(parsed);
console.log(str); // /Users/a1/node/9-path/app.js

// isAbsolute
console.log('isAbsolute?', path.isAbsolute(__dirname)); // /Users/ -> true
console.log('isAbsolute?', path.isAbsolute('../')); // -> 상위 폴더를 가리키므로 false

// normalize -> 경로가 잘못 적혔을 때 수정해줌
console.log(path.normalize('./folder////sub')); // folder/sub

// join
// console.log(__dirname + '/' + 'image');
console.log(__dirname + path.sep + 'image'); // /Users/a1/node/9-path/image
console.log(path.join(__dirname, 'image')); // /Users/a1/node/9-path/image
