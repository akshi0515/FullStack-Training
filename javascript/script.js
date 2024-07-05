document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');
    const decimalButton = document.querySelector('.decimal');

    let firstOperand = null;
    let operator = null;
    let currentOperand = '';
    let displayValue = '';

    function updateDisplay() {
        display.textContent = displayValue || '0';
    }

    function clear() {
        firstOperand = null;
        operator = null;
        currentOperand = '';
        displayValue = '';
        updateDisplay();
    }

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand += number;
        displayValue += number;
        updateDisplay();
    }

    function setOperator(op) {
        if (currentOperand === '' && firstOperand === null) return;
        if (firstOperand !== null) {
            calculate();
        }
        firstOperand = parseFloat(currentOperand);
        operator = op;
        displayValue += op ;
        currentOperand = '';
        updateDisplay();
    }

    function calculate() {
        if (operator === null || firstOperand === null || currentOperand === '') return;
        const secondOperand = parseFloat(currentOperand);
        let result;

        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                if (secondOperand === 0) {
                    clear();
                    display.textContent = 'Error';
                    return;
                }
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }

        currentOperand = result.toString();
        displayValue = currentOperand;
        operator = null;
        firstOperand = null;
        updateDisplay();
    }

    numberButtons.forEach(button => {
        button.addEventListener('click', () => appendNumber(button.value));
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => setOperator(button.value));
    });

    clearButton.addEventListener('click', clear);

    equalsButton.addEventListener('click', calculate);

    decimalButton.addEventListener('click', () => appendNumber('.'));
  
    document.addEventListener('keydown', (event) => {
        if (event.key >= '0' && event.key <= '9') appendNumber(event.key);
        if (event.key === '.') appendNumber('.');
        if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') setOperator(event.key);
        if (event.key === 'Enter' || event.key === '=') calculate();
        if (event.key === 'Escape') clear();
    });
});