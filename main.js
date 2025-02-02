let OPERAND_1;
let OPERAND_2;
let OPERATOR;

const calculatorKeys = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", "C", "=", "+"]
];


function initLayoutContainers() {
    const menu = document.createElement("div");
    menu.className = "menu";
    document.body.appendChild(menu);

    const header = document.createElement("h1");
    header.textContent = "CALCULATOR";
    menu.appendChild(header);

    const container = document.createElement("div");
    container.className = "container";
    document.body.appendChild(container);

}

//each row below display will contain 4 rows with 4 buttons
function initRows(keysArray) {
    const container = document.querySelector(".container");
    for (let i = 0; i<keysArray.length; i++) {
        const row = document.createElement("div");
        row.className = "row";
        initButtons(row, calculatorKeys[i]);
        container.appendChild(row);
    }
}

function initButtons(rowElem, keyArray) {
    for (let i = 0; i<keyArray.length; i++) {
        const button = document.createElement("button");
        button.textContent = keyArray[i];
        rowElem.appendChild(button);
    }
}

function initInputLayout() {
    const display = document.createElement("div");
    display.id = "display";
    const container = document.querySelector(".container");
    container.appendChild(display);
}

function add(x, y) {
    return x+y;
}

function subtract(x,y) {
    return x-y;
}

function multiply(x,y) {
    return x*y;
}

function divide(x,y) {
    return (x/y).toFixed(2);
}

function operate(num1, num2, operator) {
    num1 = Number(num1);  
    num2 = Number(num2);
    let result;

    switch (operator) {
        case "-":
            result = divide(num1, num2);
            break;
        case "+":
            result = add(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
        default:
            clearDisplay();
            throw new Error(`${operator} is not a valid operator.`);
        
    }

    clearDisplay();
    populateDisplay(result);
    OPERAND_1 =result;   
}


//this function clears the display
function clearDisplay() {
    OPERAND_1 = null;
    OPERAND_2 = null;
    OPERATOR = null;

    const display = document.querySelector("#display");
    display.textContent = "";
}
function populateDisplay(value) {
    const display = document.querySelector("#display");
    display.textContent = display.textContent + value;
}


function populateGlobalOperand(value) {
    if (OPERAND_1 == null) {
        OPERAND_1 = value;  
    } else if (OPERATOR == null) {
        OPERAND_1 += value; 
    } else if (OPERAND_2 == null) {
        OPERAND_2 = value;  
    } else {
        OPERAND_2 += value; 
    }
}

function main() {
    initLayoutContainers();
    
    initInputLayout();
    initRows(calculatorKeys);

    document.addEventListener("click", (event) => {
        const value = event.target.textContent.trim(); // Get text content safely
    
        if (/^\d+$/.test(value)) {  // Check if it's a number
            populateGlobalOperand(value);
            populateDisplay(value);

        } else if (["+", "-", "*", "/"].includes(value)) { // Check if it's an operator
            if (OPERATOR) {
                throw new Error("Only one operator is allowed in the expression");
            }
            OPERATOR = value;
            populateDisplay(value);

        } else if (value === "C") { // Clear button
            clearDisplay();
        } else if (value === "=") { // Equals button
            if (OPERAND_1 != null && OPERAND_2 != null && OPERATOR) {
                operate(OPERAND_1, OPERAND_2, OPERATOR);
            } else {
                console.error("Cannot calculate: Missing OPERAND_1, OPERAND_2, or OPERATOR");
            }
        }
    });
}

main();