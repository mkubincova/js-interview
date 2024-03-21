/*****  DECLARATION  *****/
const string = new String("Hello there!");
const string2 = "Hello there!";
const string3 = 'Hello there!';
const string4 = `
Hello there!
${string}
`;

const str = "world";
console.log`hello ${str} how are ${"you"}`; // [ 'hello ', ' how are ', '' ] world you


/*****  OPERATIONS  *****/
const myString = "May the force be with you.";

// length
console.log(myString.length); // 26

// geting character
console.log(myString[2]); // y
console.log(myString.charAt(2)); // y

// loop
// for (let i = 0; i < myString.length; i++) {
//     console.log(myString[i]);
// }

// modifying strings
myString[3] = "x";
console.log(myString); // ❌ May the force be with you.
console.log(myString.replace("force", "FORCE")); // ✅ May the FORCE be with you.
console.log(myString.replaceAll("e", "x")); // ✅ May thx forcx bx with you.

const newString = myString.concat(" And with you my friend.");
console.log(newString); // May the force be with you. And with you my friend.

const spaceString = "   Hello    world   ";
console.log(spaceString.trim()); // "Hello    world"

// searching
console.log(myString.indexOf("force")); // 8
console.log(myString.indexOf("yoda")); // -1
console.log(myString.indexOf("e")); // 6
console.log(myString.lastIndexOf("e")); // 15

console.log(myString.startsWith("May")); // true
console.log(myString.endsWith("with")); // false

// extracting substring
console.log(myString.substring(22)); // you.
console.log(myString.substring(8, 13)); // force

console.log(myString.slice(-4, -1)); // you

// converting
const toBeConverted = 1;
const toBeConvertedObj = { name: "John" };
console.log(String(toBeConverted)); // "1"
console.log(JSON.stringify(toBeConvertedObj)); // {"name":"John"}

console.log(myString.toLowerCase()); // may the force be with you.
console.log(myString.toUpperCase()); // MAY THE FORCE BE WITH YOU.

// ASCII 
console.log(myString.charCodeAt(0)); // 77
console.log(String.fromCharCode(77)); // M

// comparing
const str1 = "apple";
const str2 = "banana";
const str3 = "apple";

console.log(str1.localeCompare(str2)); // -1
console.log(str1.localeCompare(str3)); // 0
console.log(str1.includes("pp")); // true

// split & join
console.log(myString.split(" ")); // [ 'May', 'the', 'force', 'be', 'with', 'you.' ]
console.log(myString.split("e")); // [ 'May th', ' forc', ' b', ' with you.' ]

const arr = ["apple", "banana"];
console.log(arr.join(" and ")); // "apple and banana"