/*****  BIG O NOTATION  *****/
// a tool used to describe the time and space complexity of algorithms
// time complexity (T): amount of operations
// space complexity (S): amount of memory

// Primitive types
// boolean, number, undefined, null => Constant space complexity
// string, array, object => Dynamic space complexity




/*****  O(1) *****/
// the same with each call, regardless of input(n)


// T:
// fixed 3 operations
function someOperations(n) {
    return (n * (n + 5)) / 2;
}
console.log(someOperations(5));


// S:
// 1 number in memory (let sum), regardless of input size
function funnyNum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
console.log(funnyNum([5, 4, 1, 3, 2]));




/*****  O(n) *****/
// increasing in a constant way depending on input(n)


// T:
// 2n + 3 operations
function goingUpDown(n) {
    console.log("Going forward");
    for (let i = 0; i < n; i++) {
        console.log(i);
    }
    console.log("At the end, going back");
    for (let j = n - 1; j >= 0; j--) {
        console.log(j);
    }
    console.log("At the start");
}
goingUpDown(3);


// S:
// n elements in output; 3 -> [ 0, 69, 138 ]
function funnyArray(n) {
    const array = [];
    for (let i = 0; i < n; i++) {
        array.push(i * 69);
    }
    return array;
}
console.log(funnyArray(3));




/*****  O(n²) *****/
// exponential operation n * n (n^2)


// T:
// 2 -> 4 operations, 3 -> 9 operations...
function printBoth(n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            console.log(i, j);
        }
    }
}
printBoth(2);


// S:
// 2 -> 4 elements in output, 3 -> 9 elements...
function createMatrix(n) {
    let matrix = [];
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = i + j;
        }
    }
    return matrix;
}
console.log(createMatrix(3)); // [ [ 0, 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ] ] 



