/*****  COMMON QUESTIONS  *****/

// 1. Truncate text
// Input: str = Fear is the mind killer., maxLenght = 7
// Output: "Fear is..." 

function truncate(str, maxLength) {
    return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
}
console.log(truncate("Fear is the mind killer.", 9)); // Fear is t...
console.log(truncate("Fear", 9)); // Fear


// 2. Hamming Distance 
// Input: x = "hello", y = "hwllr"
// Output: 2 
// (hello)
// (hwllr)
//   ↑  ↑

function hammingDistance(str1, str2) {
    if (str1.length !== str2.length) throw new Error("Strings must have equal length!");
    let distance = 0;
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] !== str2[i]) distance++;
    }
    return distance;
}
console.log(hammingDistance("hello", "hwllr"));
// console.log(hammingDistance("hello", "hi"));


function hammingDistanceBinary(int1, int2) {
    str1 = int1.toString(2);
    str2 = int2.toString(2);

    if (str1.length < str2.length) {
        while (str1.length !== str2.length) str1 = "0" + str1;
    } else {
        while (str1.length !== str2.length) str2 = "0" + str2;
    }

    let distance = 0;
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] !== str2[i]) distance++;
    }
    return distance;
}
console.log(hammingDistanceBinary(2, 5));
console.log(hammingDistanceBinary(2, 2));