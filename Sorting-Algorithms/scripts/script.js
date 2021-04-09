let qtdNum = document.getElementById("qtdNum");
let velAlgo = document.getElementById("vel");
let algo = document.getElementById("algoSelector");
let canvas = document.getElementById("canvas");
let generateType = document.getElementById("generateType");
let nums = [];
let delay, escala;
let iColor = "darkred",
    orderedColor = "green",
    color;

window.onload = createNums();

function createNums() {
    removeAllChilds(canvas);
    nums = [];

    for (let i = 0; i < qtdNum.value; i++) {
        nums[i] = Math.floor(Math.random() * 500 + 1);
    }

    let escala = Math.max(...nums);

    for (let num of nums) {
        let div = document.createElement("div");
        div.style.height = (num * 90) / escala + "%";
        canvas.appendChild(div);
    }

    color = canvas.firstChild.style.background;
}

function removeAllChilds(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function sort() {
    clearSpans();
    disableAllInputs();
    delay = getDelay();
    switch (algo.value.toLowerCase()) {
        case "selection":
            selectionSort();
            break;
        case "bubble":
            bubbleSort();
            break;
    }
}

function disableAllInputs() {
    qtdNum.disabled = true;
    velAlgo.disabled = true;
    algo.disabled = true;
    generateType.disabled = true;
    document.querySelectorAll("button").forEach((element) => {
        element.disabled = true;
    });
}

function enableAllInputs() {
    qtdNum.disabled = false;
    velAlgo.disabled = false;
    algo.disabled = false;
    generateType.disabled = false;
    document.querySelectorAll("button").forEach((element) => {
        element.disabled = false;
    });
}

function getDelay() {
    switch (Number(velAlgo.value)) {
        case 1:
            return 1000;
        case 2:
            return 200;
        case 3:
            return 50;
        case 4:
            return 0;
        case 5:
            return -1;
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function incrementSpan(elementID) {
    document.getElementById(elementID).innerHTML =
        Number(document.getElementById(elementID).innerHTML) + 1;
}

function clearSpans() {
    document.querySelectorAll("span").forEach((element) => {
        element.innerHTML = "0";
    });
}

function swapNums(index1, index2) {
    [nums[index1], nums[index2]] = [nums[index2], nums[index1]];
}

function swapHeight(index1, index2) {
    let temp = canvas.childNodes[index1].style.height;
    canvas.childNodes[index1].style.height = canvas.childNodes[index2].style.height;
    canvas.childNodes[index2].style.height = temp;
}

function setColor(index, color) {
    canvas.childNodes[index].style.background = color;
}
