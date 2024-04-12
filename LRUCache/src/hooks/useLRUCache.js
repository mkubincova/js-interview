import { useRef } from 'react';

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = {};
        this.head = null;
        this.tail = null;
    }

    get(key) {
        if (this.cache[key]) {
            this.moveToFront(key);
            return this.cache[key].value;
        }
        return null;
    }

    put(key, value) {
        if (this.cache[key]) {
            this.cache[key].value = value;
            this.moveToFront(key);
        } else {
            if (Object.keys(this.cache).length === this.capacity) {
                this.removeLast();
            }
            this.addToFront(key, value);
        }
    }

    addToFront(key, value) {
        const newNode = {
            key, value, next: null
        };
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.cache[key] = newNode;
    }

    moveToFront(key) {
        const current = this.cache[key];
        // node is alread at the front
        if (current === this.head) return;

        // loop till we reach node with the correct key
        let prev = null;
        let node = this.head;
        while (node && node.key !== key) {
            prev = node;
            node = node.next;
        }

        // node doesn't exist
        if (!node) return;

        // node is the last element,
        // point the tail to previous one to remove it
        if (node === this.tail) {
            this.tail = prev;
        }

        // remove node by poiting the previous one to the following one,
        // skipping over our node
        if (prev) {
            prev.next = node.next;
        }

        // add the node to front
        node.next = this.head;
        this.head = node;
    }

    removeLast() {
        if (!this.head) return;

        // remove node from cache
        const lastKey = this.tail.key;
        delete this.cache[lastKey];

        // remove node from list (1 item)
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            // remove node from list (multiple items)
        } else {
            let current = this.head;
            while (current.next !== this.tail) {
                current = current.next;
            }
            current.next = null;
            this.tail = current;
        }
    }
}

const useLRUCache = (capacity) => {
    // useRef to persist values between renders
    const cacheRef = useRef(new LRUCache(capacity));
    return {
        get: (key) => cacheRef.current.get(key),
        put: (key, value) => cacheRef.current.put(key, value)
    };
};
export default useLRUCache;