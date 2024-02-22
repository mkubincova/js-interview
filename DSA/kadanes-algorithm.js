/*****  MAXIMUM SUM SUBARRAY  *****/
// given an integer array of nums, find the subarray with the largest sum,
// and return the sum

// [-2,1,-3,4,-1,2,1,-5,4]  ->   6: [4,-1,2,1]
// [5,4,-1,7,8]             ->  23: [5,4,-1,7,8]

// Time complexity: O(n^2), Space complexity: O(1)
function maxSubArray(nums) {
    let maxSum = nums[0];
    let startIndex = 0;
    let endIndex = 0;

    for (let i = 0; i < nums.length; i++) {
        let currentSum = 0;
        for (let j = i; j < nums.length; j++) {
            currentSum += nums[j];
            if (currentSum > maxSum) {
                maxSum = currentSum;
                startIndex = i;
                endIndex = j;
            }
        }
    }

    return { sum: maxSum, subArray: nums.slice(startIndex, endIndex + 1) };
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(maxSubArray([5, 4, -1, 7, 8]));
console.log(maxSubArray([-5, -4, -1, -7, -8]));


// Time complexity: O(n), Space complexity: O(1)
function kadanesAlgorithm(nums) {
    let maxSum = nums[0];
    let sum = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (sum > maxSum) maxSum = sum;
        if (sum < 0) sum = 0;
    }
    return maxSum;
}
console.log(kadanesAlgorithm([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(kadanesAlgorithm([5, 4, -1, 7, 8]));
console.log(kadanesAlgorithm([-5, -4, -1, -7, -8]));