/*****  CURRYING  *****/
// turning this f(a,b) into f(a)(b)
// takes one argument at a time
// returns function that expects the next argument

function f(a) {
    return function (b) {
        return `${a} ${b}`;
    }
}
console.log(f(5)(6));


/*****  COMMON QUESTIONS  *****/

// 1. Why do we use currying?
// avoid passing the same variable again and again
// create higher order functions
// make functions pure, less prone to errors

// 2. Implement sum(2)(6)(1)
function sum(num1) {
    return function (num2) {
        return function (num3) {
            return num1 + num2 + num3
        }
    }
}
console.log(sum(2)(6)(1));

/* 3. Implement:
    evaluate("sum")(4)(2) => 6
    evaluate("multiply")(4)(2) => 8
    evaluate("divide")(4)(2) => 2
    evaluate("substract")(4)(2) => 2 */

function evaluate(operation) {
    return function (num1) {
        return function (num2) {
            if (operation == "sum") return num1 + num2
            else if (operation == "substract") return num1 - num2
            else if (operation == "multiply") return num1 * num2
            else if (operation == "divide") return num1 / num2
            else return "Invalid operation"
        }
    }
}

const mul = evaluate("multiply")
console.log(mul(3)(5)); // 15
console.log(mul(8)(2)); // 16

// 4. Infinite currying sum(1)(2)(3)...(n)
function add(a) {
    return function (b) {
        if (b) return add(a + b)
        return a
    }
}
console.log(add(5)(2)(8)(2)());

// 5. Currying vs Partial Application
// Partial application:
// number of params and functions is not equal
function sumNums(a) {
    return function (b, c) {
        return a + b + c
    }
}
const x = sumNums(10)
console.log(x(5,6));
// or
console.log(sumNums(10)(5,6));

// 6. Manipulating DOM
function updateElementText(id) {
    return function (content) {
        document.getElementById(id).textContent = content;
    }
}
const updateHeader = updateElementText("heading")

// 7. curry() implementation
function curry(func) {
    return function curriedFunc(...args) {
        if (args.length >= func.length) {
            return func(...args)
        } else {
            return function (...next) {
                return curriedFunc(...args, ...next)
            }
        }
    }
}

const sumBase = (a, b, c) => a + b + c
const totalSum = curry(sumBase)
console.log(totalSum(1)(2)(3));
