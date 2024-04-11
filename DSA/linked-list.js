/***** LINKED LIST  *****/
// helps save space in memory
// divided into nodes, each has reference to the next one
// can only move from left to right

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addFirst(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    addLast(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    addAt(data, index) {
        if (index < 0 || index > this.size()) {
            console.error("Invalied index");
            return;
        }
        const newNode = new Node(data);
        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
            return;
        }
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
    }

    removeFirst() {
        if (!this.head) return;
        this.head = this.head.next;
    }

    removeLast() {
        if (!this.head) return;
        let current = this.head;
        while (current.next.next) {
            current = current.next;
        }
        current.next = null;
    }

    removeAt(index) {
        if (index < 0 || index > this.size()) {
            console.error("Invalied index");
            return;
        }
        if (index === 0) {
            this.head = this.head.next;
            return;
        }
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        if (current.next) {
            current.next = current.next.next;
        }
    }

    size() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }

    print() {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }
}


const linkedList = new LinkedList();

linkedList.addFirst(5);
linkedList.addFirst(3);
linkedList.addFirst(8);
linkedList.addLast(6);

linkedList.print(); // 8 -> 3 -> 5 -> 6
console.log("size: ", linkedList.size()); // 4

linkedList.removeFirst();
linkedList.print(); // 3 -> 5 -> 6

linkedList.addAt(333, 2);
linkedList.print(); // 3 -> 5 -> 333 -> 6

linkedList.removeLast();
linkedList.print(); // 3 -> 5 -> 333

linkedList.removeAt(2);
linkedList.print(); // 3 -> 5