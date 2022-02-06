/**
 * this
 * 1. 전역공간에서의 this
 * 2. 
 */

//1. 전역 공간에서의 this
//console.log(this);
/*
var func = function(x){
    console.log(this, x);
};
func(1);

var obj = {
method: func
};
obj.method(2);



var obj = {
	method: function(x) {console.log(this, x); }
};
obj.method(1); 
obj['method'](2);



var obj = {
	methodA: function() {console.log(this); },
	inner: {
		methodB: function() {console.log(this);}
    }
};
obj.methodA();
obj['methodA']();

obj.inner.methodB();
obj.inner['methodB']();
obj['inner'].methodB();
obj['inner']['methodB']();

var obj1 = {
	outer: function() {
		console.log(this);
		var innerFunc = function() {
			console.log(this);
		}
		innerFunc();

		var obj2 = {
			innerMethod: innerFunc
		};
		obj2.innerMethod();
	}
};
obj1.outer();




var obj = {
	outer : function() {
		console.log(this);
		var innerFunc1 = function() {
			console.log(this);
		};
		innerFunc1();

		var self = this;
		var innerFunc2 = function () {
			console.log(self);
		};
		innerFunc2();
	}
};
obj.outer();

setTimeout(function() { console.log(this); }, 300);

[1, 2, 3, 4, 5].forEach(function (x) {
	console.log(this, x);
});

document.body.innerHTML += '<button id="a">클릭</button>';
document.body.querySelector('#a')
	.addEventListener('click', function(e) {
		console.log(this, e);
});



function a () {
	var argv = Array.protorype.slice.call(arguments);
	argv.forEach(function (arg) {
		console.log(arg);
	});
}
a(1,2,3);

document.body.innerHTML = '<div>a</div><div>b</div><div>c</div>';
var nodeList = document.querySelectorAll('div');
var nodeArr = Array.prototype.slice.call(nodeList);
nodeArr.forEach(function (node) {
	console.log(node);
});



var callback = function() {
	console.dir(this);  //window
};
var obj = {
	a: 1,
	b: function(cb) {
		cb();
	}
};
obj.b(callback);

*/

//call, apply, bind 메소드

const obj = {name: 'yeun'};
const introduce = function(age){
    console.log(`My name is ${this.name}. I'm ${age} years old.`);
};` `
introduce(28); //My name is undefined. I'm 28 years old.
introduce.call(obj, 23); //My name is yeun. I'm 23 years old.
introduce.apply(obj, [23]); //My name is yeun. I'm 23 years old.