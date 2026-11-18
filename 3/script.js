function isValid(str) {
    const stack = [];
    const pairs = { ')': '(', ']': '[', '}': '{' };

    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
        } else if (char === ')' || char === ']' || char === '}') {
            if (stack.length === 0) {  // на случай, если первая скобка закрывающая. избежание ошибок
                return false;
            } 

            const top = stack.pop();
            if (top !== pairs[char]) {
                return false;
            }
        }
    }

    return stack.length === 0;
}


// сначала верные проверки, потом неверные
console.log(isValid(''));
console.log(isValid('()'));
console.log(isValid('()[]{}'));
console.log(isValid('{[]}'));

console.log(isValid('(]'));
console.log(isValid('([)]'));
console.log(isValid('(('));
console.log(isValid('))'));