/**
 * Chapther05_클로저(Closure)
 */

//예제 5-1 외부 함수의 변수를 참조하는 내부함수(1)
// var outer = function() {
//     var a = 1;
//     var inner = function() {
//         console.log(++a);
//     };
//     inner();
// }
// outer(); //2

//예제 5-2 외부 함수의 변수를 참조하는 내부 함수(2)
// var outer = function() {
//     var a = 1;
//     var inner = function () {
//         return ++a;
//     };
//     return inner;
// };

// var outer2 = outer();
// console.log(outer2());    //2
// console.log(outer2());    //3

// var fruits = ['apple','banana','peach'];
// var $ul = document.createElement('ul'); //(공통코드)

// fruits.forEach(function (fruit) {
//     var $li = document.createElement('li');
//     $li.innerText = fruit;
//     $li.addEventListener('click', function () {
//         alert('your choice is ' + fruit);
//     });
//     $ul.appendChild($li);
// });
// document.body.appendChild($ul);

//예제 5-13 bind메서드를 활용한 부분 적용 함수
// var add = function() {
//     var result = 0;
//     for(var i = 0; i < arguments.length; i++){
//         result += arguments[i];
//     }
//     return result;
// };
// var addPartial = add.bind(null, 1, 2, 3, 4, 5);
// console.log(addPartial(6, 7, 8, 9, 10));  //55


//예제 5-14부분 적용 함수 구현(1)
// var partial = function() {
//     var originalPartialArgs = arguments;
//     var func = originalPartialArgs[0];
//     if(typeof func !== 'function'){
//         throw new Error('첫 번째 인자가 함수가 아닙니다.');
//     }
//     return function() {
//         var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
//         var restArgs = Array.prototype.slice.call(arguments);
//         return func.apply(this, partialArgs.concat(restArgs));
//     };
// };

// var add = function() {
//     var result = 0;
//     for (var i = 0; i < arguments.length; i++){
//         result += arguments[i];
//     }
//     return result;
// };
// var addPartial = partial(add, 1, 2, 3, 4, 5);
// console.log(addPartial(6, 7, 8, 9, 10));   //55

// var dog = {
//     name : '강아지',
//     greet : partial(function(prefix, suffix) {
//         return prefix + this.name + suffix;
//     }, '왈왈, ' )
// };
// dog.greet('입니다!');


let f = function() {
    let abc = 123;
    let ddd = function() {
        return abc;
    }
    return ddd;
}
let ccc = f();
console.log(ccc());  //55  //return abc 하면 123이 출력됨
//console.log(abc); => 함수가 종료된 이후에 abc에 접근할 방법이 없어~ GC 
