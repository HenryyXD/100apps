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

    if (calcState === states.firstState) {
        console.log(firstEntry, currentOp);
        if(firstEntry == null || currentOp == "=")
            firstEntry = result.value;
        currentOp = op;
        lastOp.value = firstEntry + " " + currentOp;
        calcState = states.secondState;
        result.value = "";
    } else if (calcState === states.secondState) {
        if(op != "="){
            lastEntry = result.value;
            console.log(lastEntry, firstEntry, lastResult);
            firstEntry = lastResult = calc(firstEntry, lastEntry, currentOp);
            calcState = states.firstState;
            console.log(lastEntry, firstEntry, lastResult);
            operation(op);
            result.value = "";
        }else{
            lastEntry = result.value;
            lastResult = calc(firstEntry, lastEntry, currentOp);
            lastOp.value = firstEntry + " " + currentOp + " " + lastEntry + " =";
            result.value = lastResult;
            currentOp = "=";
            calcState = states.firstState;
        }
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
    clearNext = false;
    firstEntry = null;
    lastEntry = null;
    currentOp = "";
    lastResult = 0;
    calcState = states.firstState;
}

function clearLast() {
    result.value = "0";
}
