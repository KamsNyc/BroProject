const display = document.querySelector("#display h1");
const buttons = document.querySelectorAll(".numbers");
let decimalAdded = false;
let operation = null;
let currentValue = null;
let previousValue = null;

buttons.forEach(button => {
    button.addEventListener("click", function() {
        const buttonValue = this.innerHTML;

        if (buttonValue === "CLR") {
            clear();
            return;
        }

        if (buttonValue === ".") {
            if (decimalAdded) return;
            decimalAdded = true;
        }

        if (["+", "-", "x", "/"].includes(buttonValue)) {
            if (currentValue === null) return;
            if (previousValue !== null) calculate();
            operation = buttonValue;
            previousValue = currentValue;
            currentValue = null;
            decimalAdded = false;
            return;
        }

        if (buttonValue === "=") {
            if (currentValue === null || previousValue === null || operation === null) return;
            calculate();
            return;
        }

        currentValue = currentValue === null ? buttonValue : currentValue + buttonValue;
        display.innerHTML = currentValue;
    });
});

function calculate() {
    let result;
    switch (operation) {
        case "+":
            result = parseFloat(previousValue) + parseFloat(currentValue);
            break;
        case "-":
            result = parseFloat(previousValue) - parseFloat(currentValue);
            break;
        case "x":
            result = parseFloat(previousValue) * parseFloat(currentValue);
            break;
        case "/":
            result = parseFloat(previousValue) / parseFloat(currentValue);
            break;
    }
    display.innerHTML = result;
    currentValue = result.toString();
    previousValue = null;
    operation = null;
    decimalAdded = false;
}

function clear() {
    display.innerHTML = "0";
    currentValue = null;
    previousValue = null;
    operation = null;
    decimalAdded = false;
}
