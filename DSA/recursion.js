/*****  RECURSION  *****/
// function that keeps calling itself until it reaches the base case

function goToLunch(person) {
    if (person === 5) return true;
    console.log(person);
    return goToLunch(++person);
}
// console.log("outcome:", goToLunch(1));


/*****  FOR LOOP TO RECURSIVE FUNCTION *****/
let nums = [1, 2, 3, 4];

function multiply(arr) {
    let product = 1;
    for (let i = 0; i < arr.length; i++) {
        product *= arr[i];
    }
    return product;
}
console.log(multiply(nums));


function multiplyRec(arr) {
    if (arr.length <= 0) return 1;
    return arr[arr.length - 1] * multiply(arr.slice(0, arr.length - 1));
}
console.log(multiplyRec(nums));


/*****  COMMON QUESTIONS  *****/

// 1. Factorial of n
// n = 5 -> 5*4*3*2*1 = 120
function factorial(n) {
    if (n <= 0) return 1;
    return n * factorial(--n);
}
console.log(factorial(5));

// 2. create array with range of numbers
// 1,5 -> [1,2,3,4,5]
function rangeOfNums(start, end) {
    if (end < start) return [];
    const numbers = rangeOfNums(start, end - 1);
    numbers.push(end);
    return numbers;
}
console.log(rangeOfNums(1, 5));

// 3. Palindrome (reads same from both sides)
// x = 121  -> true
// x = 15   -> false
function isPalindrome(num) {
    let str = num.toString();
    if (str.length < 2) return true;
    if (str[0] != str[str.length - 1]) return false;
    return isPalindrome(str.slice(1, -1));
}
console.log(isPalindrome(121));
console.log(isPalindrome(545));

// 4. Fibonnaci sequence
// 0,1,1,2,3,5,8,13,24,34,55,89,144...
function fibonacciNumRec(index) {
    if (index <= 1) return index;
    return fibonacciNumRec(index - 1) + fibonacciNumRec(index - 2);
};
console.log(fibonacciNumRec(7));

// 5. Reverse string
// "hello" -> "olleh"
function reverseString(str) {
    if (!str) return "";
    return reverseString(str.substr(1)) + str.charAt(0);
}
console.log(reverseString("hello"));

// 6. Subsets (backtracking algorithm using recursion)
// given int array of unique elements, return all possible subsets without duplicates
// [1,2,3] -> [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
// [0] -> [[], [0]]
function createSubset(nums) {
    let temp = [];
    let result = [];

    function recursive(nums, i) {
        if (i === nums.length) return result.push([...temp]);
        temp.push(nums[i]);
        recursive(nums, i + 1);
        temp.pop();
        recursive(nums, i + 1);
    }
    recursive(nums, 0);
    return result;
}
console.log(createSubset([1, 2, 3]));
