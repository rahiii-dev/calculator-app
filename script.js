class Calculator {
  constructor(output, previousOperand , currentOperand) {
    this.output = output;
    this.previousOperand = previousOperand;
    this.currentOperand = currentOperand;
    this.reset();
  }
  reset() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch(this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case 'x':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
       return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    this.output.innerHTML = this.previousOperand + this.currentOperand;
    if (this.operation != null) {
      this.output.innerHTML = `${this.previousOperand} ${this.operation} ${this.currentOperand}`;
    }
  }
}

const numbersBtn = document.querySelectorAll('.numbers');
const operatorsBtn = document.querySelectorAll('.operator');
const dleteBtn = document.querySelector('.delte_btn');
const resetBtn = document.querySelector('.rest_btn');
const equalsBtn = document.querySelector('.equals_btn');
const outputscrn = document.querySelector('.calculator_output');

let previousOperand = '';
let currentOperand = '';
const calculator = new Calculator(outputscrn, previousOperand, currentOperand);

numbersBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerHTML);
    calculator.updateDisplay();
  })
})

operatorsBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerHTML);
    calculator.updateDisplay();
  })
})

equalsBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})

resetBtn.addEventListener('click', () => {
  calculator.reset();
  calculator.updateDisplay();
  outputscrn.innerHTML = '<span class="blink">0</span>';
})

dleteBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})


// themes
const body = document.body;
const theme1 = document.getElementById("theme-1");
const theme2 = document.getElementById("theme-2");
const theme3 = document.getElementById("theme-3");

theme1.addEventListener("click", () => {
  themeChanger("theme-1", "theme-2", "theme-3");
});

theme2.addEventListener("click", () => {
  themeChanger("theme-2", "theme-1", "theme-3");
});

theme3.addEventListener("click", () => {
  themeChanger("theme-3", "theme-2", "theme-1");
});

function themeChanger(Dtheme, RthemeA, RthemeB) {
  if (body.classList.contains(RthemeA)) {
    body.classList.remove(RthemeA);
    body.classList.add(Dtheme);
  } else if (body.classList.contains(RthemeB)) {
    body.classList.remove(RthemeB);
    body.classList.add(Dtheme);
  }
}

const keypadBtn = document.querySelectorAll(".calculator_grid button");

keypadBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let targetBtn = e.target;
    targetBtn.animate(
      [{ transform: "scale(0.96)" }, { transform: "scale(1)" }],
      {
        // timing options
        duration: 200,
        fill: "forwards",
      }
    );
  });
});
