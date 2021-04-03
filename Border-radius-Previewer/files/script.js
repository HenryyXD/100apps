var cssText = document.getElementById('cssText');
var btnCopiar = document.getElementById('btn');

function func(){
    var tl = ~~document.getElementById('top-l').value;
    var tr = ~~document.getElementById('top-r').value;
    var bl = ~~document.getElementById('bottom-l').value;
    var br = ~~document.getElementById('bottom-r').value;
    var box = document.getElementById('box');
    btnCopiar.innerHTML = 'Copiar'; 
    btnCopiar.style.backgroundColor = 'whitesmoke';
    btnCopiar.style.color = 'black';
    
    box.style.borderTopLeftRadius = tl+"px";
    box.style.borderTopRightRadius = tr+"px";
    box.style.borderBottomLeftRadius = bl+"px";
    box.style.borderBottomRightRadius = br+"px";

    if(tl!=0 || tr!=0 || bl!=0 || br!=0){
        cssText.value = '#box{\n'
    }else{
        cssText.value = '';
        return alert('Não foi inserido nenhum valor!')
    }

    if(tl == tr && tl == bl && tl == br){
        cssText.value += '    border-radius:'+tl+'px;\n}';
    }else{
        if(tl!=0){
            cssText.value += '    border-top-left-radius:'+tl+'px;\n';
        }

        if(tr!=0){
            cssText.value += '    border-top-right-radius:'+tr+'px;\n';
        }

        if(bl!=0){
            cssText.value += '    border-bottom-left-radius:'+bl+'px;\n';
        }

        if(br!=0){
            cssText.value += '    border-bottom-right-radius:'+br+'px;\n';
        }

        cssText.value += '}';
    }

}

function copy(){
    cssText.select(); 
    document.execCommand("copy");
    btnCopiar.innerHTML = 'Copiado!';
    btnCopiar.style.backgroundColor = 'red';
    btnCopiar.style.color = 'white';
}