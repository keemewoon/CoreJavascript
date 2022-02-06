/**
 * Execution Context
 * - Variable Environment : 최초의 식별자 정보는 가지고 있으나 값이 변하지 않는다.
 * - Lexical Environment : 실행 컨텍스트의 실행 내용에 따라서 변수값이 바뀔때 변경사항을 계속 트랙킹
 *      - environmentRecord : 현재 문맥의 식별자(hoisting) 
 *      - outerEnvironmentReference : 외부 식별자(scope chain)
 * - this
 */

// var eternalLoop = function() {
//     return eternalLoop();
// }
// eternalLoop(); //Maximum call stack size exceeded

//전역공간, 함수, module, eval()
//----------------------------------(0) 실행하는 순간 전역 컨텍스트가 콜 스택에 담김. 
//실행순서...
// var a = 1;
// function outer() {
//     console.log(a); //------(1)
//         function inner(){
//         console.log(a); //--------(2) 
//         var a = 3;
//     }
//     inner(); 
//     console.log(a); //-----(3)
// }
// outer(); 
// console.log(a); //-----(4)
//call Stack : 현재 어떤 함수가 동작중인지, 다음에 어떤 함수가 호출되는지 등을 제어하는 자료구조


//실행컨텍스트 내부의 환경정보
//1. LexicalEnvironment : 어휘적 환경, 사전적환경
// 현재 컨텍스트 내부에는 a,b,c와 같은 식별자들이 있고 그 외부 정보는 D를 참조하도록 구성되어 있다. => 현재 컨텍스트를 구성하는 환경정보들을 사전에서 접하는 느낌...?

//environnmentRecord: 환경기록 : 실행컨텍스트가 최조 실행될때 ..
// -> 현재 컨텍스트에 식별자 정보를 수집해서 envieronmentRecord에 담는 과정 : 호이스팅 : 정보수집과정을 이해하기위한 허구의 개념
// 식별자 정보를 끌어올리다..
//outerEnvironmentReference: 외부환경 참조 
// 외부의 LexicalEnvironment를 참조
// 스코프 체인 Scope Chain : 변수의 유효범휘 => 실행컨텍스트가 만드는것..
// function a (x){
//     console.log(x);
//     var x;
//     console.log(x);
//     var x = 2;
//     console.log(x);
// }
// a(1);

// function a(){
//     var x;
//     var x;
//     var x; 

//     x = 1;
//     console.log(x);
//     console.log(x);
//     x = 2;
//     console.log(x);
// }
// a(1);


// 원본코드
// function a () {
//     console.log(b);
//     var b = 'bbb'
//     console.log(b);
//     function b() {
//         console.log(b);
//     }
// }
// a();

// //위 코드 호이스팅
// function a(){
//     var b;              //수집 대상 1. 변수는 선언부만 끌어올립니다.
//     function b() {}     //수집 대상 2. 함수 선언은 전체를 끌어올립니다.

//     console.log(b);
//     b = 'bbb';
//     console.log(b);
//     console.log(b);
// }
// a();

// console.log(sum(1, 2));
// console.log(multiply(3, 4));

// function sum(a, b){
//     return a + b;
// }

// var multiply = function(a, b){
//     return a * b;
// }

//위 코드 호이스팅
// var sum = function sum(a, b){
//     return a + b;
// }
// var multiply;

// console.log(sum(1, 2));
// //console.log(multiply(3, 4)); //현재 multiply이라는 값이 할당 되어 있지 않기에 multiply is not a function에러 발생

// multiply = function(a, b){
//     return a * b;
// }

//예제 2-12 상대적으로 함수 표현식이 안전하다.

//console.log(sum(3, 4));

// var sum = function(x, y){
//     return x + y;
// };

// var a = sum(1, 2);
// var sum = function(x, y){
//     return x + '+' + y + '='+ (x+y);
// }
// var c = sum(1, 2);
// console.log(a);
// console.log(c);

// console.log(chicken); //변수 호이스팅.. 
/**
 * 변수가 생성되면 선언 -> 초기화 -> 할당 이 3단계에 걸쳐 생성되는데 Scope에 변수를 등록 후 변수를 위한 공간을 확보한 후 변수를 undefined로 초기화 하고 할당문에 도달하여 값이 할당되었을때 정상적으로 출력...
 * var는 함수 코드블럭 {()}만 Scope로 인정하기 떄문에 함수 외부에서 선언된 모든 변수는 전역변수다.
 */
// var chicken = 'nice';
// console.log(chicken);
