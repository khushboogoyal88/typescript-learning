class Calculator {
    previousOperandTextElement;
    currentOperandTextElement;
    currentOperand: string;
    previousOperand: string;
    operation: string;
    constructor(previousOperandTextElement, currentOperandTextElement,)  {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    
    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1)
    }
    
    appendNumber(number:string) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand + number
    }
    
    chooseOperation(operation: string) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    
    compute() {
        let computation: number;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
            computation = prev + current
            break
            case '-':
            computation = prev - current
            break
            case '*':
            computation = prev * current
            break
            case '÷':
            computation = prev / current
            break
            default:
            return
        }
        this.currentOperand = computation.toString();
        this.operation = undefined
        this.previousOperand = ''
    }
    
    getDisplayNumber(number:string) {
        const integerDigits = parseFloat(number.split('.')[0])
        const decimalDigits = number.split('.')[1]
        let integerDisplay: string;
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    
    updateDisplay() {
        this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll<HTMLElement>('[data-number]');
const operationButtons = document.querySelectorAll<HTMLElement>('[data-operation]');
const equalsButton: HTMLElement = document.querySelector('[data-equals]')
const allClearButton: HTMLElement = document.querySelector('[data-clear]')
const previousOperandTextElement:HTMLElement= document.querySelector('[data-previous-operand]')
const currentOperandTextElement: HTMLElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
