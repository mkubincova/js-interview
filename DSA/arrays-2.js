/*****  COMMON QUESTIONS  *****/

// 1. Second largest number
// [12,35,1,10,34,1] -> 34
// [10,5,10] -> 5

// Time complexity: O(nlogn)
function secondLargest(arr) {
    // uniq = [...new Set(arr)];
    uniq = Array.from(new Set(arr)); // O(n)
    if (uniq.length > 1) {
        uniq.sort((a, b) => b - a); // O(nlogn)
        return uniq[1];
    }
    return uniq[0];

}
console.log(secondLargest([12, 35, 1, 10, 34, 1]));
console.log(secondLargest([10, 5, 10]));
console.log(secondLargest([10, 10]));

// Time complexity: O(n), Space complexity: O(1)
function secondLargestOptimized(arr) {
    let largest = Number.NEGATIVE_INFINITY;
    let secondLargest = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < arr.length; i++) { // O(n)
        if (arr[i] > largest) {
            secondLargest = largest;
            largest = arr[i];
        } else if (arr[i] != largest && arr[i] > secondLargest) {
            secondLargest = arr[i];
        }
    }
    return secondLargest;
}
console.log(secondLargestOptimized([12, 35, 1, 10, 34, 1, 35]));
console.log(secondLargestOptimized([10, 5, 10]));
console.log(secondLargestOptimized([10, 10]));

// 2. Rotate array to right by k steps
// [1,2,3,4,5,6,7], k=3 -> [5,6,7,1,2,3,4]
// [-1, -100, 3, 99], k=2 -> [3,99,-1,-100]

// Time complexity: O(n)
function rotateArr(arr, k) {
    k = k % arr.length;
    arr.unshift(...arr.splice(arr.length - k, arr.length)); // O(n) + O(n)
    return arr;
}
console.log(rotateArr([1, 2, 3, 4, 5, 6, 7], 3)); // [5,6,7,1,2,3,4]
console.log(rotateArr([-1, -100, 3, 99], 2)); // [3,99,-1,-100]


// Time complexity: ?
function rotateArrOptimized(arr, k) {
    k = k % arr.length;
    for (let i = 0; i < k; i++) {
        arr.unshift(arr.pop());
    }
    return arr;
}
console.log(rotateArrOptimized([1, 2, 3, 4, 5, 6, 7], 3)); // [5,6,7,1,2,3,4]
console.log(rotateArrOptimized([-1, -100, 3, 99], 2)); // [3,99,-1,-100]


// Time complexity: O(n), Space complexity: O(1)
function reverse(arr, start, end) {
    while (start < end) {
        const temp = arr[start];
        arr[start++] = arr[end];
        arr[end--] = temp;
    }
}
function rotateArrOptimized2(arr, k) {
    k = k % arr.length;
    reverse(arr, 0, arr.length - 1);
    reverse(arr, 0, k - 1);
    reverse(arr, k, arr.length - 1);
    return arr;
}
console.log(rotateArrOptimized2([1, 2, 3, 4, 5, 6, 7], 3)); // [5,6,7,1,2,3,4]
console.log(rotateArrOptimized2([-1, -100, 3, 99], 2)); // [3,99,-1,-100]

// 3. remove duplicates from sorted array, in-palce, return number of unique elements
// [1,1,2] -> [1,2,_]
// [0,0,1,1,2,2,3,3,4] -> [0,2,3,4,_,_,_,_]

// Time complexity: O(n), Space complexity: O(1)
function removeDuplicates(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] == arr[i + 1]) {
            arr.splice(i + 1, 1);
            i--;
        }
    }
    return arr.length;
}
console.log(removeDuplicates([1, 1, 2]));
console.log(removeDuplicates([0, 0, 0, 1, 1, 2, 2, 3, 3, 4]));

// Time complexity: O(n), Space complexity: O(1)
function removeDuplicatesOptimized(arr) {
    if (arr.length === 0) return 0;
    // [0,0,1,1,2,2,3,3,4]
    let i = 0;
    for (let j = 1; j < arr.length; j++) {
        if (arr[i] !== arr[j]) {
            i++;
            arr[i] = arr[j];
        }
    }
    return i + 1;
}
console.log(removeDuplicatesOptimized([1, 1, 2]));
console.log(removeDuplicatesOptimized([0, 0, 0, 1, 1, 2, 2, 3, 3, 4]));