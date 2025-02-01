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

function main() {
    initLayoutContainers();
    
    initInputLayout();
    initRows(calculatorKeys);
}

main();