/*****  FUNCTION DECLARATION  *****/
function square(num) {
    return num * num;
}


/*****  FUNCTION EXPRESSION  *****/
// anonymous function, can be assigned to varialbe or passes as callback
const square2 = function (num) {
    return num * num;
};


/*****  FIRST CLASS FUNCTIONS  *****/
// functions that can be used like a variable, passed as an argument to a function 
// or returned as a result from a function
function square3(num) {
    return num * num;
}
function displaySquare(fn) {
    console.log("Square is " + fn(5));
}


/*****  IIFE - Immediatelly invoked function expression  *****/
(function square4(num) {
    console.log(num * num);
})(5);

(function (x) {
    return (function (y) {
        console.log(x); // 1
    })(2);
})(1);
// x = 1
// y = 2


/*****  SCOPE  *****/
var num1 = 20, num2 = 3, userName = "Roadside Coder";

function multiply() {
    return num1 * num2;
}
console.log(multiply()); // 60


function getScore() {
    var num1 = 2, num2 = 3;

    function add() {
        return `${userName} scored ${num1 + num2}`;
    }

    return add();
}
console.log(getScore()); // Roadside Coder scored 5


// let has block scope
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, i * 1000);
} // 0 1 2 3 4 

// var has function scope (i.e. there is only one "i" for the whole function)
// the for loop runs changing the i to 0,1,2,3,4 and 5
// then the setTimeout all run with the same value for "i", which is 5
// instead of each iteration using the value scoped to block
for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, i * 1000);
} // 5 5 5 5 5



/*****  HOISTING  *****/
// functions are hoisted completely in the Creation phase

funcName(); // ok
function funcName() {
    console.log(x); // undefined
    var x = 5;

    console.log("Roadside Coder");
}
funcName(); // also ok


// Creation phase: 
// 1. Global x = undefined
// 2. Local x = undefined

// Execution phase:
// 3. Global x = 21 
// 4. Local x is still undefined, so console.log(x) prints undefined
// 5. Local x = 20

var x = 21;
var fun = function () {
    console.log(x); // undefined
    var x = 20;
};
fun();


/*****  PARAMS vs ARGUMENTS  *****/
function printName(name) { // parameters
    console.log(name);
}
printName("John"); // arguments


/*****  SPREAD vs REST OPERATORS  *****/
function multiply(...nums) { // rest operator
    console.log(nums[0] * nums[1]);
}
var arr = [5, 6];
multiply(...arr); // multipy(5, 6) - spread operator

// rest/spred operator must be last
const fn = (a, x, y, ...numbers) => {
    console.log(x, y);
    console.log(numbers);
};
fn(5, 6, 3, 7, 9, 15);


/*****  CALLBACK FUNTIONS  *****/
// function passed to another function as an argument
document.addEventListener("click", function (params) {
    console.log("Clicked!");
});


/*****  ARROW FUNTIONS  *****/
// different syntax, implicit return keyword
const add = (num1, num2) => num1 + num2;

// arrow functions don't have arguments keyword
function args() {
    console.log(arguments); //[Arguments] { '0': 1, '1': 2, '2': 3, '3': 4, '4': 6 }
}
args(1, 2, 3, 4, 6);

const argsArr = () => {
    console.log(arguments); //arguments not defined
};
argsArr(1, 2, 3, 4, 6);

// this keyword doesn't work in arrow functions
let user = {
    username: "Penny",
    fn1: () => {
        console.log(this.username);
    },
    fn2() {
        console.log(this.username);
    },
};
user.fn1(); // undefined (pointing to global object)
user.fn2(); // Penny
