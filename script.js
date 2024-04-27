class Calculator {
  result = 0;
  currentValue = "0";
  operator = null;
  resultShown = false;
  previousOperator = null;
  previousValue = null;

  constructor() {
    this.updateDisplay();
    this.addEventListeners();
  }

  addEventListeners() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.textContent;
        if (!isNaN(value)) {
          if (this.resultShown) {
            this.currentValue = "0";
            this.resultShown = false;
          }
          this.handleNumericButton(value);
        } else if (
          value === "+" ||
          value === "-" ||
          value === "X" ||
          value === "/"
        ) {
          this.handleOperatorButton(value);
        } else if (value === ".") {
          this.handleDecimalButton();
        } else if (value === "C") {
          this.handleResetButton();
        } else if (value === "+-") {
          this.handleSignButton();
        } else if (value === "%") {
          this.handlePercentButton();
        } else if (value === "=") {
          this.handleResultButton();
        }
      });
    });
    console.log(buttons);
  }

  handleNumericButton(number) {
    if (this.currentValue === "0") {
      this.currentValue = number;
    } else {
      this.currentValue += number;
    }
    this.updateDisplay();
  }

  handleOperatorButton(operator) {
    if (this.operator !== null) {
      this.calculate();
      this.previousOperator = this.operator;
      this.previousValue = parseFloat(this.currentValue);
    } else {
      this.previousValue = parseFloat(this.currentValue);
    }
    this.operator = operator;
    this.result = parseFloat(this.currentValue);
    this.currentValue = "0";
  }

  handleDecimalButton() {
    if (!this.currentValue.includes(".")) {
      this.currentValue += ".";
    }
    this.updateDisplay();
  }

  handleResetButton() {
    this.currentValue = "0";
    this.result = 0;
    this.operator = null;
    this.resultShown = false;
    this.updateDisplay();
  }

  handleSignButton() {
    this.currentValue = (parseFloat(this.currentValue) * -1).toString();
    this.updateDisplay();
  }

  handlePercentButton() {
    this.currentValue = (parseFloat(this.currentValue) / 100).toString();
    this.updateDisplay();
  }

  handleResultButton() {
    if (this.operator !== null) {
      this.calculate();
      this.previousOperator = null;
      this.previousValue = 0;
      this.resultShown = true;
      this.updateDisplay();
    }
  }

  calculate() {
    const currentValue = parseFloat(this.currentValue);
    if (this.operator === "+") {
      this.result += currentValue;
    } else if (this.operator === "-") {
      this.result -= currentValue;
    } else if (this.operator === "X") {
      this.result *= currentValue;
    } else if (this.operator === "/") {
      this.result /= currentValue;
    } else if (this.operator === "%") {
      this.result %= currentValue;
    }

    this.currentValue = this.result.toString();
    this.operator = null;
  }
  updateDisplay() {
    const display = document.querySelector("#display");
    display.textContent = this.currentValue;
  }
}

let myCalculator = new Calculator();
