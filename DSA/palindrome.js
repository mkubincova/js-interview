/*****  PALINDROME NUMBER  *****/
// an iteger is a palindrome whe it reads the same forward and backward

// x = 121  -> true
// x = 10   -> false

const isPalindrome = (num) => {
    if (num < 0) return false;
    return num === +num.toString().split("").reverse().join("");
};

console.log(isPalindrome(545));