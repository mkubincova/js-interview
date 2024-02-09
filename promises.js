/*****  SYNCHRONOUS vs ASYNCHRNOUS CODE  *****/
/*
// Sync - executes line by line
console.log('start');  // 1.
console.log('Hello there');  // 2.
console.log('finish'); // 3.

// Async - executes after the sync code (because js is single threaded)
console.log('start');  // 1.
setTimeout(() => console.log('Hello there'), 0);  // 3.
console.log('finish'); // 2.


/*****  CALLBACKS  *****/
/*
console.log('START');

function importantAction(username, cb) {
    setTimeout(() => {
        cb(`${username} has logged in.`);
    }, 1000);
}
function likeTheVideo(video, cb) {
    setTimeout(() => {
        cb(`Like the ${video} video.`);
    }, 1000);
}
function shareTheVideo(video, cb) {
    setTimeout(() => {
        cb(`Share the ${video} video.`);
    }, 1000);
}

// callback hell/pyramid of doom:
const message = importantAction('kister95', (message) => {
    console.log(message);
    likeTheVideo("Never Gonna Give You Up", (message) => {
        console.log(message);
        shareTheVideo("Never Gonna Give You Up", (message) => {
            console.log(message);
        });
    });
});

console.log('FINISH');


/*****  PROMISES  *****/
// The Promise object represents the eventual completion (or failure)  
// of an asynchronous operation and its resulting value
console.log('START');

const sub = new Promise((resolve, reject) => {
    setTimeout(() => {
        const result = false;
        if (result) resolve("Logged in successfully.");
        else reject(new Error("Oops, something went wrong..."));
    }, 2000);
});

sub.then((res) => {
    console.log(res);
}).catch((err) => {
    console.error(err);
});

console.log('FINISH');