/*
chapter04_콜백 함수
- 콜백 함수란 다른 코드의 인자로 넘겨주는 함수.
*/

//예제 4-1 콜백함수 예제(1-1) setInterval
// var count = 0;
// var timer = setInterval(function(){
//     console.log(count);         //0 1 2 3 4
//     if(++count > 4) clearInterval(timer);
// }, 300);


//setInterval의 구조
//var interbalID = scope.setInterval(func, delay[, param1, param2, ...]);


//예제 4-2 콜백함수 예제(1-2) setInterval
// var count = 0;
// var cbFunc = function() {
//     console.log(count);
//     if(++count > 4) clearInterval(timer);
// };
// var timer = setInterval(cbFunc, 300);
// console.log(timer);


//예제 4-3 콜백 함수 예제(2-1) Array.prototype.map
// var newArr = [10, 20, 30].map(function (currentValue, index){
//     console.log(currentValue, index);
//     return currentValue + 5;
// });

// console.log(newArr);

//예제 4-3 출력결과
// 10 0
// 20 1
// 30 2
// [ 15, 25, 35 ]

//prototype의 구조
// Array.prototype.map(callback, thisArg)
// callback: function(currentValue, index, array);


//예제 4-4 콜백함수 예제 (2-2) Array.prototype.map - 인자의 순서를 임의로 바꾸어 사용한 경우
// var newArr2 = [10, 20, 30].map(function (index, currentValue){
//     console.log(index, currentValue);
//     return currentValue + 5;
// });
// console.log(newArr2);

//출력결과
// 10 0
// 20 1
// 30 2
// [ 5, 6, 7 ] => 왜 [ 15, 25, 35 ]가 출력되지 않았을까? currentValue라고 명명한 인자의 위치가 두번째라서 컴퓨터가 여기에 인덱스 값을 부여했기 때문이다.

//callback함수에서의 this. "콜백함수도 함수이기 때문에 기본적으로는 this가 전역객체를 참조하지만, 제어권을 넘겨받을 코드에서 콜백함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상을 참조하게 된다."

//예제 4-5 콜백 함수 예제(2-3) Array.prototype.map - 구현
// Array.prototype.map = function(callback, thisArg){
//     var mapedArr = [];
//     for(var i = 0; i < this.length; i++){
//         var mapedArr = callback.call(thisArg || window, this[i], this);
//         mapedArr[i] = mappedValue;
//     }
//     return mapedArr;
// };

//예제 4-6 콜백함수 내부에서의 this
// setTimeout(function() { console.log(this); }, 300);

// [1,2,3,4,5].forEach(function(x) {
//     console.log(this);
// });

// document.body.innerHtml += '<button id="a">클릭<button>';
// document.body.querySelector('#a')
//     .addEventListener('click', function(e) {
//         console.log(this, e);
//     }
// );


//예제 4-7 메서드를 콜백함수로 전달한 경우 => ??안되는데여
// var obj = {
//     vals : [1, 2, 3],
//     logValues: function(v, i) {
//         console.log(this, v, i);
//     }
// };
// obj.logValues(1, 2);
// [4, 5, 6].forEach(obj, logValues);

//예제 4-8 콜백함수 내부의 this에 다른 값을 바인딩하는 방법(1) - 전통적인 방식
// var obj1 = {
//     name: 'obj1',
//     func: function() {
//         var self = this;
//         return function() {
//             console.log(self, name);
//         };
//     }
// };
// var callback = obj1.func();
// setTimeout(callback, 1000);

//예제 4-9 콜백함수 내부에서 this를 사용하지 않은경우
// var obj1 = {
//     name: 'obj1',
//     func: function() {
//         console.log(obj1, name);
//     }
// };
// setTimeout(obj1.func, 1000);

/*
05 콜백지옥과 비동기제어

비동기와 동기
동기적인 코드는 현재 실행중인 코드가 완료된 후에야 다음코드를 실행하는 방식

비동기적인 코드는 현재 실행중인 코드의 완료여부와 무관하게 즉시 다음으로 넘어갑니다. cpu의계산에 의해 즉시 처리가 가능한 대부분의 코드는 동기적인 코드입니다.
*/

//예제 4-12 콜백지옥 예시(1-1)
// setTimeout(function(name){
//     var coffeeList = name;
//     console.log(coffeeList);

//     setTimeout(function(name){
//         coffeeList += ', ' + name;

//         setTimeout(function(name){
//             coffeeList += ', ' + name;

//             setTimeout(function(name){
//                 coffeeList += ', ' + name;
//             }, 500, '카페라떼');
//         }, 500, '카페모카');
//     }, 500, '아메리카노');
// }, 500, '에스프레소');
//=> 가독성문제와 어색함을 동시에 해결하기 위하여 아래의 코드를 사용하자!

