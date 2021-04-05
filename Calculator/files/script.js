let result = document.getElementById("result");
let lastOp = document.getElementById("lastOp");

let clearNext = false;
let firstEntry = null;
let lastEntry = null;
let lastResult = 0;
let currentOp = "";
let states = {
    firstState: 1,
    secondState: 2,
};
let calcState = states.firstState;

function operation(op) {
    if(result.value == "") return;
    switch (calcState) {
        case states.firstState:
            if (firstEntry == null || currentOp == "=")
                firstEntry = result.value;
            currentOp = op;
            lastOp.value = firstEntry + " " + currentOp;
            calcState = states.secondState;
            clearNext = true;
            break;
        case states.secondState:
            if (op != "=") {
                lastEntry = result.value;
                firstEntry = calc(firstEntry,lastEntry,currentOp);
                calcState = states.firstState;
                operation(op);
                clearNext = true;
            } else {
                lastEntry = result.value;
                lastResult = calc(firstEntry, lastEntry, currentOp);
                lastOp.value = firstEntry + " " + currentOp + " " + lastEntry + " =";
                result.value = lastResult;
                currentOp = "=";
                calcState = states.firstState;
            }
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
    if (currentOp === "") return;
    calcState = states.secondState;
    operation("=");
}

function changeSign() {
    result.value = -result.value;
}

function insertNum(num) {
    if (clearNext || (result.value === "0" && num != ".")) {
        result.value = "";
        clearNext = false;
    }

    if (currentOp == "=") {
        clearAll();
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
    result.value = "";
    clearNext = false;
    firstEntry = null;
    lastEntry = null;
    currentOp = "";
    lastResult = 0;
    calcState = states.firstState;
}

function clearLast() {
    result.value = "";
}
