const display = document.getElementById("display");
const expression = document.getElementById("expression");
const keys = document.querySelector(".keys");

let current = "0";
let previous = "";
let operator = "";
let reset = false;

keys.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const { value, action } = btn.dataset;

  if (value) {
    ["+", "-", "*", "/"].includes(value)
      ? chooseOperator(value)
      : appendNumber(value);
  }

  if (action === "clear") resetCalculator();
  if (action === "delete") deleteNumber();
  if (action === "calculate") calculate();

  updateDisplay();
});

function appendNumber(val) {
  if (val === "." && current.includes(".")) return;

  if (reset) {
    current = val === "." ? "0." : val;
    reset = false;
  } else {
    current = current === "0" && val !== "." ? val : current + val;
  }
}

function chooseOperator(op) {
  if (operator && !reset) calculate();

  previous = current;
  operator = op;
  reset = true;
}

function calculate() {
  if (!operator || reset) return;

  const a = Number(previous);
  const b = Number(current);

  const operations = {
    "+": a + b,
    "-": a - b,
    "*": a * b,
    "/": b === 0 ? "Error" : a / b,
  };

  const result = operations[operator];

  current = result === "Error" ? result : round(result);

  expression.textContent = `${previous} ${formatOp(operator)} ${b} =`;

  previous = "";
  operator = "";
  reset = true;
}

function deleteNumber() {
  if (reset || current === "Error") {
    current = "0";
    reset = false;
  } else {
    current = current.length === 1 ? "0" : current.slice(0, -1);
  }
}

function resetCalculator() {
  current = "0";
  previous = "";
  operator = "";
  reset = false;
  expression.textContent = "0";
}

function updateDisplay() {
  display.textContent = current;

  if (operator) {
    expression.textContent = `${previous} ${formatOp(operator)}`;
  } else if (!expression.textContent.endsWith("=")) {
    expression.textContent = current;
  }
}

function formatOp(op) {
  return op === "*" ? "×" : op === "/" ? "÷" : op;
}

function round(num) {
  return String(Math.round((num + Number.EPSILON) * 1e9) / 1e9);
}

updateDisplay();