// 예제 4-13 콜백 지옥 해결 - 기명함수로 변환
// var coffeeList = '';

// var addEspresso = function(name){
//     coffeeList = name;
//     console.log(coffeeList);
//     setTimeout(addAmericano, 500, 'americano');
// };

// var addAmericano = function(name){
//     coffeeList += ', ' + name;
//     console.log(coffeeList);
//     setTimeout(addMocha, 500, 'cafeMocha');
// };

// var addMocha = function(name){
//     coffeeList += ', ' + name;
//     console.log(coffeeList);
//     setTimeout(addLatte, 500, 'cafeLatte');
// };

// var addLatte = function(name){
//     coffeeList += ', ' + name;
//     console.log(coffeeList);
// };

// setTimeout(addEspresso, 500, 'espresso');



//예제 4-14 비동기 작업의 동기적 표현(1) - Promise()
// new Promise(function(resolve) {
//     setTimeout(function() {
//         var name = 'espresso';
//         console.log(name);
//         resolve(name);
//     }, 500);
// }).then(function(prevName) {
//     return new Promise(function(resolve){
//         setTimeout(function() {
//             var name = prevName + ', americano';
//             console.log(name);
//             resolve(name);
//         }, 500)
//     });
// }).then(function (prevName){
//     return new Promise(function (resolve){
//         setTimeout(function() {
//             var name = prevName + ', cafeMocha';
//             console.log(name);
//             resolve(name);
//         }, 500);
//     });
// }).then(function(prevName) {
//     return new Promise(function (resolve) {
//         setTimeout(function () {
//             var name = prevName + ', cafeLatte';
//             console.log(name);
//             resolve(name);
//         }, 500);
//     });
// });


/**??이거 잘 모르겠음.. 알아볼것..
 * Promise란..?
 * 프로미스란 자바스크립트 비동기 처리에 사용되는 객체입니다.
 * 여기서 자바스크립트의 비동기 처리란? '특정코드의 실행이 완료될 때 까지 기다리지 않고, 다음 코드를 먼저 수행하는 자바스크립트 특성을 의미'합니다.
 * 
 * 왜 필요한가?
 * 주로 서버에서 받아온 데이터를 화면에 표시할때 사용한다.
 * 일반적으로 웹 애플리케이션을 구현할 때 서버에서 데이터를 요청하고 받아오기 위하여 사용..
 * - 실제 연산을 직접 처리해주는 것은 아니고, 해당 연산을 대리하여 결과나 실패를 처리하기 위한 처리기와 연결할 수 있도록 하는 객체
 * 
 * resolve(결과값), then(실행이 완료된 후 실행)
 */


//then()대신 catch()를 써야하는 이유?
//then()의 두번째 인자로는 감지하는 못하는 오류
// function getData(){
//     return new Promise(function(resolve, reject) {
//         resolve('hi');
//     });
// }

// getData().then(function(result){
//     console.log(result);
//     throw new Error("Error in then()");
// }, function(err){
//     console.log('then error: ', err);
// });


//catch()로 오류를 감지하는 코드
// function getData(){
//     return new Promise(function(resolve, reject) {
//         resolve('hi');
//     });
// }

// getData().then(function(result){
//     console.log(result); //hi
//     throw new Error("Error in then()");
// }).catch(function(err){
//     console.log('then error: ', err); //then error:  Error: Error in then()
// });

// var addCoffee = function(name) {
// 	return function(preName) {
// 		return new Promise(function (resolve) {
// 			setTimeout(function() {
// 				var newName = preName ? (preName + ', ' + name) : name;
// 				console.log(newName);
// 				resolve(newName);
// 			}, 500);
// 		});
// 	};
// };
// addCoffee('에스프레소')()
// 	.then(addCoffee('아메리카노'))
// 	.then(addCoffee('카페모카'))
// 	.then(addCoffee('카페라떼'));

// function getData() {
//     return new Promise(function(resolve, reject) {
//       reject(new Error("Request is failed"));
//     });
//   }
  
//   // reject()의 결과 값 Error를 err에 받음
//   getData().then().catch(function(err) {
//     console.log(err); // Error: Request is failed
//   });


//예제 4-16 비동기 작업의 동기적 표현(3) - Generator
// var addCoffee = function (preName, name){
//     setTimeout(function () {
//         coffeeMaker.next(preName ? preName + ', ' + name : name);
//     }, 500);
// };
// var coffeeGenerator = function* () {
//     var espresso = yield addCoffee('', '에스프레소');
//     console.log(espresso);
//     var americaon = yield addCoffee(espresso, '아메리카노');
//     console.log(americaon);
//     var mocha = yield addCoffee(americaon, '카페모카');
//     console.log(mocha);
//     var latte = yield addCoffee(mocha, '카페라떼');
//     console.log(latte);
// };

// var coffeeMaker = coffeeGenerator();
// coffeeMaker.next();

