/*****  OBJECTS  *****/
const user = {
    name: "John",
    age: 25,
    "like this video": true,
};


/*****  ACCESS PROPERTY  *****/
console.log(user.name);
console.log(user["like this video"]);


/*****  UPDATE PROPERTY  *****/
user.name = "Johny123";


/*****  ADD PROPERTY  *****/
user.id = 5;

// dynamic property (property name has to be in square brackets)
const property = "fullName";
const fullName = "John Cena";

user[property] = fullName;
console.log(user);


/*****  DELETE PROPERTY  *****/
delete user.fullName;
delete user["like this video"];

// delete keyword only works to delete properties from an object
const func = (function (a) {
    delete a;
    return a;
})(5);
console.log(func); // 5


/*****  LOOPING  *****/
for (key in user) {
    console.log(key);
    console.log(user[key]);
}


/*****  COMMON QUESTIONS  *****/

// 1. What is the output?
const obj = {
    a: "one",
    b: "two",
    a: "three",
};

console.log(obj); // { b: 'two', a: 'three' }
// last version of the key stands

// 2. Create function multiplyByTwo(obj) that multiplies all numeric values by 2
function multiplyByTwo(obj) {
    for (const key in obj) {
        if (typeof obj[key] === "number") {
            obj[key] *= 2;
        }
    }
}

let nums = {
    a: 100,
    b: 200,
    title: "My nums"
};
multiplyByTwo(nums);
console.log(nums);

// 3.  What is the output?
const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123; // a["[object Object]"] = 123
a[c] = 456; // a["[object Object]"] = 456

console.log(a[b]); // a["[object Object]"] = 456

// 4. What is JSON.stringify and JSON.parse?
// local storage, request body...
const animal = {
    name: "Rex",
    age: 2
};

const strAnimal = JSON.stringify(animal); // {"name":"Rex","age":2}
const objAnimal = JSON.parse(strAnimal); // { name: 'Rex', age: 2 }

// 5. Output
console.log([..."Lydia"]); // ["L", "y", "d", "i", "a"]

const siteUser = { name: "Lydia", age: 21 };
const siteAdmin = { admin: true, ...siteUser };
console.log(siteAdmin); // {admin: true, name: "Lydia", age: 21}

const settings = {
    username: "John",
    level: 19,
    health: 90
};
const data = JSON.stringify(settings, ["level", "health"]);
console.log(data); // {"level": 19, "health": 90}

const shape = {
    radius: 10,
    diameter() {
        return this.radius * 2;
    },
    perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter()); // 20
console.log(shape.perimeter()); // NaN - 'this' doesn't work in arrow function

// 6. What is destructuring in objects?
let webUser = {
    name: 'Ema',
    age: 24,
    fullName: {
        fName: "Ema",
        lName: "Smith"
    }
};
const age = 70;

const { age: userAge, fullName: { lName } } = webUser;
console.log(age, userAge, lName);

// 7. Output for rest parameters
function getItems(fruitlist, favoriteFruit, ...args) {
    return [...fruitlist, ...args, favoriteFruit];
}
const items = getItems(["banana", "apple"], "pear", "orange");
console.log(items); // ["banana", "apple", "orange", "pear"]

// 8. Output object referencing
// when assigning one object to another, it just creates reference to the original
let x = { greeting: "Hey!" };
let y;
y = x;
x.greeting = "Hello";
console.log(y.greeting); // Hello

// This condition will always return 'false' since JavaScript compares objects by reference, not value.
// { a: 1 } and { a: 1 } a different object at different places in memory
console.log({ a: 1 } == { a: 1 }); // false
console.log({ a: 1 } === { a: 1 }); // false

// members[0] = { name: "Lydia" }, so setting person to null has no effect on array
let person = { name: "Lydia" };
const members = [person];
// person = null;
console.log(members); // [ { name: 'Lydia' } ]

// however changin property of the reference object have effect
person.name = null;
console.log(members); // [ { name: null } ]

// 9. Output
// spread operator clones object so { ...value } doesnt affect 'const value'
// passing the object multiply(value) creates reference so 'const value' is updated
const value = { number: 10 };
const multiply = (x = { ...value }) => {
    console.log((x.number *= 2));
};
multiply(); // 20
multiply(); // 20
multiply(value); // 20
multiply(value); // 40

// 10. Output
/* 
person = { name: "John",  age: 50 }; defines a new object that has nothing to do with personObj1, so only age is updated 
new object is returned as value for personObj2
*/
function changeAgeAndReference(person) {
    person.age = 25;
    person = {
        name: "John",
        age: 50
    };
    return person;
}

const personObj1 = {
    name: "Alex",
    age: 30
};
const personObj2 = changeAgeAndReference(personObj1);

console.log(personObj1); // { name: "Alex", age: 25 }
console.log(personObj2); // { name: "John", age: 50 }

// 11. Shallow vs Deep copy
// when one obj holds reference to another obj its Shallow copy
// when one obj is cloned from another object its Deep copy:
let human = {
    name: "Rick",
    age: 80
};

const humanClone = { ...human };
const humanClone2 = Object.assign({}, human);
const humanClone3 = JSON.parse(JSON.stringify(human));

humanClone.name = "Morty";
humanClone2.name = "Mario";
humanClone3.name = "Luigi";

console.log(human, humanClone, humanClone2, humanClone3);
