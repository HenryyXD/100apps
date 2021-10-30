(function () {
  const people = new Array(100).fill(null).map((val, i) => ({
    name: "Nome" + i + " Sobrenome",
    street: "Rua" + i,
    city: "Cidade" + i,
    state: "Estado" + i,
    country: "País" + i,
    telephone: "(99) 99999-9999",
    birthday: new Date().toLocaleString("pt-BR", {
      month: "long",
      day: "numeric",
    }),
  }));

  var selectedId;

  function generateList() {
    let listTemplate = `
      <ul>
        ${people
          .map((p, i) => `<li id='${i}'>${p.name.split(" ")[0]}</li>`)
          .join("")}
      </ul>
    `;

    document.getElementById("lista").innerHTML = listTemplate;
    let ulChildren = document.querySelector("#lista > ul").children;
    for (li of ulChildren) {
      li.addEventListener("click", update);
    }
  }

  function update(e) {
    selectedId = e.target.id;
    document.getElementById("conteudo").innerHTML = template();
    changeActiveItem(selectedId);
  }

  function changeActiveItem(id) {
    ul = document.querySelector("#lista > ul");
    for (let i = 0; i < ul.children.length; i++) {
      let li = ul.children[i];
      if (li.classList.contains("active")) {
        li.classList.remove("active");
      }
    }
    document.getElementById(id).classList.add("active");
  }

  function template() {
    let p = people[selectedId];
    return `
    <div class="person">
      <h2>${p.name}</h2>
      <h3>- Cidade: ${p.city}</h3>
      <h3>- Estado: ${p.state}</h3>
      <h3>- País: ${p.country}</h3>
      <h3>- Telefone: ${p.telephone}</h3>
      <h3>- Aniversário: ${p.birthday}</h3>
    
    </div>`;
  }

  generateList();
})();