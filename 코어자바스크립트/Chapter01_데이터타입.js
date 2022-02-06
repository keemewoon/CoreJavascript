/** 
 * 2022-01-07
 * Chapter 01. 데이터 타입
*/

//변할 수 있는 데이터를 만든다. 
// 이 데이터의 식별자는 a로 한다.
var a; 
a = 'abc'; //변수 a에 데이터 할당

var a = 'abc' //변수 선언과 할당을 한 문장으로 표현

//console.log(a);

//즉 변수란? 변경가능한 데이터가 담길 수 있는 공간 또는 그릇

//숫자형 데이터 : 64비트(8바이트)
//문자형 데이터 : 영어 1바이트, 한글 2바이트

//참조형 데이터의 할당
var obj1 = {
    a: 1,
    b: 'bbb'
};
//기본형 데이터와의 차이점: '객체의 변수(프로퍼티) 영역'이 별도로 존재한다는 점.

obj1.a = 2; //변수에는 얼마든지 다른 값을 대입할 수 있다. => 그래서 흔히 가변값이라고도 함.
//console.log(obj1.a);

//중첩객체(nested object)
var obj = {
    x: 3,
    arr: [3, 4, 5]
};

obj.arr = 'str';
//console.log(obj.arr);


//1-4-3 변수 복사 비교
var a = 10;
var b = a;
var obj1 = {c: 10, d: 'ddd'};
var obj2 = obj1;

b = 15;
//obj.c = 20;
obj2 = {c:20, d:'ddd'};

//가변은 데이터 자체가 아닌 내부 프로퍼티를 변경할 때만 성립합니다.


//불변성
/*
var user = {
    name: 'Jeanam',
    gender: 'male'
};

var changeName = function(user, newName){
    var newUser = user;
    newUser.name = newName;
    return newUser;
};

var user2 = changeName(user, 'Jung');

if(user != user2 ){
    console.log('유저 정보가 변경되었습니다.');
}
console.log(user.name, user2.name); //Jung Jung
console.log(user === user2);        //true
*/
//위 코드 고침
var user = {
    name: 'Jeanam',
    gender: 'male'
};

var chungName = function(user, newName){
    return{
        name: newName,
        gender: user.gender
    };
};

var user2 = chungName(user, 'Jung');

if(user !== user2){
    //console.log('유저 정보가 변경되었습니다.'); //유저 정보가 변경되었습니다.
}

//console.log(user.name, user2.name); //Jeanam Jung
//console.log(user === user2);        //false


//모든 개발자들이 user객체 내부의 변경이 필요할 때는 무조건
//copyObject 함수를 사용하기로 합의하고, 그 규칙을 지킨다는 전제 하에 user객체 == 불변객체
//시스템적으로 제약을 거는법(immutable.js, baobab.js) ->찾아볼것
copyObject = function(target){
    var result = {};
    for(var prop in target){
        result[prop] = target[prop];
    }
    return result;
}

//console.log(copyObject('meewoon'));


var user = {
    name: 'Jaenam',
    gender:'male'
};

var user2 = copyObject(user);
user.name = 'Jung';

if(user !== user2){
//    console.log('유저정보가 변경되었습니다.');
}
//console.log(user.name, user2.name);
//console.log(user === user2);




//1-5-2 얕은 복사와 깊은 복사
//얕은복사: 바로 아래단계의 값만 복사하는 방법
//깊은복사: 내부의 모든 값들을 찾아서 하나하나 복사하는 방법

//1.얕은복사
var user = {
    name: 'Keemewoon',
    urls: {
        portfolio: 'http://github.com/abc',
        blog: 'http://blog.com',
        facebook: 'http://facebook.com/abc'
    }
};
var user2 = copyObject(user);

user2.name = 'Jung'; //user2의 프로퍼티를 바꿔도 user의 name은 바뀌지 않는다.
//console.log(user.name === user2.name); //false

//user.urls.portfolio = 'http://portfolio.com'; //한단계 더 들어간 urls의 내부 데이터는 기존데이터를 그대로 참조..
//console.log(user.urls.portfolio === user2.urls.portfolio); //true

//user2.urls.blog = '';
//console.log(user.urls.blog === user2.urls.blog); //true





//user.urls 프로퍼티 불변객체로 만들기
var user2 = copyObject(user);
user2.urls = copyObject(user.urls); //copyObject 함수를 실행한 결과를 할당 => urls 프로퍼티의 내부까지 복사해서 새로운 데이터 만듬!

user.urls.portfolio = 'http://portfolio.com';
//console.log(user.urls.portfolio === user2.urls.portfolio); //false

user2.urls.blog = '';
//console.log(user.urls.blog === user2.urls.blog); //false
//user.urls와 user2.urls의 값이 서로 다르다고 나온다!! 이게바로 깊은복사당
//기본형 데이터일 경우에는 그대로 복사하면 되지만 참조형 데이터는 다시 긔 내부의 프로퍼티들을 복사해야 한다.




//깊은복사
var copyObjectDeep = function(target) {
    var result = {};
    if (typeof target === 'object' && target !== null) { //type이 object이거나 null이 아닐떄
        for (var prop in target){
            result[prop] = copyObjectDeep(target[prop]);  //copyObjectDeep함수 재귀적으로 호출
        }
    } else {
        result = target; //object가 아닐때는 target 그대로 저장
    }
    return result;
};

