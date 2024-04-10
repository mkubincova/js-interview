// https://visualgo.net/en/sorting

// sort given array nums in ascending order
// [29,10,14,37,14] -> [10,14,14,29,37]
// [29,10,14,37,14,33,8,11] -> [8,10,11,14,14,29,33,37]

/*****  BUBBLE SORT  *****/
const bubbleSort = (nums) => {
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (nums[j] > nums[j + 1]) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
            }
        }
    }
    return nums;
};

// Time Complexity = best: O(n), worst: O(n^2), average: O(n^2)
// Space Complexity = O(1)
console.log(bubbleSort([29, 10, 14, 37, 14]));


/*****  SELECTION SORT  *****/
const selectionSort = (nums) => {
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (nums[j] < nums[minIndex]) minIndex = j;
        }
        if (minIndex !== i) {
            [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
        }
    }
    return nums;
};

// Time Complexity = O(n^2)
// Space Complexity = O(1)
console.log(selectionSort([29, 10, 14, 37, 14]));


/*****  INSERTION SORT  *****/
const insertionSort = (nums) => {
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        const key = nums[i];
        let j = i - 1;

        while (j >= 0 && nums[j] > key) {
            nums[j + 1] = nums[j];
            j--;
        }

        nums[j + 1] = key;
    }
    return nums;
};

// Time Complexity = O(n^2)
// Space Complexity = O(1)
console.log(insertionSort([29, 10, 14, 37, 14, 33, 8, 11]));


/*****  BUILT-IN SORT  *****/
// converts elements to strings, then sorts it from first index of each word

const fruits = ["dragon fruit", "apple", "date", "cherry", "banana"];
const numbers = [10, 5, 18, 1, 27];

console.log(fruits.sort()); // [ 'apple', 'banana', 'cherry', 'date', 'dragon fruit' ]
console.log(numbers.sort()); // [ 1, 10, 18, 27, 5 ]

const compareFunc = (a, b) => {
    // 1. (a - b) < 0 ... b is bigger -> a comes first
    // 2. (a - b) > 0 ... a is bigger -> b comes first
    // 2. (a - b) == 0 ... a equals b -> no change

    return a - b; // ascending order
    // return b - a // descending order
};
console.log(numbers.sort(compareFunc)); // [ 1, 5, 10, 18, 27 ]


const people = [
    { name: "Emil", age: 25 },
    { name: "Sara", age: 45 },
    { name: "George", age: 17 },
    { name: "Oscar", age: 30 },
];
const compareFuncObj = (a, b) => {
    return a.age - b.age;
};
console.log(people.sort(compareFuncObj));
/* [
    { name: 'George', age: 17 },
    { name: 'Emil', age: 25 },
    { name: 'Oscar', age: 30 },
    { name: 'Sara', age: 45 }
] */


/*****  MERGE SORT  *****/
// [8,3,5,4,7,6,1,2] -> [1,2,3,4,5,6,7,8]
const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;  //base case

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));

    return merge(left, right);
};

const merge = (left, right) => {
    let sortedArr = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sortedArr.push(left.shift());
        } else {
            sortedArr.push(right.shift());
        }
    }

    return [...sortedArr, ...left, ...right];
};

// Time Complexity = mergeSort: O(log n), merge: O(n) -> O(nlog n)
// Space Complexity = O(n)
console.log("Merge: ", mergeSort([8, 3, 5, 4, 7, 6, 1, 2]));


/*****  QUICK SORT  *****/
// [8,3,5,4,7,6,1,2] -> [1,2,3,4,5,6,7,8]
const quickSort = (arr) => {
    if (arr.length <= 1) return arr;

    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) left.push(arr[i]);
        else right.push(arr[i]);
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
};

// Time Complexity = best: O(nlog n), average: O(nlog n), worst: O(n^2)
// Space Complexity = best: O(log n), average: O(log n), worst: O(n)
console.log("Quick: ", quickSort([8, 3, 5, 4, 7, 6, 1, 2]));


/*****  COMMON QUESTIONS  *****/

// 1. given array of intervals, where intervals[i] = [start, end], merge all orverlaping intervals
// and return array of all non-overlaping ones

// intervals = [[1,3], [2,6], [8,10], [15,18]] -> [[1,6], [8,10], [15,18]]

const mergeIntervals = (intervals) => {
    const startIndex = 0;
    const endIndex = 1;

    // intervals.sort((a, b) => a[startIndex] - b[startIndex]);
    intervals = mergeSort2(intervals);
    console.log("sorted", intervals);

    const mergeIntervals = [];
    let mergeStart = intervals[0][startIndex];
    let mergeEnd = intervals[0][endIndex];

    for (let i = 1; i < intervals.length; i++) {
        const subsequentInterval = intervals[i];

        if (subsequentInterval[startIndex] <= mergeEnd) {
            mergeEnd = Math.max(mergeEnd, subsequentInterval[endIndex]);
        } else {
            mergeIntervals.push([mergeStart, mergeEnd]);
            mergeStart = subsequentInterval[startIndex];
            mergeEnd = subsequentInterval[endIndex];
        }
    }

    mergeIntervals.push([mergeStart, mergeEnd]);
    return mergeIntervals;
};

const mergeSort2 = (arr) => {
    if (arr.length <= 1) return arr;  //base case

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort2(arr.slice(0, mid));
    let right = mergeSort2(arr.slice(mid));

    return merge2(left, right);
};

const merge2 = (left, right) => {
    let sortedArr = [];

    while (left.length && right.length) {
        if (left[0][0] < right[0][0]) {
            sortedArr.push(left.shift());
        } else {
            sortedArr.push(right.shift());
        }
    }

    return [...sortedArr, ...left, ...right];
};

console.log(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]));

// 2. Sort in asceding order without built-in function with O(nlog n) time complexity
const quickSort2 = (arr, start = 0, end = arr.length - 1) => {
    if (start < end) {
        const pivotIndex = pivot(arr, start, end);
        quickSort2(arr, start, pivotIndex - 1);
        quickSort2(arr, pivotIndex + 1, end);
    }
    return arr;
};

const pivot = (arr, start = 0, end = arr.length - 1) => {
    function swap(array, i, j) {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let pivot = arr[start];
    let swapIdx = start;

    for (let i = start + 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            swapIdx++;
            swap(arr, swapIdx, i);
        }
    }

    swap(arr, start, swapIdx);
    return swapIdx;
};

console.log(quickSort2([8, 3, 5, 4, 7, 6, 1, 2]));