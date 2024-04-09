/*****  LINEAR SEARCH  *****/
// search "target" in nums. If target exists, return index, otherwise return -1. 
// must be O(n) time complexity

// [4,5,4,7,0,1,2], target = 0 -> 4
// [4,5,4,7,0,1,2], target = 3 -> -1

const linearSearch = (nums, target) => {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) return i;
    }
    return -1;
};

// Time comlexity: O(n)
// Space comlexity: O(1)
console.log(linearSearch([4, 5, 4, 7, 0, 1, 2], 0));
console.log(linearSearch([4, 5, 4, 7, 0, 1, 2], 3));


/***** GLOBAL LINEAR SEARCH  *****/
// find all instances

const globalLinearSearch = (nums, target) => {
    let indexes = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) indexes.push(i);
    }
    return indexes.length === 0 ? -1 : indexes;
};

// Time comlexity: O(n)
// Space comlexity: O(n)
console.log(globalLinearSearch([4, 5, 0, 4, 7, 0, 1, 2], 0));
console.log(globalLinearSearch([4, 5, 4, 7, 0, 1, 2], 3));


/*****  BINARY SEARCH  *****/
// given an array of ints which is sorted in ascendng order, find the target
// must be O(log n) time complexity

// [-1,0,3,5,9,10], target = 9 -> 4
// [-1,0,3,5,9,10], target = 2 -> -1

const binarySearch = (nums, target) => {
    let start = 0;
    let end = nums.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);

        if (nums[middle] === target) {
            return middle;
        } else if (nums[middle] < target) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }
    return -1;
};

// Time comlexity: O(log n)
// Space comlexity: O(1)
console.log(binarySearch([-1, 0, 3, 5, 9, 10], 9));
console.log(binarySearch([-1, 0, 3, 5, 9, 10], 2));


/***** COMMON QUESTIONS  *****/

// 1. Kth missing poisitive number
// given arr of positive ints sorted in increasing order and another itn (k),
// return kth positive int that is missing from array

// [2,3,4,7,11], k=5 -> 9
// missing numbers: [1,5,6,8,9,10,12,13...], the 5th missing number is 9

const findKthPositive = (arr, k) => {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= k + count) count++;
    }
    return k + count;
};

// count = all positive numbers found until this poit
// k = index among missing ones
// k + count = total number of positive integers (including the missing ones) up to index i

// 2. Maximum count of positive integer and negative integer
// given arr of nums sorted in non-decreasing order, return the maximum between 
// the number of poisitve ints and the number of negative ints

// [-2,-1,-1,1,2,3] -> 3
// there are 3 positives and 3 negatives, the max among them is 3

const maximumCount = (nums) => {
    return Math.max(upperBound(nums), lowerBound(nums));
};

const upperBound = (nums) => {
    let low = 0;
    let high = nums.length - 1;

    while (low < high) {
        let mid = Math.ceil((low + high) / 2);

        if (nums[mid] < 0) low = mid;
        else high = mid - 1;
    }
    return nums[0] >= 0 ? 0 : low + 1;
};

const lowerBound = (nums) => {
    let low = 0;
    let high = nums.length - 1;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);

        if (nums[mid] > 0) high = mid;
        else low = mid + 1;
    }
    return nums[nums.length - 1] <= 0 ? 0 : nums.length - low;
};

console.log(maximumCount([-2, -1, -1, 1, 2, 3]));
console.log(maximumCount([-3, -2, -1, 0, 0, 1, 2]));
console.log(maximumCount([5, 20, 66, 1314]));