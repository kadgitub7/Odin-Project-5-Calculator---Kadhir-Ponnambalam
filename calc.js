let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let resetDisplay = false;

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => handleInput(btn.id));
});

function handleInput(id) {
    if (id === "clear") return clearCalculator();
    if (id === "equals") return evaluate();

    if (["add", "subtract", "multiply", "divide"].includes(id)) {
        chooseOperator(id);
        return;
    }

    inputDigit(id);
}

function inputDigit(id) {
    const digit = idToDigit(id);
    if (display.textContent === "0" || resetDisplay) {
        display.textContent = digit;
        resetDisplay = false;
    } else {
        display.textContent += digit;
    }
}

function idToDigit(id) {
    const map = {
        zero: "0", one: "1", two: "2", three: "3", four: "4",
        five: "5", six: "6", seven: "7", eight: "8", nine: "9"
    };
    return map[id] ?? "";
}

function chooseOperator(id) {
    const opMap = { add: "+", subtract: "-", multiply: "*", divide: "/" };
    const newOperator = opMap[id];

    if (currentOperator && !resetDisplay) {
        evaluate();
    }

    firstOperand = parseFloat(display.textContent);
    currentOperator = newOperator;
    resetDisplay = true;
}

function evaluate() {
    if (currentOperator === null || resetDisplay) return;

    secondOperand = parseFloat(display.textContent);

    if (isNaN(firstOperand) || isNaN(secondOperand)) return;

    try {
        const result = operate(currentOperator, firstOperand, secondOperand);
        display.textContent = roundResult(result);
        firstOperand = result;
        currentOperator = null;
        resetDisplay = true;
    } catch (e) {
        display.textContent = e.message;
        resetDisplay = true;
    }
}

function clearCalculator() {
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    resetDisplay = false;
    display.textContent = "0";
}

function roundResult(num) {
    return Math.round(num * 100000) / 100000;
}

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) throw new Error("Can't divide by zero");
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
        default: return null;
    }
}
display.textContent = "0";