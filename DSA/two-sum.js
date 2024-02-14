/*****  TWO SUM  *****/
// given array of ints and int target,
// return indexes of two numbers from array that add up to target

// [2,7,11,15], target = 9 -> [0,1]

// Brute force:
console.time("brute");

const twoSumBrute = (arr, target) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) return [i, j];
        }
    }
};
console.log(twoSumBrute([8, 11, 15, 2, 7], 9));

console.timeEnd("brute");


// Objects:
console.time("obj");

const twoSumObj = (arr, target) => {
    var obj = {};
    for (let i = 0; i < arr.length; i++) {
        var n = arr[i];
        if (obj[target - n] >= 0) {
            return [obj[target - n], i];
        } else {
            obj[n] = i;
        }
    }
};
console.log(twoSumObj([8, 11, 15, 2, 7], 9));

console.timeEnd("obj");