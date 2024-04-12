import { useRef } from 'react';

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    addToFront(key) {
        const newNode = new Node(key);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
        return newNode;
    }
    moveToFront(node) {
        if (node === this.head) return;
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;
        if (node === this.tail) this.tail = node.prev;
        node.prev = null;
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }
    removeLast() {
        if (!this.tail) return null;

        const removedNode = this.tail;
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = removedNode.prev;
            this.tail.next = null;
        }
        this.size--;
        return removedNode;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = {};
        this.dll = new DoublyLinkedList();
    }

    get(key) {
        if (this.cache[key]) {
            this.dll.moveToFront(this.cache[key].node);
            return this.cache[key].value;
        }
        return null;
    }

    put(key, value) {
        if (this.cache[key]) {
            this.cache[key].value = value;
            this.dll.moveToFront(this.cache[key].node);
        } else {
            if (this.dll.size === this.capacity) {
                let removedNode = this.dll.removeLast();
                delete this.cache[removedNode.data];
            }
            const newNode = this.dll.addToFront(key);
            this.cache[key] = { value, node: newNode };
        }
    }
}

const useLRUCache = (capacity) => {
    // useRef to persist values between renders
    const cacheRef = useRef(new LRUCache(capacity));
    console.log(cacheRef.current);
    return {
        get: (key) => cacheRef.current.get(key),
        put: (key, value) => cacheRef.current.put(key, value)
    };
};
export default useLRUCache;