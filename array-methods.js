const nums = [1, 2, 3, 4];

/*****  MAP  *****/
// create new array from existing one
const multiplyThree = nums.map((num, index, arr) => {
    return num * 3;
});
console.log(multiplyThree); // [ 3, 6, 9, 12 ]


/*****  MAP POLYFILL *****/
Array.prototype.myMap = function (callback) {
    let temp = [];
    for (let index = 0; index < this.length; index++) {
        temp.push(callback(this[index], index, this));
    }
    return temp;
};
const multiplyThreePolyfill = nums.myMap((num, index, arr) => {
    return num * 3;
});
console.log(multiplyThreePolyfill); // [ 3, 6, 9, 12 ]


/*****  FILTER  *****/
// applies conditional statement on each element in array
// if true, elements goes to output array
const moreThanTwo = nums.filter((num, index, arr) => {
    return num > 2;
});
console.log(moreThanTwo); // [ 3, 4 ]


/*****  FILTER POLYFILL  *****/
Array.prototype.myFilter = function (callback) {
    let temp = [];
    for (let index = 0; index < this.length; index++) {
        if (callback(this[index], index, this)) temp.push(this[index]);
    }
    return temp;
};
const moreThanTwoPolyfill = nums.myFilter((num, index, arr) => {
    return num > 2;
});
console.log(moreThanTwoPolyfill); // [ 3, 4 ]


/*****  REDUCE  *****/
// reduces array to one value
// takes callback function and inital value
// accumultor: result of prev. computation, starts as initial value or first item of array
const sum = nums.reduce((accumulator, currentVal, index, arr) => {
    return accumulator + currentVal;
}, 0);
console.log(sum); // 10


/*****  REDUCE POLYFILL  *****/
Array.prototype.myReduce = function (callback, initialValue) {
    var accumulator = initialValue;

    for (let index = 0; index < this.length; index++) {
        accumulator = accumulator ? callback(accumulator, this[index], index, this) : this[index];
    }

    return accumulator;
};
const sumPolyfill = nums.myReduce((accumulator, currentVal, index, arr) => {
    return accumulator + currentVal;
}, 0);
console.log(sumPolyfill); // 10


/*****  MAP vs FOREACH  *****/
const arr = [2, 5, 3, 4, 7];

// returns new array, can chain methods arr.map(...).filter(...)
const mapResult = arr.map((ar) => {
    return ar + 2;
});
console.log(mapResult); // [ 4, 7, 5, 6, 9 ]

// modifies original array
const forEachResult = arr.forEach((ar, index) => {
    arr[index] = ar + 2;
});
console.log(forEachResult); // undefined
console.log(arr); // [ 4, 7, 5, 6, 9 ]


/*****  COMMON OUTPUT QUESTIONS  *****/
let students = [
    { name: "John", rollNumber: 31, marks: 80 },
    { name: "Ema", rollNumber: 15, marks: 69 },
    { name: "Paula", rollNumber: 16, marks: 35 },
    { name: "Eric", rollNumber: 7, marks: 55 },
];


// 1. Return student names in capital letters
// console.time('forEach');
const studenNamesCapital = [];
students.forEach((student) => {
    studenNamesCapital.push(student.name.toUpperCase());
});
// console.timeEnd('forEach');
console.log(studenNamesCapital);

// console.time('map');
const studenNamesCapital2 = students.map((student) => student.name.toUpperCase());
// console.timeEnd('map');
console.log(studenNamesCapital2);


// 2. Return details of students who scored above 60
const studentsAbove60 = students.filter((student) => student.marks > 60);
console.log(studentsAbove60);


// 3. Return details of students who scored above 60 and have roll number greater than 15
const destails = students.filter((student) => student.marks > 60 && student.rollNumber > 15);
console.log(destails);


// 4. Sum of marks of all students
const sumMarks = students.reduce((acc, curr) => acc + curr.marks, 0);
console.log(sumMarks);


// 5. Return names of studens who scored more than 60
const studentNamesAbove60 = students.filter((student) => student.marks > 60).map((student) => student.name);
console.log(studentNamesAbove60);


// 6. Return total marks for students with marks greater than 60 
//after 20 has been added to those who scored less than 60
const sumMarksAbove60 = students
    .map((student) => {
        if (student.marks < 60) student.marks += 20;
        return student;
    })
    .filter((student) => student.marks > 60)
    .reduce((acc, curr) => acc + curr.marks, 0);

console.log(sumMarksAbove60);