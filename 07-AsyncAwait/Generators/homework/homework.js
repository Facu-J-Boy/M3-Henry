function fizzBuzzGenerator(max) {
  // Tu código acá:
// function* <-- es clave 
  // Tu código acá:
  let count = 1;
  while (max ? count <= max : true) {
    if (count % 3 === 0 && count % 5 === 0) {
      yield "Fizz Buzz"; //  yield --> pause
    } else if (count % 3 === 0) {
      yield "Fizz";
    } else if (count % 5 === 0) {
      yield "Buzz";
    } else yield count;
    count++;
  }
}
var t1 = fizzBuzzGenerator();
console.log("1", t1.next());
console.log("2", t1.next());
console.log("3", t1.next());
console.log("4", t1.next());
console.log("5", t1.next());
console.log("6", t1.next());


module.exports = fizzBuzzGenerator;
