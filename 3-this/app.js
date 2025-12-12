function hello() {
  console.log(this);
  console.log(this === global); // true -> 함수 안에서 this를 호출하면 global
}

hello();

class A {
  constructor(num) {
    this.num = num;
  }
  memberFunction() {
    console.log('----- class -----');
    console.log(this); // 클래스 자신을 가리키고 있음
    console.log(this === global); // false
  }
}

const a = new A(1);
a.memberFunction();

console.log('--- global scope ---');
console.log(this);
console.log(this === module.exports); // true
