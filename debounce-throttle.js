/*****  DEBOUNCING  *****/
// optimize how cetain events are called (send api call after user stops typing)
// limits execution of function call and waits for a certain amount of time before running it again

// Create button and debounce:
// show "Button Pressed x Times" every time button is pressed
// Increate "Triggered y Times" count after 800ms of debounce
const button = document.querySelector(".increment_btn");
const pressedText = document.querySelector(".increment_pressed");
const triggeredText = document.querySelector(".increment_count");

var pressedCount = 0;
var triggeredCount = 0;

// const debounceCount = _.debounce(() => {
//     triggeredText.textContent = ++triggeredCount;
// }, 800);

button.addEventListener("click", () => {
    pressedText.textContent = ++pressedCount;
    debounceCount();
});


/*****  DEBOUNCE POLYFILL  *****/
function myDebounce(callback, delay) {
    let timer;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

const debounceCount = myDebounce(() => {
    triggeredText.textContent = ++triggeredCount;
}, 800);


/*****  THROTTLING  *****/
// limits how often a function can be called in a given period of time
// e.g. scroll being called only every 500ms not continuosly

// Create button and throttle:
// show "Button Pressed x Times" every time button is pressed
// Increate "Triggered y Times" count after 800ms of throttle
const button2 = document.querySelector(".increment_btn2");
const pressedText2 = document.querySelector(".increment_pressed2");
const triggeredText2 = document.querySelector(".increment_count2");

var pressedCount2 = 0;
var triggeredCount2 = 0;

// const throttleCount = _.throttle(() => {
//     triggeredText2.textContent = ++triggeredCount2;
// }, 800);

button2.addEventListener("click", () => {
    pressedText2.textContent = ++pressedCount2;
    throttleCount();
});


/*****  THROTTLE POLYFILL  *****/
function MyThrottle(callback, delay) {
    let last = 0;
    return function (...args) {
        let now = new Date().getTime();
        if (now - last < delay) return;
        last = now;
        return callback(...args);
    };
}

const throttleCount = MyThrottle(() => {
    triggeredText2.textContent = ++triggeredCount2;
}, 800);