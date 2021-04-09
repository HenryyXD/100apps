async function selectionSort() {
    let menorIndice = -1,
        minorColor = "red",
        tempHeight;

    for (let i = 0; i < nums.length; i++, incrementSpan("qtdStep")) {
        for (let j = i; j < nums.length; j++, incrementSpan("qtdStep")) {
            setColor(j, iColor);
            if (delay != -1 || j % 50 == 0) {
                await sleep(delay);
            }
            incrementSpan("qtdComp");
            if (j == i || nums[j] < nums[menorIndice]) {
                if (menorIndice != -1) {
                    setColor(menorIndice, color);
                }
                setColor(j, minorColor);
                menorIndice = j;
            } else {
                setColor(j, color);
            }
        }
        swapHeight(i, menorIndice);
        incrementSpan("qtdSwap");
        swapNums(i, menorIndice);
        setColor(menorIndice, color);
        setColor(i, orderedColor);
        menorIndice = -1;
    }

    enableAllInputs();
}
