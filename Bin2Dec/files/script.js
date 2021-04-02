function toDecimal(){
    var bin = document.getElementById("input").value;
    const regex = /^[0-1]+$/;
    let total = 0;
    if(!regex.test(bin)){
        alert("Este número não é binario");
    }else{
        
        for(let i = 0; bin > 0; i++){
            total += (bin%10) * Math.pow(2, i);
            bin = Math.floor(bin/10);
        }

        // total = bin.split('').reverse().reduce((total, n, i) => {
        //     total + n * Math.pow(2, i);
        // }, 0);

        alert(total);
    }
}