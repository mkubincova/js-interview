/*****  COMMON QUESTIONS  *****/

// 1. Output?
console.log("start");
const promise1 = new Promise((resolve, reject) => {
    console.log(1);
    resolve(2);
});
promise1.then((res) => {
    console.log(res);
});
console.log("end");
// start
// 1
// end
// 2

// 2. Output?
console.log("start");
const promise2 = new Promise((resolve, reject) => {
    console.log(1);
    resolve(2);
    console.log(3);
});
promise1.then((res) => {
    console.log(res);
});
console.log("end");
// start
// 1
// 3
// end
// 2

// 3. Output?
console.log("start");
const fn = () =>
    new Promise((resolve, reject) => {
        console.log(1);
        resolve("success");
    });
console.log("middle");
fn().then((res) => {
    console.log(res);
});
console.log("end");
// start
// middle
// 1
// end
// success

// 4. Output?
// the catch doesn't return anything, so it goes to the last then block
function job() {
    return new Promise(function (resolve, reject) {
        reject();
    });
}
let promise3 = job();
promise3
    .then(function () {
        console.log("Success 1");
    })
    .then(function () {
        console.log("Success 2");
    })
    .then(function () {
        console.log("Success 3");
    })
    .catch(function () {
        console.log("Error 1");
    })
    .then(function () {
        console.log("Success 4");
    });
// Error 1
// Success 4

// 5. Output?
function job(state) {
    return new Promise(function (resolve, reject) {
        if (state) {
            resolve("success");
        } else {
            reject("error");
        }

    });
}
let promise4 = job(true);
promise4
    .then(function (data) {
        console.log(data);
        return job(false);
    })
    .catch(function (error) {
        console.log(error);
        return "Error caught";
    })
    .then(function (data) {
        console.log(data);
        return job(true);
    })
    .catch(function (error) {
        console.log(error);
    });
// success
// error
// Error caught

// 6. Output?
function job(state) {
    return new Promise(function (resolve, reject) {
        if (state) {
            resolve("success");
        } else {
            reject("error");
        }

    });
}
let promise5 = job(true);
promise5
    .then(function (data) {
        console.log(data);
        return job(true);
    })
    .then(function (data) {
        if (data !== "victory") {
            throw "Defeat";
        }
        return job(true);
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(function (error) {
        console.log(error);
        return job(false);
    })
    .then(function (data) {
        console.log(data);
        return job(true);
    })
    .catch(function (error) {
        console.log(error);
        return "Error caught";
    })
    .then(function (data) {
        console.log(data);
        return new Error("test"); // Not rejected promise, just normal text
    })
    .then(function (data) {
        console.log("Success:", data.message);
    })
    .catch(function (data) {
        console.log("Error:", data.message);
    });
// success
// Defeat
// error
// Error caught
// Success: test


// 7. Promise chaining
const firstPromise = new Promise((resolve, reject) => {
    resolve("First!");
});
const secondPromise = new Promise((resolve, reject) => {
    resolve(firstPromise);
});
secondPromise
    .then((res) => {
        return res;
    })
    .then((res) => {
        console.log(res); // First!
    });

// 8. Rewrite code to async/await
// function loadJson(url) {
//     return fetch(url).then((response) => {
//         if (response.status == 200) {
//             return response.json()
//         } else {
//             throw new Error(response.status)
//         }
//     })
// }
// loadJson("https://fakeurl.com/no-such-user.json").catch((err) => {
//     console.log(err);
// })

async function loadJson(url) {
    let response = await fetch(url);
    if (response.status == 200) {
        let json = await response.json();
        return json;
    }
    throw new Error(response.status);
}

const result = async () => {
    try {
        const res = await loadJson('https://fakeurl.com/no-such-user.json');
        console.log(res);
    } catch (err) {
        console.log("My Error: ", err);
    }
};
result();

// 9. Solve promise recursively
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
        }, 1000);
    });
}

function promRecurse(funcPromises) {
    if (funcPromises.length === 0) return;
    const currPromise = funcPromises.shift();

    currPromise
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

    promRecurse(funcPromises);
}

promRecurse([
    importantAction("jeff123"),
    likeTheVideo("Never gonna give you up"),
    shareTheVideo("Never gonna give you up")
]);