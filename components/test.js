function* extractor(list = [], num = 1) {
  const removed = [];
  while (list.length > num) {
    if (removed.length) yield { list, removed };
    let half = Math.floor(list.length / 2);
    half = (half > num) ? half : num;
    while (list.length > half) {
      removed.push(list.pop());
    }
  }
  return { list, removed };
}

const raffle = extractor(new Array(20).fill(0).map(() => Math.random()), 3);

const remove = () => {
  let { value, done } = raffle.next();
  console.log(value, done);
  if (done) clearInterval(interval)
};
const interval = setInterval(remove, 1000);


// function* logGenerator() {
//   const a = yield 5;
//   console.log(a);
//   console.log(yield);
//   console.log(yield);
// }

// var gen = logGenerator();

// // the first call of next executes from the start of the function
// // until the first yield statement
// console.log(gen.next()); 
// console.log(gen.next('pretzel')); // pretzel
// console.log(gen.next('california')); // california
// console.log(gen.next('mayonnaise')); // mayonnaise
