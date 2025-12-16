console.log('logging');

// log level
console.log('log'); // 개발
console.info('info'); // 정보
console.warn('warn'); // 경보
console.error('error'); // 에러, 사용자 에러, 시스템 에러

// assert -> 참이 아닌 경우에만 출력
console.assert(2 === 3, 'not same!'); // Assertion failed: not same!
console.assert(2 === 2, 'same!');

// print object
const student = {
  name: 'jina',
  age: 20,
  company: {
    name: 'AC',
  },
};
console.log(student);
console.table(student); // 객체를 테이블 형태로 출력
console.dir(student, {
  showHidden: true,
  colors: false,
  depth: 0, // 중첩된 오브젝트를 어느 선까지 보여줄지
});

// measuring time -> 성능 확인할 때 유용
console.time('for loop');
for (let i = 0; i < 10; i++) {
  i++;
}
console.timeEnd('for loop');

// counting
function a() {
  console.count('a function');
}
a(); // a function: 1
a(); // a function: 2
console.countReset('a function'); // reset
a(); // a function: 1

// trace
function f1() {
  f2();
}

function f2() {
  f3();
}

function f3() {
  console.log('f3');
  console.trace(); // 디버깅 할 때 해당 함수가 어디서 호출됐는지 알고 싶을 때
}

f1();
