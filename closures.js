/*****  CLOSURE  *****/
// a function that references variables from the outer scope
// in its inner scope (e.g. function local() can print userName)
// in Javascript funcion binds itself to its environemt (lexical scope)

// global scope
var userName = "John";

function local() {
    // local scope
    console.log(userName);
}
local();


/*****  CLOSURE SCOPE CHAIN  *****/
var id = "#25"
function makeFunc() {
    var user = "Gina"
    function displayName(age) {
        console.log(id, user, age);
    }
    return displayName
}
makeFunc()(47) // #25 Gina 47


/*****  COMMON QUESTIONS  *****/

// 1. What will be logged to console?
let count = 0;
(function printCount() {
    if (count === 0) {
        let count = 1;
        console.log(count);
    }
    console.log(count);
})();
// 1 0

// 2. Write function that does this:
var addSix = createBase(6)
addSix(10) // 16
addSix(21) // 27

function createBase(num1) { // num1 = 6
    return function(num2) { // num2 = 10, 21
        console.log(num1 + num2);
    }
}

// 3. Time optimization
// new array is generated on every call
function find1(index) {
    let a = []
    for (let i = 0; i < 1000000; i++) {
        a[i] = i * i
    }
    console.log(a[index]);
}

// creates closure with generated array
// closure(50) only calls inner function to get index
function find2() {
    let a = []
    for (let i = 0; i < 1000000; i++) {
        a[i] = i * i
    }
    return function (index) {
        console.log(a[index]);
    } 
}
const closure = find2()

console.time("normal")
find1(50) // 110.989ms
console.timeEnd("normal")

console.time("closure")
closure(50) // 1.365ms
console.timeEnd("closure")

// 4. Block scope and setTimeout
// 4.1 What will it print?
for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
        console.log(i); // 3 3 3
    }, 1000)
}
// 4.2 Make it print 0 1 2 with var
for (var i = 0; i < 3; i++) {
    function inner(i) {
        // i becomes local variable of inner function
        setTimeout(function log() {
            console.log(i); // 0 1 2
        }, 1000)
    }
    inner(i)
}

// 5. Use closure to create private counter
function counter() {
    var _counter = 0;

    function add(increment) {
        _counter += increment
    }
    function retrieve() {
        return "Counter = " + _counter
    }
    return {
        add, retrieve
    }
}

const c = counter()
c.add(5)
c.add(10)
console.log(c.retrieve());

// 6. What is a module pattern
var Module = (function () {
    function privateMethod() {
        console.log("private");
    }
    return {
        publicMethod: function () {
            console.log("public");
        }
    }
})()

Module.publicMethod()
// Module.privateMethod() // error

// 7. Make this run only once
let view;
function likeTheVideo() {
    let called = 0
   
    return function () {
        if (called > 0) {
            console.log('Already subscribed to', view);
        } else {
            view = "John"
            console.log("Subscribe to", view);
            called++
        }
    }
}

let isSubscribed = likeTheVideo()
isSubscribed()
isSubscribed()
isSubscribed()
isSubscribed()

// 8. Once polyfill
function once(func, context) {
    let ran;
    return function() {
        if (func) {
            ran = func.apply(context || this, arguments)
            func = null
        }
        return ran
    }
}

const hello = once((name) => console.log("hello", name));
hello("Ana") // hello Ana
hello("John") // doesnt print
hello("Emily") // doesnt print

// 9. Memoize/Cache polyfill
function myMemoize(func, context) {
    const res = {}
    return function (...args) {
        var argsCache = JSON.stringify(args)
        if (!res[argsCache]) {
            res[argsCache] = func.call(context || this, ...args)
        }
        return res[argsCache]
    }
}

const clumsySum = (num1, num2) => {
    for (let i = 0; i < 100000000; i++) {}
    return num1 + num2
}

const memoizedClumsySum = myMemoize(clumsySum)

console.time("First call")
console.log(clumsySum(45, 3432)); // 287.358ms
console.timeEnd("First call")

console.time("Second call")
console.log(clumsySum(45, 3432)); // 292.251ms
console.timeEnd("Second call")

console.time("First call memoized")
console.log(memoizedClumsySum(45, 3432)); // 132.419ms
console.timeEnd("First call memoized")

console.time("Second call memoized")
console.log(memoizedClumsySum(45, 3432)); // 0.79ms
console.timeEnd("Second call memoized")

// 10. Difference between Closure and Scope
// Closure - function inside another function, (local, global, outer)
// Scope - defines what variables do you have access to, (local, global)