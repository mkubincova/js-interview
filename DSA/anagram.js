/*****  ANAGRAM  *****/
// word or phrase formed by rearranging letters

// a = "anagram", b = "nagaram" -> true
// a = "car", b = "rat" -> false

const isAnagram1 = (a, b) => {
    if (a.lenght !== b.lenght) return false;
    return a.split("").sort().join("") === b.split("").sort().join("");
};
console.log(isAnagram1("car", "rat"));
console.log(isAnagram1("anagram", "nagaram"));


const isAnagram2 = (a, b) => {
    if (a.lenght !== b.lenght) return false;

    let obj1 = {};
    let obj2 = {};

    for (let i = 0; i < a.length; i++) {
        obj1[a[i]] = (obj1[a[i]] || 0) + 1;
        obj2[b[i]] = (obj2[b[i]] || 0) + 1;
    }
    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) return false;
    }

    return true;
};
console.log(isAnagram2("car", "rat"));
console.log(isAnagram2("anagram", "nagaram"));