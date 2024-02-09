/*****  CALL  *****/
// call a method as if it belonged to the object
// 'this' will refer to obj, not global object
var obj = { name: "John" };

function sayHello(age, profession) {
    return `Hello ${this.name}, who is ${age} years old and is a ${profession}.`;
}

console.log(sayHello.call(obj, 24, "Cook"));


/*****  CALL POLYFILL  *****/
let car1 = {
    color: "Red",
    company: "Ferrari"
};
function buyCar(currency, price) {
    console.log(`I bought ${this.color} - ${this.company} for ${currency}${price}`);
}
//buyCar.call(car1, "$", 20000)

Function.prototype.myCall = function (context = {}, ...args) {
    if (typeof this !== 'function') throw new TypeError(this + " is not callable");
    context.func = this;
    context.func(...args);
};
buyCar.myCall(car1, "$", 20000);


/*****  APPLY  *****/
// same as call, but takes argumets in form of array
console.log(sayHello.apply(obj, [24, "Cook"]));


/*****  APPLY POLYFILL  *****/
//buyCar.apply(car1, ["$", 20000])
Function.prototype.myApply = function (context = {}, args = []) {
    if (typeof this !== 'function') throw new TypeError(this + " is not callable");
    if (!Array.isArray(args)) throw new TypeError(args + " is not an array");
    context.func = this;
    context.func(...args);
};
buyCar.myApply(car1, ["$", 50000]);


/*****  BIND  *****/
// same, but reusable
const bindFunc = sayHello.bind(obj);
console.log(bindFunc(24, "Cook"));


/*****  BIND POLYFILL  *****/
//const bindFuncCar = buyCar.bind(car1)
Function.prototype.myBind = function (context = {}, ...args) {
    if (typeof this !== 'function') throw new TypeError(this + " is not callable");
    context.func = this;
    return (...newArgs) => { context.func(...args, ...newArgs); };
};
const bindFuncCar = buyCar.myBind(car1);
bindFuncCar("$", 999);


/*****  COMMON QUESTIONS  *****/

// 1. Output?
const person = { name: "Ema" };

function sayHi(age) {
    return `${this.name} is ${age}`;
}
console.log(sayHi.call(person, 24)); // Ema is 24
console.log(sayHi.bind(person, 24)); // the sayHi function (not yet called)

// 2. Call with function inside object
const age = 10;
var human = {
    name: "Anna",
    age: 20,
    getAge: function () {
        return this.age;
    }
};
var human2 = { age: 24 };

console.log(human.getAge.call(human2)); // 24

// 3. setTimeout
// 'this' doesn't point to function but its context
// the context of setTimeout is global/window
var status = "done";

setTimeout(() => {
    const status = "loading";

    const data = {
        status: "error",
        getStatus() {
            return this.status;
        }
    };
    console.log(data.getStatus()); // error
    console.log(data.getStatus.call(this)); // done browser, undefined node
}, 0);

// 4. Call printAnimals so it prints all animals in object
const animals = [
    { species: "Lion", name: "King" },
    { species: "Whale", name: "Queen" },
];

function printAnimals(i) {
    this.print = function () {
        console.log(`#${i} ${this.species}: ${this.name}`);
    };
    this.print();
}

for (let i = 0; i < animals.length; i++) {
    printAnimals.call(animals[i], i);
}

// 5. Append array to another array
const array = ["a", "b"];
const elements = [0, 1, 2];
const elements2 = [3, 4, 5];
const elements3 = [6, 7, 8];

array.push(...elements);
array.push.apply(array, elements2);
array.push.call(array, ...elements3);

console.log(array);

// 6. Enhance built-in function with apply
// find min/max number in array
const numbers = [5, 6, 2, 3, 7];

console.log(Math.max(...numbers));
console.log(Math.max.apply(null, numbers));
console.log(Math.min(...numbers));
console.log(Math.min.apply(null, numbers));

// 7. Bound functions
function f() {
    console.log(this);
}
let user = {
    g: f.bind(null)
};
user.g(); // global/window

// 8. Bind chaining doesn't exist
// once function is bound to particular object, it will always stay that way
function fun() {
    console.log(this.name);
}
fun = fun.bind({ name: "John" }).bind({ name: "Ann" });
fun(); // John

// 9. Fix line 22 to make code work properly
function chekcPassword(success, failed) {
    let password = prompt("Password?", "");
    if (password == "admin123") success();
    else failed();
}
let siteUser = {
    name: "John Smith",
    loginSuccessful() {
        console.log(`${this.name} logged in`);
    },
    loginFailed() {
        console.log(`${this.name} failed to log in`);
    }
};
// 22 original: chekcPassword(siteUser.loginSuccessful, siteUser.loginFailed);
// 22 corrected: chekcPassword(siteUser.loginSuccessful.bind(siteUser), siteUser.loginFailed.bind(siteUser));

// 10. Partial application for login function
let siteUser2 = {
    name: "John Doe",
    login(result) {
        console.log(this.name + (result ? " login successful" : " login failed"));
    }
};
// chekcPassword(siteUser2.login.bind(siteUser2, true), siteUser2.login.bind(siteUser2, false));

// 11. Explicit binding with arrow function
// arrow function 'this' refers to context of parent function, in this case nothing
const creatureAge = 10;

var creature = {
    name: "Sticht",
    creatureAge: 8,
    getAgeArrow: () => console.log(this.creatureAge),
    getAge: function () {
        console.log(this.creatureAge);
    }
};

var creature2 = { creatureAge: 24 };
creature.getAge.call(creature2); // 24
creature.getAgeArrow.call(creature2); // undefined