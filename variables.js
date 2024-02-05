/*****  DECLARATION (in the same scope)  ******/
function initialize() {
    var a;
    var a; // ok

    let b;
    /*
    let b; // error: variable has been declared

    const c; // error: variable needs to be initialized
    const c; // error: variable has been declared
    */
}
// initialize();

function reInitialize() {
    var a = 5;
    a = 6; // ok

    let b = 5;
    b = 6; // ok

    const c = 5;
    c = 6; // error: variable has been declared
}
// reInitialize();


/*****  SCOPE  *****/
// var is functional scoped - available in the whole script
function functionalScope() {
    var a = 5;
    {
        var b = 6;
    }
    console.log(a); // 5
    console.log(b); // 6
}

// const, let are block scoped - only available in the block they were declared in
function blockScope() {
    {
        let c = 7;
        const d = 8;
        console.log(c); // 7
        console.log(d); // 8
    }
    console.log(c); // undefined
    console.log(d); // undefined
}

/*****  SHADOWING  *****/
// variable shadowing - overwrite value inside more specific block
function shadowing() {
    let a = "Hello";
    // let b = "Bye";
    var c = "Ciao";

    if (true) {
        let a = "Hi"; // ok
        var b = "Goodbye"; // illegal shadowing, throws error
        let c = "Bonjour"; // ok
        console.log(a); // Hi
    }

    console.log(a); // Hello
}
// shadowing();


/*****  HOISTING  *****/
// during creation phase js moves variables and functions to top of code

// Example code:
let a = 10;
function multiply(x) {
    return x * 10;
}
let b = multiply(a);
// console.log(b)

/* 
Creation phase: 
1. creates global window object
    {

    }
2. set up memory head to store functions and references
    {
        a
        multiply()
        b
    }
3. initialize variables and functions as undefined
    {
        a = undefined
        multiply(x){ return x * 10; }
        b = undefined
    }

Execution phase:
1. assigns variables and executes functions line-by-line
    {
        a = 10
        b = 100
        100
    }
*/

/*****  TEMPORAL DEAD ZONE  *****/
// time between declaration and initialization of let and const variables
// time when variables are in the scope but not yet declared
console.log(one); // undefined
var one = 1;

console.log(two); // error: cannot access 'two' before initialization
let two = 1;