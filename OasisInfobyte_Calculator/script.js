document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".buttons button");

  let currentInput = "";
  let result = "";

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const value = button.dataset.value;
      handleInput(value);
    });
  });

  function handleInput(value) {
    switch (value) {
      case "=":
        calculate();
        break;
      case "clear":
        clear();
        break;
      case "delete":
        deleteLast();
        break;
      case "±":
        toggleSign();
        break;
      case "√":
        calculateSqrt();
        break;
      case "log":
        calculateLog();
        break;
      default:
        updateDisplay(value);
        break;
    }
  }

  function updateDisplay(value) {
    if (value === "." && currentInput.includes(".")) {
      return;
    }
    currentInput += value;
    display.value = currentInput;
  }

  function calculate() {
    try {
      result = eval(currentInput);
      if (result === 0) {
        display.value = "0";
      } else {
        display.value = result;
      }
      currentInput = result.toString();
    } catch (error) {
      display.value = "Error";
      clear();
    }
  }

  function clear() {
    display.value = "";
    currentInput = "";
    result = "";
  }

  function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  }

  function toggleSign() {
    if (currentInput.startsWith("-")) {
      currentInput = currentInput.slice(1);
    } else {
      currentInput = "-" + currentInput;
    }
    display.value = currentInput;
  }

  function calculateSqrt() {
    try {
      currentInput = parseFloat(currentInput);
      result = Math.sqrt(currentInput);
      display.value = result;
      currentInput = result.toString();
    } catch (error) {
      display.value = "Error";
      clear();
    }
  }

  function calculateLog() {
    try {
      result = Math.log(eval(currentInput));
      display.value = result;
      currentInput = result.toString();
    } catch (error) {
      display.value = "Error";
      clear();
    }
  }
  // Keyboard support
  document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (/[0-9()+\-*/.=]|Enter|Backspace|Delete|\.|x/.test(key)) {
      if (key === "Enter" || key === "=") {
        handleInput("=");
      } else if (key === "x" || key === "*") {
        handleInput("*");
      } else if (key === "Backspace" || key === "Delete") {
        handleInput("delete");
      } else {
        handleInput(key);
      }
    }
  });
});
