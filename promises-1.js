/*****  SYNCHRONOUS vs ASYNCHRNOUS CODE  *****/
// Sync - executes line by line
console.log('start');  // 1.
console.log('Hello there');  // 2.
console.log('finish'); // 3.

// Async - executes after the sync code (because js is single threaded)
console.log('start');  // 1.
setTimeout(() => console.log('Hello there'), 0);  // 3.
console.log('finish'); // 2.


/*****  CALLBACKS  *****/
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

// or

const sub2 = Promise.resolve("Logged in successfully.");
sub2.then((res) => console.log(res)).catch((err) => console.log(err));

console.log('FINISH');


/*****  REWRITE CALLBACK AS PROMISE  *****/
console.log('START');

function importantAction(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${username} has logged in.`);
            // reject(`Error logging in!`);
        }, 1000);
    });
}
function likeTheVideo(video) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve(`Like the ${video} video.`);
            reject(`Error liking video!`);
        }, 1000);
    });
}
function shareTheVideo(video) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Share the ${video} video.`);
            // reject(`Error sharing video!`);
        }, 500);
    });
}

importantAction("jeff123")
    .then((res) => {
        console.log(res);
        likeTheVideo("Never gonna give you up").then((res) => {
            console.log(res);
            shareTheVideo("Never gonna give you up").then((res) => {
                console.log(res);
            });
        });
    })
    .catch((err) => console.log(err));

console.log('FINISH');


/*****  PROMISE CHAINING  *****/
importantAction("jeff123")
    .then((res) => {
        console.log(res);
        return likeTheVideo("Never gonna give you up");
    })
    .then((res) => {
        console.log(res);
        return shareTheVideo("Never gonna give you up");
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => console.log(err));

console.log('FINISH');


/*****  PROMISE COMBINATORS  *****/
// runs all promises in parallel, return array with fullfilled values
// if one promise fails, all of then do
Promise.all([
    importantAction("jeff123"),
    likeTheVideo("Never gonna give you up"),
    shareTheVideo("Never gonna give you up"),
])
    .then((res) => console.log(res))
    // [
    //    'jeff123 has logged in.',
    //    'Like the Never gonna give you up video.',
    //    'Share the Never gonna give you up video.'
    // ]
    .catch((err) => console.error(err)); // Error logging in!

// returns first promise that is fullfilled or rejected    
Promise.race([
    importantAction("jeff123"),
    likeTheVideo("Never gonna give you up"),
    shareTheVideo("Never gonna give you up"),
])
    .then((res) => console.log(res)) // Share the Never gonna give you up video. (500ms)
    .catch((err) => console.error(err));


// return array with resolved values, both fullfilled and failed
Promise.allSettled([
    importantAction("jeff123"),
    likeTheVideo("Never gonna give you up"),
    shareTheVideo("Never gonna give you up"),
])
    .then((res) => console.log(res))
    // [
    //    { status: 'rejected', reason: 'Error logging in!' },
    //    { status: 'fulfilled', value: 'Like the Never gonna give you up video.'},
    //    { status: 'fulfilled', value: 'Share the Never gonna give you up video.'}
    // ]
    .catch((err) => console.error(err));

// returns first promise that is fullfilled, ignores rejected ones 
// goes to chatch only if all promises fail   
Promise.any([
    importantAction("jeff123"),
    likeTheVideo("Never gonna give you up"),
    shareTheVideo("Never gonna give you up"),
])
    .then((res) => console.log(res)) // Like the Never gonna give you up video.
    .catch((err) => console.error(err));

console.log('FINISH');


/*****  ASYNC / AWAIT  *****/
const result = async () => {
    try {
        const msg1 = await importantAction("jeff123");
        const msg2 = await likeTheVideo("Never gonna give you up");
        const msg3 = await shareTheVideo("Never gonna give you up");
        console.log([msg1, msg2, msg3]);
    } catch (err) {
        console.log(err);
    }
};
result();