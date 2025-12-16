const EventEmitter = require('events');
const emitter = new EventEmitter();

// on -> 첫 번째 인자의 이름의 이벤트가 발생할 때마다 콜백 함수 호출
const callback1 = (args) => {
  console.log('first callback - ', args);
};
emitter.on('jina', callback1);

emitter.on('jina', (args) => {
  console.log('second callback - ', args);
});

// emit -> 첫 번째 인자의 이름인 이벤트를 발생시키고 두 번째 인자의 값을 넘김
emitter.emit('jina', { message: 1 });
emitter.emit('jina', { message: 2 });
emitter.removeListener('jina', callback1); // jina라는 이벤트에 등록된 콜백함수 제거
// emitter.removeAllListener(); // 모든 이벤트에 대해 등록된 콜백함수 제거
emitter.emit('jina', { message: 3 });
