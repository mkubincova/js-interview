/*****  SLIDING WINDOW MAXIMUM  *****/
// given array of ints, there is a sliding window of size k moving from left to right
// you can only see the k numbers in the window
// window moves right by one position at a time

// Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]
nums = [1, 3, -1, -3, 5, 3, 6, 7];

// Brute Force Solution
const maxSlidingWindowBrute = function (nums, k) {
    const result = [];
    const n = nums.length;

    for (i = 0; i <= n - k; i++) {
        let max = nums[i];
        for (j = 1; j < k; j++) {
            if (nums[i + j] > max) {
                max = nums[j + i];
            }
        }
        result.push(max);
    }
    return result;
};
// Time Complexity - O(n*k) => O(n^2)
// Space Complexity - O(n)
console.log(maxSlidingWindowBrute([1, 3, -1, -3, 5, 3, 6, 7], 3));


// Readable solution
const maxSlidingWindowReadable = function (nums, k) {
    const result = [];
    for (let i = 0; i <= nums.length - k; i++) {
        let window = nums.slice(i, i + k);
        result.push(Math.max(...window));
    }
    return result;
};
// Time Complexity: O(n*k)
// Space Complexity: O(n*k)
console.log(maxSlidingWindowReadable(nums, 3));


// Optimized solution
const maxSlidingWindowQueue = function (nums, k) {
    const result = [];
    const deque = [];

    for (let i = 0; i < nums.length; i++) {
        // remove first element if window is full [0,1,2] 
        // 0(deque[0]) <= 3(i) - 3 => 0 < 0
        // [0,1,2] => [1,2] 
        if (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }
        // is current element(5) greater than previous(-3)?
        // then get rid of its index in deque, then repeat
        // [2(-1), 3(-3)] => [2(-1)] => []
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        deque.push(i);
        // is window full?
        // push the biggest value (index 0) to result
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    return result;
};
// Time Complexity - O(n)
// Space Complexity - O(n)
console.log(maxSlidingWindowQueue([1, 3, -1, -3, 5, 3, 6, 7], 3));