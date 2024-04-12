/***** DOUBLY LINKED LIST  *****/

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addFirst(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        if (this.head) this.head.prev = newNode;
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
        newNode.prev = current;
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
            if (this.head) this.head.prev = newNode;
            this.head = newNode;
            return;
        }
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        newNode.prev = current;
        newNode.next = current.next;

        if (current.next) current.next.prev = newNode;
        current.next = newNode;
    }

    removeFirst() {
        if (!this.head) return;
        this.head = this.head.next;
        if (this.head) this.head.prev = null;
    }

    removeLast() {
        if (!this.head) return;
        if (!this.head.next) {
            this.head = null;
        }
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
            if (this.head) this.head.prev = null;
            return;
        }
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        if (current.next) {
            current.next = current.next.next;
            if (current.next) current.next.prev = current;
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

linkedList.addFirst(5); // 5
linkedList.addFirst(3); // 3 -> 5
linkedList.addFirst(8); // 8 -> 3 -> 5
linkedList.addLast(6); // 8 -> 3 -> 5 -> 6

linkedList.removeFirst(); // 3 -> 5 -> 6

linkedList.addAt(333, 2); // 3 -> 5 -> 333 -> 6

linkedList.removeLast(); // 3 -> 5 -> 333

linkedList.removeAt(2); // 3 -> 5

linkedList.print();
console.log("size: ", linkedList.size());