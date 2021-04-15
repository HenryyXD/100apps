async function bubbleSort() {
    let swap = false;
    for (let i = 0; i < nums.length; i++) {
        incrementSpan("qtdStep")
        for (let j = 0; j < nums.length - i - 1; j++) {
            incrementSpan("qtdStep")
            setColor(j, iColor);
            setColor(j + 1, iColor);
            if (delay != -1 || j % 50 == 0) {
                await sleep(delay);
            }
            incrementSpan("qtdComp");
            if (nums[j] > nums[j + 1]) {
                incrementSpan("qtdSwap");
                swapNums(j, j + 1);
                swapHeight(j, j + 1);
                swap = true;
            }
            setColor(j, color);
            setColor(j + 1, color);
        }
        if (!swap) {
            break;
        }
        setColor(nums.length - i - 1, sortedColor);
        swap = false;
    }
}
