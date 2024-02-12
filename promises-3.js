/*****  PROMISE POLYFILL  *****/
function PromisePolyfill(executor) {
    let onResolve,
        onReject,
        isFulfilled = false,
        isRejected = false,
        isCalled = false,
        value;

    function resolve(val) {
        isFulfilled = true;
        value = val;
        if (typeof onResolve === 'function') {
            onResolve(val);
            isCalled = true;
        }
    }
    function reject(val) {
        isRejected = true;
        value = val;
        if (typeof onReject === 'function') {
            onReject(val);
            isCalled = true;
        }
    }

    this.then = function (callback) {
        onResolve = callback; // (res) => { console.log(res); }

        if (isFulfilled && !isCalled) {
            isCalled = true;
            onResolve(value);
        }
        return this;
    };
    this.catch = function (callback) {
        onReject = callback;
        if (isRejected && !isCalled) {
            isCalled = true;
            onReject(value);
        }
        return this;
    };

    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }


}

const examplePromise = new PromisePolyfill((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 1000);
});

examplePromise
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });

/*
Asynchronous operation: 

1. Create new istance of PromisePolyfill and run: try { executor(resolve, reject);...
    executor is async operation, so it is left to the end
2. Call .then, set onResolve to (res) => { console.log(res); }
    isFulfilled = false, so we 'return this'
3. now we call the resolve(2) in setTimeout
4. inside resolve function, onResolve is set up (2.), so we call it with provided value (2)
5. // 2


Synchronous operation: 

1. Create new istance of PromisePolyfill and run: try { executor(resolve, reject);...
2. Call resolve(2), isFulfilled = true; value = 2;
    onResolve is not a function, so we continue with .then
3. Call .then, set onResolve to (res) => { console.log(res); }
    isFulfilled = true; isCalled = false so we run onResolve(2);
4. // 2
*/

PromisePolyfill.resolve = (val) => {
    return new PromisePolyfill(function executor(resolve, reject) {
        resolve(val);
    });
};
PromisePolyfill.reject = (val) => {
    return new PromisePolyfill(function executor(resolve, reject) {
        reject(val);
    });
};


/*****  PROMISE.ALL() POLYFILL  *****/
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

Promise.allPolyfill = (promises) => {
    return new Promise((resolve, reject) => {
        const results = [];

        if (!promises.length) {
            resolve(results);
            return;
        }

        let pending = promises.length;

        promises.forEach((promise, index) => {
            Promise.resolve(promise).then((res) => {
                results[index] = res;
                pending--;
                if (pending === 0) {
                    resolve(results);
                }
            }, reject);
        });
    });
};
Promise.allPolyfill([
    importantAction("jeff123"),
    likeTheVideo("Never gonna give you up"),
    shareTheVideo("Never gonna give you up")
])
    .then((res) => console.log(res))
    .catch((err) => console.error("Failed:", err));