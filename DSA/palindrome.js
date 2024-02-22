/*****  PALINDROME NUMBER  *****/
// an iteger is a palindrome whe it reads the same forward and backward

// x = 121  -> true
// x = 10   -> false

const isPalindrome = (num) => {
    if (num < 0) return false;
    return num === +num.toString().split("").reverse().join("");
};

console.log(isPalindrome(545));


function isPalindromeRecursive(num) {
    let str = num.toString();
    if (str.length < 2) return true;
    if (str[0] != str[str.length - 1]) return false;;
    return isPalindromeRecursive(str.slice(1, -1));
}

console.log(isPalindromeRecursive(545));