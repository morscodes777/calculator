class Calculator {
    constructor(firstInputText, currentInputText) {
        this.firstInputText = firstInputText;
        this.currentInputText = currentInputText;
        this.clear();
    };

    clear() {
        this.currentInput = '';
        this.firstInput = '';
        this.operation = undefined;
    };

    delete() {
        this.currentInput = this.currentInput.toString().slice(0, -1)
    };

    inputNumber(number) {
        if (number === '.' && this.currentInput.includes('.')) return;
        this.currentInput = this.currentInput.toString() + number.toString();
    };

    inputOperation(operation) {
        if (this.currentInput === '') return;
        if (this.firstInput !== '') {
            this.compute()
        };
        this.operation = operation;
        this.firstInput = this.currentInput;
        this.currentInput = '';
    };

    compute() {
        let computation;
        const num1 = parseFloat(this.firstInput);
        const num2 = parseFloat(this.currentInput);
        if (isNaN(num1) || isNaN(num2)) return;
        switch (this.operation) {
            case '+':
                computation = num1 + num2;
                break;
            case '-':
                computation = num1 - num2;
                break;
            case '*':
                computation = num1 * num2;
                break;
            case '÷':
                computation = num1 / num2;
                break;
            default:
                return;
        };
        this.currentInput = computation;
        this.operation = undefined;
        this.firstInput = '';
        
    };

    inputDisplay() {
        this.currentInputText.innerText = this.currentInput;
    };
};

const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');
const firstInputText = document.querySelector('[data-first-input]');
const currentInputText = document.querySelector('[data-current-input]');

const calculator = new Calculator(firstInputText, currentInputText);

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.inputNumber(button.innerText);
        calculator.inputDisplay();
    });
});

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.inputOperation(button.innerText);
        calculator.inputDisplay();
    });
});

equalsBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.inputDisplay();
});

allClearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.inputDisplay();
});

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.inputDisplay();
});