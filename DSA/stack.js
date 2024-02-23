/*****  STACK  *****/
// last-in first-out principle

class Stack {
    constructor() {
        this.stack = [];
    }

    push(element) {
        this.stack.push(element);
    }

    pop() {
        if (this.isEmpty()) return "Stack is empty. Can't pop.";
        return this.stack.pop();
    }

    peek() {
        if (this.isEmpty()) return "Stack is empty. Can't peek.";
        return this.stack[this.size() - 1];
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.stack.length;
    }

    printStack() {
        if (this.isEmpty()) return "Stack is empty, nothing to print.";
        for (let i = this.size() - 1; i >= 0; i--) {
            console.log(this.stack[i]);
        }
    }
}

const stack = new Stack();

stack.push(10);
stack.push(69);
stack.push(420);

// stack.printStack();


/*****  COMMON QUESTIONS  *****/

// 1. Given input string s, reverse the order of the words
// "the sky is blue" -> "blue is sky the"
// "  hello world  " -> "world hello"
// "a good  example" -> "example good a"

// Time comlexity: O(n), Space comlexity: O(n)
function reverseString(str) {
    strArr = str.split(" ");
    newStrArr = [];

    for (let i = strArr.length - 1; i >= 0; i--) {
        if (strArr[i]) newStrArr.push(strArr[i]);
    }
    return newStrArr.join(" ");
}
console.log(reverseString("the sky is blue"));
console.log(reverseString("  hello world  "));
console.log(reverseString("a good  example"));

// 2. Given a string containing just the characters '(', ')', '{'...
// determine if input is valid
// brackets must be closed in correct order
// "()[]{}" -> true
// "(]" -> false

// Time complexity: O(n), Space complexity: O(n)
function isValidBracket(str) {
    const stack = [];
    const brackets = { open: ["(", "[", "{"], close: [")", "]", "}"] };

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (brackets.open.includes(char)) {
            stack.push(char);
        } else if (brackets.close.includes(char)) {
            if (isEmpty(stack)) return false;
            const top = stack.pop();
            if (brackets.close.indexOf(char) !== brackets.open.indexOf(top)) {
                return false;
            }
        }
    }
    return isEmpty(stack);
}

function isEmpty(stack) {
    return stack.length === 0;
}

console.log(isValidBracket("([]{})"));
console.log(isValidBracket("(]()"));