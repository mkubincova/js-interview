class Node {
    constructor(data) {
        this.val = data;
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
}

/***** COMMON QUESTIONS  *****/

// 1. Palindrome Linked List
// given a head of linked list, return true if its palindrome
// head = [1,2,2,1] -> true

//Definition: 
const linkedListPal = new LinkedList();
linkedListPal.addFirst(1);
linkedListPal.addFirst(2);
linkedListPal.addFirst(2);
linkedListPal.addFirst(1);

const isPalindrome = (head) => {
    let string1 = "";
    let string2 = "";
    let node = head;

    while (node != null) {
        string1 = `${string1}${node.val}`;
        string2 = `${node.val}${string2}`;
        node = node.next;
    }

    return string1 == string2;
};
console.log(isPalindrome(linkedListPal.head)); //true


// 2. Reverse Linked List
const linkedListRev = new LinkedList();
linkedListRev.addFirst(5);
linkedListRev.addFirst(4);
linkedListRev.addFirst(3);
linkedListRev.addFirst(2);
linkedListRev.addFirst(1);
// 1 -> 2 -> 3 -> 4 -> 5

const reverseList = (head) => {
    let prev = null;
    let current = head;

    while (current !== null) {
        const nextNode = current.next;
        current.next = prev;
        prev = current;
        current = nextNode;
    }

    return prev;
};
console.log(reverseList(linkedListRev.head));
/* Node {
    val: 5,
    next: Node { val: 4, next: Node { val: 3, next: [Node] } }
} */


// 3. Delete node in a linked list, without access to the first node of head
// 4 -> 5 -> 1 -> 9, node = 5  =>  4 -> 1 -> 9
const linkedListDel = new LinkedList();
linkedListDel.addFirst(9);
linkedListDel.addFirst(1);
linkedListDel.addFirst(5);
linkedListDel.addFirst(4);

const deleteNode = (node) => {
    node.val = node.next.val;
    node.next = node.next.next;

    return linkedListDel;
};

console.log(deleteNode(linkedListDel.head.next));
/* LinkedList {
  head: Node { val: 4, next: Node { val: 1, next: [Node] } }
} */


// 4. Delete whole linked list
linkedListDel.head = null;
console.log(linkedListDel); // LinkedList { head: null }


// 5. Remove nth node from the end of list
// 1 -> 2 -> 3 -> 4 -> 5, n = 3  =>  1 -> 2 -> 4 -> 5  
const linkedListDelNth = new LinkedList();
linkedListDelNth.addFirst(5);
linkedListDelNth.addFirst(4);
linkedListDelNth.addFirst(3);
linkedListDelNth.addFirst(2);
linkedListDelNth.addFirst(1);

const removeNthFromEnd = (head, n) => {
    let slow = head;
    let fast = head;

    // make "n" the distace between fast and slow
    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }

    if (!fast) {
        return head.next;
    }

    // move both till the end of list (nth element will be slow.next)
    while (fast.next) {
        slow = slow.next;
        fast = fast.next;
    }

    slow.next = slow.next.next;
    return head;
};

console.log("Delete nth: ", removeNthFromEnd(linkedListDelNth.head, 3));
/* Delete nth:  Node {
  val: 1,
  next: Node { val: 2, next: Node { val: 4, next: [Node] } }
} */


// 6. Add two numbers
// given two non-empty linked lists, each representing integer with digits stored in reverse order
// sum those numbers and create another linked list representing the sum

// 2 -> 4 -> 3 (342) + 5 -> 6 -> 4 (465) = 7 -> 0 -> 8 (807)
const linkedList1 = new LinkedList();
linkedList1.addFirst(3);
linkedList1.addFirst(4);
linkedList1.addFirst(2);
const linkedList2 = new LinkedList();
linkedList2.addFirst(4);
linkedList2.addFirst(6);
linkedList2.addFirst(5);

const addTwoNumbers = (l1, l2) => {
    var dummy = new Node(0);
    var current = dummy;
    var carry = 0;

    while (l1 !== null || l2 !== null || carry > 0) {
        var val1 = l1 ? l1.val : 0;
        var val2 = l2 ? l2.val : 0;

        var sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        sum %= 10;

        current.next = new Node(sum);
        current = current.next;

        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }

    return dummy.next;
};
console.log("Sum: ", addTwoNumbers(linkedList1.head, linkedList2.head));
/* Sum:  Node {
  val: 7,
  next: Node { val: 0, next: Node { val: 8, next: null } }
} */