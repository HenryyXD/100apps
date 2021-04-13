async function insertionSort() {
    let i, j, value;
    for (i = 0; i < nums.length; i++, incrementSpan("qtdStep")) {
        setColor(i, pivotColor);
        if (delay != -1 || j % 50 == 0) {
            await sleep(delay);
        }
        value = nums[i];
        j = i - 1;
        incrementSpan("qtdComp");
        while (j >= 0 && nums[j] > value) {
            setColor(j, iColor);
            swapNums(j, j + 1);
            swapHeight(j, j + 1);
            incrementSpan("qtdSwap");
            incrementSpan("qtdStep");
            setColor(j, color);
            if (delay != -1 || j % 50 == 0) {
                await sleep(delay);
            }
            j--;
            incrementSpan("qtdComp");
        }
        nums[j + 1] = value;
        setColor(i, color);
    }
    for (let i = 0; i < nums.length; i++) {
        setColor(i, orderedColor);
    }
    enableAllInputs();
}
