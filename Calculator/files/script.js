let result = document.getElementById("result");
let lastOp = document.getElementById("lastOp");

let clearNext = false;
let lastResult = 0;

function operation(op){

    switch(op){
        case '+':
            if(lastOp.value === ""){
                lastOp.value = result.value + " +";
            }else if(lastOp.value[lastOp.value.length - 1] !== "="){
                lastOp.value = lastOp.value + " " + result.value + " =";
                let str = lastOp.value.split(" ");
                result.value = lastResult = calc(str[0], str[2], str[1]);
                console.log(lastResult);
            }else{
                console.log(lastResult);
                lastOp.value = lastResult + " + " + result.value + " =";
                let str = lastOp.value.split(" ");
                result.value = calc(str[0], str[2], str[1]);
                result.value = lastResult = calc(str[0], str[2], str[1]);
            }
            clearNext = true;
            break;
            
        case '-':


            break;
        case '*':
    
            break;
        case '/':

            break;
    }
}

function calc(n1, n2, op){
    switch(op){
        case '+': return Number(n1) + Number(n2);
        case '-': return Number(n1) - Number(n2);
        case '*': return Number(n1) * Number(n2);
        case '/': return Number(n1) / Number(n2);
    }
}

function equals(){
    if(lastOp.value === "")
        return;
}

function changeSign(){
    result.value = -result.value;
}

function insertNum(num){
    if(clearNext || result.value === "0" && num != "."){
        result.value = "";
        clearNext = false;
    }

    if(!result.value.includes(".") && result.value.length < 8){
        result.value += num;
    }else{
        let indexDot = result.value.indexOf(".");
        if(result.value.length - indexDot < 4){
            result.value += num;
        }
    }
}

function insertDecimal(){
    if(!result.value.includes("."))
        result.value += ".";
}

function clearAll(){
    lastOp.value = "";
    result.value = "0";
}

function clearLast(){
    result.value = "0";
}