async function selectionSort() {
    let menorIndice = -1;

    for (let i = 0; i < nums.length; i++) {
        incrementSpan("qtdStep")
        for (let j = i; j < nums.length; j++) {
            incrementSpan("qtdStep")
            setColor(j, iColor);
            if (delay != -1 || j % 50 == 0) {
                await sleep(delay);
            }
            incrementSpan("qtdComp");
            if (j == i || nums[j] < nums[menorIndice]) {
                if (menorIndice != -1) {
                    setColor(menorIndice, color);
                }
                setColor(j, pivotColor);
                menorIndice = j;
            } else {
                setColor(j, color);
            }
        }
        swapHeight(i, menorIndice);
        swapNums(i, menorIndice);
        incrementSpan("qtdSwap");
        setColor(menorIndice, color);
        setColor(i, sortedColor);
        menorIndice = -1;
    }
}
