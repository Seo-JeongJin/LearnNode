let num = 1;

const interval = setInterval(() => {
  console.log(num++);
}, 1000); // 1초마다 콜백함수 수행

setTimeout(() => {
  console.log('Timeout!');
  clearInterval(interval); // 콜백함수 중지
}, 6000);
