var r = document.querySelector(":root");
var velocidade = document.getElementsByName("vel")[0];
var qtdLinha = document.getElementsByName("qtdLinha")[0];
var intensidade = document.getElementsByName("intensidade")[0];
var btnLigarDesligar = document.getElementById("switchLigaDesliga");
var colorsPosition;
var selectedCircleId;

const circlesPerRows = 30;
const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "lightblue",
  "blue",
  "purple",
];

colors.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

window.onload = () => {
  generateColors();
  generateList();
  renderRows();
};

velocidade.addEventListener("input", (e) => {
  //9 - velocidade.value -> inverte min e max do input range
  //(0.5 + 8.5 = 9; f(x) = 9 - x)
  r.style.setProperty("--velocidade", 9 - velocidade.value + "s");
});

qtdLinha.addEventListener("input", (e) => {
  renderRows();
});

intensidade.addEventListener("input", (e) => {
  r.style.setProperty("--intensidade", intensidade.value);
});

btnLigarDesligar.addEventListener("change", (e) => {
  document.querySelectorAll("#rows > div > .circle").forEach((e) => {
    e.classList.toggle("on");
  });
});

function generateColors() {
  let totalCircles = circlesPerRows * 7;
  colorsPosition = [];
  for (let i = 0; i < totalCircles; i++) {
    colorsPosition.push(colors.random());
  }
}

function generateList() {

  let dropdown = document.createElement("div");
  dropdown.className = "dropdown";

  colors.forEach((e) => {
    let btn = document.createElement("button");
    btn.className = e;
    btn.addEventListener("click", setColor);
    dropdown.appendChild(btn);
  });
  return dropdown;
}

function renderRows() {
  let rows = document.getElementById("rows");
  rows.replaceChildren();

  for (let i = 0; i < qtdLinha.value; i++) {
    let row = document.createElement("div");
    row.className = "row";

    for (let k = 0; k < circlesPerRows; k++) {
      let div = document.createElement("div");
      let color = colorsPosition[k + i * circlesPerRows];
      let status = "";

      if (btnLigarDesligar.checked) {
        status = " on";
      }

      div.className = "circle " + color + status;
      div.id = "circle" + (k + i * circlesPerRows);
      div.addEventListener("click", showColorList);
      div.appendChild(generateList());
      row.appendChild(div);
    }

    rows.appendChild(row);
  }
}

function showColorList(e) {
  if(e.target.classList.contains('circle')){
    removeAll();
    e.target.classList.add('selected');
    document.querySelector("#" + e.target.id +  " .dropdown").classList.toggle("show");
    selectedCircleId = e.target.id;
  }
}

function setColor(e) {
  let color = e.target.classList[0];
  let circle = e.target.parentElement.parentElement;
  let id = circle.id;  
  colorsPosition[id.slice(6)] = color;

  colors.forEach(e => {
    if(circle.classList.contains(e)){
      circle.classList.remove(e);
    }

    circle.classList.add(color);
  })
}

window.onclick = function(event) {
  if (!event.target.matches('#' + selectedCircleId)) {
    removeAll();
  }
}

function removeAll(){
  let dropdowns = document.getElementsByClassName("dropdown");
  let i;
  for (i = 0; i < dropdowns.length; i++) {
    let openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
    if(openDropdown.parentElement.classList.contains('selected')){
      openDropdown.parentElement.classList.remove('selected');
    }
  }
}