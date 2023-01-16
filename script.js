// Class with the methods to use a calculator logic
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    // Allows the calculator to be empty on initialization
    this.clear();
  }
  // Method clearing the calculator screen and erasing all operations
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }
  // Deletes the last character of the screen
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  // Method to turn into string and be able to concatenate the numbers for final result
  appendNumber(number) {
    // Checks if there's a dot already
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  // Method to decide which operation to realize and checking if it has something to work with
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    // Checks if there're numbers typed and computes the values of an operation
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  // Method to split number every three digits and be able to put decimals alone
  getDisplayNumber(number) {
    const stringNum = number.toString();
    const integerDigits = parseFloat(stringNum.split(".")[0]);
    const decimalDigits = stringNum.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      // Updates the previous operand and appends the operation selected next to it
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

// Selecting the buttons to be used with their data attribute
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-allclear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// Creates a new calculator
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// Event listener on every button with the number data attribute
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    // console.log(button.innerText)
    calculator.updateDisplay();
  });
});

// Event listener on every button with the operation data attribute
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// Event listener on the equal button
equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

// Event listener on the AC button
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

// Event listener on the delete button
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
