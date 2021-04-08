async function selectionSort(){
    let menorIndice = -1, 
    color = canvas.firstChild.style.background, 
    iColor = "darkred", 
    minorColor = "red", 
    orderedColor = "green",
    temp, 
    tempHeight;

    for(let i = 0; i < nums.length; i++, incrementSpan("qtdStep")){
        for(let j = i; j < nums.length; j++, incrementSpan("qtdStep")){
            canvas.childNodes[j].style.background = iColor;

            if(delay != 0 || j % 50 == 0){
                await sleep(delay);
            }

            incrementSpan("qtdComp");
            if(j == i || nums[j] < nums[menorIndice]){
                if(menorIndice != -1){
                    canvas.childNodes[menorIndice].style.background = color;
                }
                canvas.childNodes[j].style.background = minorColor; 
                menorIndice = j;
            }else{
                canvas.childNodes[j].style.background = color;
            }
        }

        incrementSpan("qtdSwap");
        temp = nums[i];
        tempHeight = canvas.childNodes[i].style.height;

        nums[i] = nums[menorIndice];
        canvas.childNodes[i].style.height = canvas.childNodes[menorIndice].style.height;

        nums[menorIndice] = temp;
        canvas.childNodes[menorIndice].style.height = tempHeight;

        canvas.childNodes[menorIndice].style.background = color;
        canvas.childNodes[i].style.background = orderedColor;
        menorIndice = -1;
    }

    enableAllInputs();
}
