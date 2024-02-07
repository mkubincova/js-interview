/*****  THIS  *****/
// implicit binding - 'this' refers to object we are currently in
// works differently in node.js and browser environments
// In Node.js all modules (script files) are executed in their own closure 
// while browsers execute all script files directly within the global scope.

// 'this' points to global obj
this.a = 5;
console.log(this.a);

// 'this' points to functions parent, still the global obj (viewed in browser console)
function getParam() {
    console.log(this.a);
};
getParam();


/*****  THIS IN OBJECTS  *****/
// 'this' poits to immediate parent, e.g. user or childObj
// arrow function still points to global obj or parent normal function
let user = {
    name: "John",
    age: 25,
    childObj: {
        name: "Mace",
        getDetails() {
            console.log(this.name, this.age);
            const getAge = () => console.log(this.name);
            getAge();
        },

    },
    getDetails() {
        console.log(this.name);
    },
    getAge: () => {
        console.log(this.age);
    }
};
user.getDetails(); // John
user.getAge(); // undefined (no age property in window obj)
user.childObj.getDetails(); // Mace undefined Mace


/*****  THIS IN CLASS  *****/
class User {
    constructor(name) {
        this.name = name;
    }
    getName() {
        console.log(this.name);
    }
}
const user1 = new User('Mila');
user1.getName(); // Mila


/*****  COMMON QUESTIONS  *****/

// 1. Output?
// 'this' points to webUser
const webUser = {
    firstName: "Alan",
    getName() {
        const firstName = "Eric";
        return this.firstName;
    }
};
console.log(webUser.getName()); // Alan

// 2. Result of ref and why?
// 'this' refers to global object, and returns anonymous one
function makeUser() {
    return {
        name: "John",
        ref: this
    };
}

let userOne = makeUser();
console.log(userOne.ref.name); // undefined

// 3. Fix previous function to access name via ref
// 'this' points to parent obj, the one we are returning
function makeUser2() {
    return {
        name: "John",
        ref() {
            return this;
        }
    };
}

let userTwo = makeUser2();
console.log(userTwo.ref().name); // John

// 4. Output?
// 'this' refers to window obj, because setTimeout is using the function as a callback, not obj method
const siteUser = {
    name: "Timothy",
    logMessage() {
        console.log(this.name);
    }
};
setTimeout(siteUser.logMessage, 1000); // undefined

// fix: invoke logMessage as method of user object by wrapping it in another function
const siteUser2 = {
    name: "Timothy",
    logMessage() {
        console.log(this.name);
    }
};
setTimeout(() => siteUser2.logMessage(), 1000); // undefined

// 5. Output?
const anotherUser = {
    name: "Ani",
    greet() {
        return `Hello, ${this.name}!`;
    },
    farewell: () => {
        return `Goodbye, ${this.name}!`;
    }
};
console.log(anotherUser.greet()); // Hello, Ani!
console.log(anotherUser.farewell()); // Goodbye, undefined!

// 6. Create an object calculator
let calculator = {
    read() {
        this.a = +prompt("a = ", 0);
        this.b = +prompt("b = ", 0);
    },
    sum() {
        return this.a + this.b;
    },
    mul() {
        return this.a * this.b;
    },
};
// calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());


// callback function reference global object
global.length = 4;
function callback() {
    console.log("Callback", this.length);
}
const object = {
    lenght: 5,
    method(fn) {
        fn(); // 4
    }
};
object.method(callback);

// callback function reference its parent (arguments list), which has lenght 3
const object2 = {
    lenght: 5,
    method() { // arguments = [callback, 2, 3]
        arguments[0](); // 3
    }
};
object2.method(callback, 2, 3);

// 7. Implement calc
const calc = {
    total: 0,
    add(num) {
        this.total += num;
        return this;
    },
    multiply(num) {
        this.total *= num;
        return this;
    },
    substract(num) {
        this.total -= num;
        return this;
    }
};
const result = calc.add(10).multiply(5).substract(30).add(10);
console.log(result.total);