var obj = {
    a: 1,
    b: {
        c: null,
        d: [1,2]
    }
};
var obj2 = copyObjectDeep(obj);
obj2.a = 3;
obj2.b.c = 4;
obj.b.d[1] = 3;

//console.log(obj); //{ a: 1, b: { c: null, d: [ 1, 3 ] } }
//console.log(obj2); //{ a: 3, b: { c: 4, d: { '0': 1, '1': 2 } } }
//hasOwnProperty 메서드 검색해보기


//깊은 복사를 처리할수 있는 또다른 방법
var copyObjectViaJSON = function(target){
    return JSON.parse(JSON.stringify(target));
};
var obj = {
    a : 1,
    b : {
        c : null,
        d : [1,2],
        func1 : function() { console.log(3); }
    },
    func2 : function() { console.log(4); }
};
var obj2 = copyObjectViaJSON(obj);

obj2.a = 3;
obj2.b.c = 4,3;
obj.b.d[1] = 3;

//console.log(obj); //{a: 1, b: { c: null, d: [ 1, 3 ], func1: [Function: func1] },  func2: [Function: func2] }
//console.log(obj2); //{ a: 3, b: { c: 4, d: [ 1, 2 ] } }


//undefined null
//undefined: 자바스크립트가 사용자가 응당 어떤 값을 지정할 것이라고 예상되는 상황임에도 실제로는 그렇게 하지 않았을때 반환하는 값
var test;
//console.log(test); //(1) undefined. 값을 대입하지 않은 변수에 접근

var obj = { a : 1 };
//console.log(obj.a); //1
//console.log(obj.b); //(2) 존재하지 않는 프로퍼티에 접근
//console.log(haha); //is not defined

var func = function(){};
var c = func();
//console.log(c); //(3) 반환(return)값이 없으면 undifined를 반환한 것으로 간주


//undefined와 배열
var arr1 = [];
arr1.length = 3;
//console.log(arr1); //[ <3 empty items> ]

var arr2 = new Array(3);
//console.log(arr2); //[ <3 empty items> ]

var arr3 = [undefined, undefined, undefined];
//console.log(arr3); //[ undefined, undefined, undefined ]


var arr1 = [undefined, 1];
var arr2 = [];
arr2[1] = 1;

arr1.forEach(function(v, i) {console.log(v, i); }); //undefined 01 1
arr2.forEach(function(v, i) {console.log(v, i); }); //1 1

arr1.map(function (v, i) {return v + i; });
arr2.map(function (v, i) {return v + i; });


arr1.filter(function(v) {return !v; });
arr2.filter(function(v) {return !v; });

arr1.reduce(function (p, c, i) {return p + c + i; }, '');
arr2.reduce(function (p, c, i) {return p + c + i; }, '');

var n = null;
console.log(typeof n); //object

console.log(n == undefined); //true
console.log(n == null); //true
console.log(n === undefined); //false
console.log(n === null); //true
//동등연산자로 비교할경우 undifined와 null이 서로 같다고 판단합니다.
//일치 연산자를 써야만 정확한 판별을 할 수 있다.


/**
 * 자바스크립트 데이터 타입에는 크게 기본형과 참조형이 있습니다. 기본적으로 기본형은 불변값이고 참조형은 가변값입니다.
 * 변수는 변경 가능한 데이터가 담길 수 있는 공간이고, 식별자는 그 변수의 이름을 말합니다.
 * 변수를 선언하면 컴퓨터는 우선 메모리의 빈 공간에 식별자를 저장하고, 그 공간에 자동으로 undefined를 할당합니다.
 * 이후 그 변수에 기본형 데이터를 할당하려고 하면 별도의 공간에 데이터를 저장하고, 그 공간의 주소를 변수의 값 영역에 할당합니다.
 * 참조형 데이터를 할당하고자 할 경우 컴퓨터는 참조형 데이터 내부 프로퍼티들을 위한 변수 영역을 별도로 확보해서 확보된 주소를 변수에 연결하고 다시 앞서 확보한 변수영역에 각 프로퍼티의 식별자를 저장하고, 각 데이터를 별도의 공간에 저장해서 그 주소를 식별자들과 매칭시킵니다. 이처럼 할당과정에서 기본형과 차이가 생긴 이유는 참조형 데이터가 여러개의 프로퍼티(변수)를 모은 그룹이기 때문입니다.
 * 그리고 이 차이로 인해 참조형 데이터를 '가변값'으로 여겨야만 하는 상황이 발생합니다.
 * 참조형 데이터를 가변값으로 여겨야 하는 상홤임에도 이를 불변값으로 사용하는 방법이 없지는 않습니다. 이 경우 내부 프로퍼티들을 일일이 복사하면 됩니다.(깊은 복사). 혹은 라이브러리를 사용하는 방법도 있습니다. 불변객체는 최근 자바스크립트 진영에서 가장 중요한 개념 중 하나입니다.
 * '없을'을 나타내는 값은 두가지가 있는데 undefined는 어떤 변수에 값이 존재하지 않을 경우를 의미하고 null은 사용자가 명시적으로 '없음'을 표현하기 위해 대입한 값입니다. 본래의 의미에 따라 사용자가 없음을 표현하기 위해 명시적으로 undefinde를 대입하는 것은 지양하는것이 좋겠습니다.

*/
