//CONSTANT BUTTONS AND INPUT FIELD VARIABLE(S)
const displayResult = document.getElementById("result");
const displayNumber = document.getElementById("num");
const displaySymbol = document.getElementById("sym");

//VARIABLE(S)
let prevNumber = "";
let calculationOperator = "";
let currentNumber = "0";

//FUNCTION(S)
function updateScreen(result, number) {
    if(result == "") {
        displayResult.innerHTML = "0";
    }
    else if(result != "0") {
        displayResult.innerHTML = result;
    }
    displayNumber.innerHTML = number;
}
function updateSymbol(symbol) {
    displaySymbol.innerHTML = symbol;
}
function inputNumber(number) {
    if(currentNumber == "0") {
        currentNumber = number;
    }
    else {
        currentNumber += number;
        // if(currentNumber.length < 16) {
        //     currentNumber += number;
        // }
        // else {
        //     alert("Maksimum 16 digit!");
        // }
    }
}
function inputOperator(operator) {
    if(calculationOperator == "") {
        prevNumber = currentNumber;
    }
    else if(prevNumber != "0" && currentNumber != "0") {
        const tempNumber = currentNumber;
        calculate();
        prevNumber = currentNumber;
        updateScreen(currentNumber, tempNumber);
    }
    calculationOperator = operator;
    currentNumber = "";
}
function calculate() {
    let result = "";
    switch(calculationOperator) {
        case "+" :
            result = Number(prevNumber) + Number(currentNumber);
            break;
        case "-" :
            result = Number(prevNumber) - Number(currentNumber);
            break;
        case "x" :
            result = Number(prevNumber) * Number(currentNumber);
            break;
        case "÷" :
            result = Number(prevNumber) / Number(currentNumber);
            break;
        default :
            break;
    }
    currentNumber = result;
    calculationOperator = "";
}
function calculatePercentage() {
    let result = "";
    let percentage = Number(prevNumber) * Number(currentNumber) / 100;
    switch(calculationOperator) {
        case "+" :
            result = Number(prevNumber) + percentage;
            break;
        case "-" :
            result = Number(prevNumber) - percentage;
            break;
        case "x" :
            result = Number(prevNumber) * percentage;
            break;
        case "÷" :
            result = Number(prevNumber) / percentage;
            break;
        default :
            break;
    }
    currentNumber = result;
    calculationOperator = "";
    return percentage;
}
function clear() {
    prevNumber = "";
    calculationOperator = "";
    currentNumber = "0";
    updateScreen("","");
    updateSymbol("");
}

//BUTTON(S) ASSIGNMENTS
//NUMBER BUTTONS
const numbers = document.querySelectorAll("#number");
numbers.forEach((number) => {
    number.addEventListener("click", (res) => {
        inputNumber(res.target.innerHTML);
        updateScreen("0", currentNumber);
    })
})

//OPERATOR BUTTONS
const symbols = document.querySelectorAll("#symbol");
symbols.forEach((symbol) => {
    symbol.addEventListener("click", (res) => {
        inputOperator(res.target.innerHTML);
        updateSymbol(res.target.innerHTML);
    })
})

//AC, BACKSPACE, DECIMAL, EQUAL, PERCENTAGE BUTTON
const ac = document.getElementById("ac");
const backspace = document.getElementById("backspace");
const equal = document.getElementById("equal");
const decimal = document.getElementById("decimal");
const percentage = document.getElementById("percentage");

ac.addEventListener("click", () => {
    clear();
})

backspace.addEventListener("click", () => {
    if(displayNumber.innerHTML != "") {
        currentNumber = currentNumber.slice(0, currentNumber.length - 1);
        updateScreen("0", currentNumber);
    }
})

decimal.addEventListener("click", () => {
    if(currentNumber.includes(".")) {
        return;
    }
    currentNumber += ".";
    updateScreen("0", currentNumber);
})

equal.addEventListener("click", () => {
    if(calculationOperator == "") {
        return;
    }
    calculate();
    updateScreen(currentNumber, "");
    calculationOperator = "";
    updateSymbol(calculationOperator);
})

percentage.addEventListener("click", (res) => {
    console.log(`prevNumber: ${prevNumber}`);
    console.log(`currentNumber: ${currentNumber}`);
    if(prevNumber == "") {
        clear();
    }
    else {
        const prev = calculatePercentage();
        updateScreen(currentNumber, prev);
    }
})