/*****  FIBONACCI NUMBER  *****/
// Fibonacci series: 0,1,1,2,3,5,8,13,24,34,55,89,144...
// F(0) = 0, F(1) = 1
// F(n) = F(n-1) + F(n-2), for n > 1

// n = 3 -> 2

console.time("for");
const fibonacciNum = (index) => {
    if (index == 0 || index == 1) return index;
    const arr = [0, 1];
    for (let i = 2; i <= index; i++) {
        arr.push(arr[i - 1] + arr[i - 2]);
    }
    return arr[index];
};
console.log(fibonacciNum(50));
console.timeEnd("for");

// Recursion: feature used in creating a function that keeps calling itself 
// but with smaller input every consecutive time
console.time("rec");
const fibonacciNumRec = (index) => {
    if (index <= 1) return index;
    return fibonacciNumRec(index - 1) + fibonacciNumRec(index - 2);
};
console.log(fibonacciNumRec(50));
console.timeEnd("rec");

// fibonacciNumRec(4) => fibonacciNumRec(3) + fibonacciNumRec(2)

// Left:
// fibonacciNumRec(3) => fibonacciNumRec(2) + fibonacciNumRec(1)

// fibonacciNumRec(2) => fibonacciNumRec(1) + fibonacciNumRec(0)
// fibonacciNumRec(2) => 1 + 0 = 1

// fibonacciNumRec(3) => 1 + 1 = 2

// Right: 
// fibonacciNumRec(2) => fibonacciNumRec(1) + fibonacciNumRec(0)
// fibonacciNumRec(2) => 1 + 0 = 1

// Final:
// fibonacciNumRec(4) => 2 + 1 = 3

// Memoization:
const fibonacciNumMemo = (index, memo = {}) => {
    if (index <= 1) return index;

    // Check if result was calculated before
    if (memo[index] !== undefined) return memo[index];

    // Calculate the Fibonacci number and memoize the result
    memo[index] = fibonacciNumRec(index - 1, memo) + fibonacciNumRec(index - 2, memo);

    return memo[index];
};

console.time("memo");
console.log(fibonacciNumMemo(50));
console.timeEnd("memo");