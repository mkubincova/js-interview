/*****  DECLARATION  *****/
let arr = new Array();
let arr2 = [];
let arr3 = ['apple', 'banana', 'cherry'];


/*****  ADD & REMOVE  *****/
arr3.push('orange'); // add element to the end ['apple', 'banana', 'cherry', 'orange']
arr3.pop(); // remove last element ['apple', 'banana', 'cherry']

arr3.unshift('orange'); // add element to start ['orange', 'apple', 'banana', 'cherry']
arr3.shift(); // remove first element ['apple', 'banana', 'cherry']


/*****  LOOPS  *****/
for (let i = 0; i < arr3.length; i++) {
    console.log(arr3[i]);
}

let i = 0;
while (i < arr3.length) {
    console.log(arr3[i]);
    i++;
}

const numbers = [1, 2, 3, 4, 5];

//map
const mapNumbers = numbers.map((item, index, array) => {
    return item + 5;
});
console.log(mapNumbers); // [ 6, 7, 8, 9, 10 ]

// filter
const filterNumbers = numbers.filter((item, inxed, array) => {
    return item > 3;
});
console.log(filterNumbers); // [ 4, 5 ]

// reduce
const reduceNumbers = numbers.reduce((prevValue, item, inxed, array) => {
    return prevValue + item;
}, 2);
console.log(reduceNumbers); // 17

// some
const someNumbers = numbers.some((item, inxed, array) => {
    return item > 3; // at least one item in arr satifies the condition
}, 2);
console.log(someNumbers); // true

// every
const everyNumbers = numbers.every((item, inxed, array) => {
    return item > 3; // all items in arr satify the condition
}, 2);
console.log(everyNumbers); // false

// find
const findNumbers = numbers.find((item, inxed, array) => {
    return item > 3; // finds and returns first element that satifies the condition, or undefined
}, 2);
console.log(findNumbers); // 4

// findIndex
console.log(numbers.findIndex((item) => item === 5)); // 4
console.log(numbers.findIndex((item) => item === 100)); // -1


/*****  SPREAD & REST OPERATORS  *****/
const nums = [1, 2, 3];
const nums2 = [4, 5, 6];
const finalNums = [...nums, ...nums2]; // spread
console.log(finalNums);

function sum(...numbers) { // rest
    return numbers;
}
console.log(sum(nums, nums2)); // [ [ 1, 2, 3 ], [ 4, 5, 6 ] ]


/*****  METHODS  *****/

// concat
console.log(nums.concat(nums2)); // [ 1, 2, 3, 4, 5, 6 ]

// slice (start incuded, end excluded)
console.log(nums.slice(0, 2)); // [ 1, 2 ]

// splice (remove 2 elements from index 1 and replace them with orange)
nums.splice(1, 2, "orange");
console.log(nums); // [1, 2, 3] -> [ 1, 'orange' ]

// fill (replace all elements, or portion of them with value)
const dummy = [2, 5, 1, 6];
dummy.fill(0, 1, 2);
console.log(dummy); // [ 2, 0, 1, 6 ]

// flat (takes depth)
const numsNested = [1, [2, 3], [[4, 5], 6]];
console.log(numsNested.flat(2)); // [ 1, 2, 3, 4, 5, 6 ]

// reverse
dummy.reverse();
console.log(dummy); // [ 2, 0, 1, 6 ] -> [ 6, 1, 0, 2 ]

// sort
const unsorted = [5, 2, 7, 10];
unsorted.sort((a, b) => a - b);
console.log(unsorted); // [ 2, 5, 7, 10 ] - ascending
unsorted.sort((a, b) => b - a);
console.log(unsorted); // [ 10, 7, 5, 2 ] - descending