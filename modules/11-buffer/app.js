// Fixed-size chuck of memory -> 고정된 사이즈의 메모리
// array of integers, byte of data -> 데이터에 있는 바이트 그 자체
const fs = require('fs');

const buf = Buffer.from('Hi'); // 버퍼 생성
console.log(buf); // <Buffer 48 69>
console.log(buf.length); // 2
console.log(buf[0]); // 아스키 코드 상 문자열 번호 출력 -> 72
console.log(buf[1]); // 105
console.log(buf.toString()); // 'Hi'

// create
const buf2 = Buffer.alloc(2); // 사이즈가 2개인 버퍼 생성 -> 메모리 초기화 후 생성
const buf3 = Buffer.allocUnsafe(2); // fast -> 메모리 초기화 하지 않고 생성
buf2[0] = 72; // 'H'
buf2[1] = 105; // 'i'
buf2.copy(buf3);
console.log(buf2.toString()); // 'Hi'
console.log(buf3.toString()); // 'Hi'

// concat
const newBuf = Buffer.concat([buf, buf2, buf3]);
console.log(newBuf.toString()); // 'HiHiHi'
