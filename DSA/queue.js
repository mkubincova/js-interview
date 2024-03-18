/*****  QUEUE  *****/
// first-in first-out principle

class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(element) {
        this.queue.push(element);
    }

    dequeue() {
        if (this.isEmpty()) return "Queue is empty. Can't dequeue.";
        return this.queue.shift();
    }

    peek() {
        if (this.isEmpty()) return "Queue is empty. Can't peek.";
        return this.queue[0];
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.queue.length;
    }

    printQueue() {
        if (this.isEmpty()) return "Queue is empty, nothing to print.";
        for (let i = 0; i < this.size(); i++) {
            console.log(this.queue[i]);
        }
    }
}

const myQueue = new Queue();

myQueue.enqueue(5);
myQueue.enqueue(96);
myQueue.enqueue(786);

myQueue.dequeue();

myQueue.printQueue();
console.log(myQueue.peek());


/*****  COMMON QUESTIONS  *****/

// 1. Circular queue implementation
// queue where last position is connected back to first
var MyCircularQueue = function (k) {
    this.queue = [];
    this.size = k;
};

MyCircularQueue.prototype.enQueue = function (value) {
    if (this.size === this.queue.length) return false;
    this.queue.push(value);
    return true;
};
MyCircularQueue.prototype.deQueue = function () {
    if (this.queue.length === 0) return false;
    this.queue.shift();
    return true;
};
MyCircularQueue.prototype.Front = function () {
    if (this.queue.length === 0) return false;
    return this.queue[0];
};
MyCircularQueue.prototype.Rear = function () {
    if (this.queue.length === 0) return false;
    return this.queue[this.queue.length - 1];
};
MyCircularQueue.prototype.isEmpty = function () {
    return this.queue.length === 0;
};
MyCircularQueue.prototype.isFull = function () {
    return this.queue.length === this.size;
};

var obj = new MyCircularQueue(3);
obj.enQueue(1);     //[1,_,_]
obj.enQueue(4);     //[1,4,_]
obj.enQueue(88);    //[1,4,88]
obj.enQueue(9);     //[1,4,88]

obj.deQueue();      //[_,4,88]
obj.enQueue(5);     //[4,88,5]
console.log(obj.isEmpty());
console.log(obj.isFull());

console.log(obj.Front(), obj.Rear());

// 2. Implement stack using queues
// implement lifo (last in first out) stack using only two queues
var MyStack = function () {
    this.q1 = []; // [4,3,2,1]
    this.q2 = []; // []
};

MyStack.prototype.push = function (x) {
    while (this.q1.length > 0) {
        this.q2.push(this.q1.shift());
    }
    this.q1.push(x);
    while (this.q2.length > 0) {
        this.q1.push(this.q2.shift());
    }
};
MyStack.prototype.pop = function () {
    return this.q1.shift();
};
MyStack.prototype.top = function () {
    return this.q1[0];
};
MyStack.prototype.empty = function () {
    return this.q1.length === 0;
};

var stack = new MyStack();
stack.push(3);
stack.push(5);
stack.push(11);
stack.pop();
console.log(stack.top());


// 3. Implement queue using stacks
// implement fifo (first in first out) queue using only two stacks

var MyQueue = function () {
    this.s1 = [];
    this.s2 = [];
};

MyQueue.prototype.enqueue = function (x) {
    this.s1.push(x);
    console.log(this.s1, this.s2);
};
MyQueue.prototype.dequeue = function () {
    if (this.s2.length === 0) {
        while (this.s1.length > 0) {
            this.s2.push(this.s1.pop());
        }
    }
    return this.s2.pop();
};
MyQueue.prototype.front = function () {
    if (this.s2.length === 0) {
        while (this.s1.length > 0) {
            this.s2.push(this.s1.pop());
        }
    }
    return this.s2[this.s2.length - 1];
};
MyQueue.prototype.empty = function () {
    return this.s1.length === 0 && this.s2.length === 0;
};

var queue = new MyQueue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);

console.log(queue.front());
queue.dequeue();
console.log(queue.front());