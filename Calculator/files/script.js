let result = document.getElementById("result");
let lastOp = document.getElementById("lastOp");

let clearNext = false;
let firstEntry = null;
let lastEntry = null;
let lastResult = 0;
let currentOp = "";
let states = {
    firstOperation: 1,
    secondOperation: 2,
    thirdOperation: 3,
};
let calcState = states.firstOperation;

function operation(op) {

    if (calcState === states.firstOperation) {
        firstEntry = result.value;
        currentOp = op;
    } else if (calcState === states.secondOperation) {
        lastEntry = result.value;
        lastResult = calc(firstEntry, lastEntry, currentOp);
    } else if (calcState === states.thirdOperation) {
        firstEntry = lastResult;
        lastEntry = result.value;
        currentOp = op;
        lastResult = calc(firstEntry, lastEntry, currentOp);
    }

    renderInput();
    clearNext = true;
}

function renderInput() {
    switch (calcState) {
        case states.firstOperation:
            lastOp.value = firstEntry + " " + currentOp;
            calcState = states.secondOperation;
            break;
        case states.secondOperation:
            lastOp.value = firstEntry + " " + currentOp + " " + lastEntry + " =";
            result.value = lastResult;
            calcState = states.thirdOperation;
            break;
        case states.thirdOperation:
            lastOp.value = firstEntry + " " + currentOp + " " + lastEntry + " =";
            result.value = lastResult;
            break;
    }
}

function calc(n1, n2, op) {
    let qtdDec = Math.max(countDecimals(n1), countDecimals(n2));
    qtdDec = qtdDec > 3 ? 3 : qtdDec;
    [n1, n2] = [n1, n2].map(Number);
    switch (op) {
        case "+":
            return (n1 + n2).toFixed(qtdDec);
        case "-":
            return (n1 - n2).toFixed(qtdDec);
        case "*":
            return (n1 * n2).toFixed(qtdDec);
        case "/":
            return (n1 / n2).toFixed(qtdDec);
    }
}

function countDecimals(value) {
    if (!value.toString().includes(".")) return 0;
    return value.toString().split(".")[1].length || 0;
}

function equals() {
    if (lastOp.value === "") return;
}

function changeSign() {
    result.value = -result.value;
}

function insertNum(num) {
    if (clearNext || (result.value === "0" && num != ".")) {
        result.value = "";
        clearNext = false;
    }

    if (!result.value.includes(".") && result.value.length < 8) {
        result.value += num;
    } else {
        let indexDot = result.value.indexOf(".");
        if (result.value.length - indexDot < 4) {
            result.value += num;
        }
    }
}

function insertDecimal() {
    if (!result.value.includes(".")) result.value += ".";
}

function clearAll() {
    lastOp.value = "";
    result.value = "0";
    calcState = states.firstOperation;
}

function clearLast() {
    if (calcState == states.thirdOperation) {
        result.value = lastEntry;
        calcState = states.firstOperation;
        operation(currentOp);
    } else {
        result.value = "0";
    }
}
