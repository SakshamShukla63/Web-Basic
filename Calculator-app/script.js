const input = document.getElementById('inputbox');
const previousDisplay = document.getElementById('previous-display');
const buttons = document.querySelectorAll('button');
let expression = '';
let justCalculated = false;

function render() {
    input.value = expression.replaceAll('*', '×').replaceAll('/', '÷') || '';
}

function addValue(value) {
    if (justCalculated && /\d|\./.test(value)) expression = '';
    justCalculated = false;

    if (value === '.') {
        const currentNumber = expression.split(/[+*/-]/).pop();
        if (currentNumber.includes('.')) return;
        if (!currentNumber) expression += '0';
    }

    if (/[+*/-]/.test(value)) {
        if (!expression && value !== '-') return;
        if (/[+*/-]$/.test(expression)) expression = expression.slice(0, -1);
    }
    expression += value;
    render();
}

function calculate() {
    if (!expression || /[+*/.-]$/.test(expression)) return;
    try {
        const result = evaluate(expression);
        previousDisplay.textContent = `${expression.replaceAll('*', '×').replaceAll('/', '÷')} =`;
        expression = formatResult(result);
        justCalculated = true;
        render();
    } catch {
        previousDisplay.textContent = 'Invalid expression';
        expression = '';
        render();
    }
}

function evaluate(value) {
    const numbers = value.match(/\d*\.?\d+|[+*/-]/g);
    if (!numbers || numbers.join('') !== value) throw new Error('Invalid input');
    const stack = [];
    let operator = '+';
    for (const token of numbers) {
        if (/^[+*/-]$/.test(token)) { operator = token; continue; }
        const number = Number(token);
        if (operator === '+') stack.push(number);
        if (operator === '-') stack.push(-number);
        if (operator === '*') stack.push(stack.pop() * number);
        if (operator === '/') {
            if (number === 0) throw new Error('Division by zero');
            stack.push(stack.pop() / number);
        }
    }
    return stack.reduce((total, number) => total + number, 0);
}

function formatResult(value) {
    return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(10)));
}

function clear() {
    expression = '';
    previousDisplay.textContent = '';
    justCalculated = false;
    render();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const { action, value } = button.dataset;
        if (action === 'clear') clear();
        else if (action === 'delete') { expression = expression.slice(0, -1); render(); }
        else if (action === 'calculate') calculate();
        else if (value === '%') { expression = expression.replace(/(\d*\.?\d+)$/, number => String(Number(number) / 100)); render(); }
        else addValue(value);
    });
});

document.addEventListener('keydown', event => {
    if (/\d|[+*/.-]/.test(event.key)) addValue(event.key);
    else if (event.key === 'Enter' || event.key === '=') calculate();
    else if (event.key === 'Backspace') { expression = expression.slice(0, -1); render(); }
    else if (event.key === 'Escape') clear();
});
