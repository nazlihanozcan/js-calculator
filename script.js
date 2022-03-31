// Operator functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
        return add(num1, num2);
        
        case '-':
        return subtract(num1, num2);
        
        case '*':
        return multiply(num1, num2);
        
        case '/':
        return divide(num1, num2);
    }
}

let resultBox = document.querySelector('#resultBox');
let result = 0;
let operator;
let prevOperator;

// Placeholder for holding numbers entered
let numberString = '';

// Checker for calculate button press
let eqCheck = false;

// Event listener for each 'number' button
const BTNS_NUMBER = document.querySelectorAll('.btn-number');
BTNS_NUMBER.forEach(button => {
    button.addEventListener('click', () => {
        numberString += button.textContent;
        resultBox.textContent = numberString;
    });
});

// Dot Controls
const BTN_DOT = document.querySelector('#dot');
BTN_DOT.addEventListener('click', () => {
    if (! resultBox.textContent.includes('.')) {
        numberString += BTN_DOT.textContent;
        resultBox.textContent = numberString;
    }
});

// Operator controls
const BTNS_OPERATOR = document.querySelectorAll('.btn-op');
BTNS_OPERATOR.forEach(button => {
    button.addEventListener('click', () => {
        operator = button.textContent;
        number = Number(resultBox.textContent);
        
        if (result == 0  || eqCheck == true) {
            result = number;
            numberString = '';
            prevOperator = operator;
            eqCheck = false;
        } else {
            numberString = '';
            result = Number(operate(prevOperator, result, number));
            if (result == Infinity) {
                resultBox.textContent = 'That\'s illegal!';
            } else {
                if (Math.round(result) != result) {
                    result = result.toFixed(10);
                }
                resultBox.textContent = result;
            }
            prevOperator = operator;
        }
    });
});

// Calculate controls
const BTN_EQ = document.querySelector('#calculate');
BTN_EQ.addEventListener('click', () => {
    if (! eqCheck) {
        numberString = '';
        number = Number(resultBox.textContent);
        result = Number(operate(prevOperator, result, number));
        if (result == Infinity) {
            resultBox.textContent = 'That\'s illegal!';
        } else if (prevOperator == undefined) {
            // Do nothing if user presses '=' without input.
        } else {
            if (Math.round(result) != result) {
                result = result.toFixed(10);
            }
            resultBox.textContent = result;
        }
        eqCheck = true;
    }
});

// Clear controls
const BTN_CLEAR = document.querySelector('#clear');
BTN_CLEAR.addEventListener('click', () => {
    result = 0;
    resultBox.textContent = '';
    numberString = '';
});

// Backspace controls
const BTN_BKSP = document.querySelector('#backspace');
BTN_BKSP.addEventListener('click', () => {
    numberString = numberString.substr(0, numberString.length - 1);
    resultBox.textContent = numberString;
});

// Keyboard support
const NUMS_ID = ['#zero', '#one', '#two', '#three', '#four', '#five', 
'#six', '#seven', '#eight', '#nine'];
document.addEventListener('keydown', function (e) {
    // Top number keys
    if (48 <= e.keyCode && e.keyCode <= 57) {
        document.querySelector(NUMS_ID[e.keyCode-48]).click();
    }
    
    // Numpad keys
    if (96 <= e.keyCode && e.keyCode <= 105) {
        document.querySelector(NUMS_ID[e.keyCode-96]).click();
    }
    
    if (e.keyCode == 107) document.querySelector('#plus').click();
    if (e.keyCode == 109) document.querySelector('#minus').click();
    if (e.keyCode == 106) document.querySelector('#times').click();
    if (e.keyCode == 111) document.querySelector('#divide').click();
    if (e.keyCode == 13) document.querySelector('#calculate').click();
    if (e.keyCode == 110) document.querySelector('#dot').click();
});