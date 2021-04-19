async function mergeSort(inicio = 0, fim = nums.length - 1) {
    incrementSpan("qtdComp");
    if (inicio < fim) {
        let meio = Math.floor((inicio + fim) / 2);
        await mergeSort(inicio, meio);
        await mergeSort(meio + 1, fim);
        await merge(inicio, meio, fim);
    }
}

async function merge(inicio, meio, fim) {
    let left = nums.slice(inicio, meio + 1),
        right = nums.slice(meio + 1, fim + 1);
    let leftIterator = 0,
        rightIterator = 0;
    let leftIsOver = false,
        rightIsOver = false;

    for (let i = inicio; i <= fim; i++) {
        setColor(inicio + leftIterator, iColor);
        setColor(meio + 1 + rightIterator, iColor);

        if (delay != -1 || i % 5 == 0) {
            await sleep(delay);
        }

        setColor(inicio + leftIterator, color);
        setColor(meio + 1 + rightIterator, color);

        if (leftIsOver) {
            incrementSpan("qtdComp");
            nums[i] = right[rightIterator++];
        } else if (rightIsOver) {
            incrementSpan("qtdComp", 2);
            nums[i] = left[leftIterator++];
        } else {
            incrementSpan("qtdComp", 3);
            if (left[leftIterator] < right[rightIterator]) {
                nums[i] = left[leftIterator];
                if (leftIterator + 1 === left.length) {
                    leftIsOver = true;
                } else {
                    leftIterator++;
                }
            } else {
                nums[i] = right[rightIterator];
                if (rightIterator + 1 === right.length) {
                    rightIsOver = true;
                } else {
                    rightIterator++;
                }
            }
        }
        incrementSpan("qtdStep");
    }

    for (let i = inicio; i <= fim; i++) {
        setColor(i, sortedColor);
        canvas.childNodes[i].style.height = (nums[i] * 90) / escala + "%";
        if (delay != -1 || i % 3 == 0) {
            await sleep(delay * 0.75);
        }
        incrementSpan("qtdSwap");
    }

    for (let i = inicio; i <= fim; i++) {
        setColor(i, color);
    }
}
