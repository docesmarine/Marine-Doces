let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

/* Salvar e atualizar */
function salvar() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizar();
}

/* Adicionar produto */
function adicionar(botao) {
  const card = botao.parentElement;

  const sabor = card.querySelector(".sabor").value;
  const tamanhoSelect = card.querySelector(".tamanho");
  const tamanho = tamanhoSelect.value;
  const preco = Number(tamanhoSelect.selectedOptions[0].dataset.preco);
  const nutella = card.querySelector(".nutella").checked;

  const total = preco + (nutella ? 5 : 0);

  carrinho.push({
    nome: "Copo da Felicidade",
    sabor,
    tamanho,
    nutella,
    total
  });

  salvar();
  abrirCarrinho();
}

/* Renderizar carrinho */
function renderizar() {
  const lista = document.getElementById("lista");
  const totalEl = document.getElementById("total");

  lista.innerHTML = "";
  let soma = 0;

  carrinho.forEach((item, index) => {
    soma += item.total;

    lista.innerHTML += `
      <li class="item-carrinho">
        <div class="info">
          <b>${item.nome}</b><br>
          ${item.sabor} • ${item.tamanho} ${item.nutella ? "+ Nutella" : ""}
          <br><span class="preco">R$ ${item.total}</span>
        </div>

        <button class="remover" onclick="removerItem(${index})">✖</button>
      </li>
    `;
  });

  totalEl.innerText = "Total: R$ " + soma;
}

/* Remover item */
function removerItem(index) {
  carrinho.splice(index, 1);
  salvar();
}

/* Abrir carrinho */
function abrirCarrinho() {
  document.getElementById("carrinho").classList.add("ativo");
  document.getElementById("overlay").style.display = "block";
}

/* Fechar carrinho */
function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("ativo");
  document.getElementById("overlay").style.display = "none";
}

/* Finalizar pedido */
function finalizar() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio 😅");
    return;
  }

  let msg = "🍰 Pedido - Doceria da Aryane:%0A%0A";

  carrinho.forEach((p, i) => {
    msg += `${i + 1}. ${p.nome}%0A`;
    msg += `• Sabor: ${p.sabor}%0A`;
    msg += `• Tamanho: ${p.tamanho}%0A`;
    msg += `• Nutella: ${p.nutella ? "Sim" : "Não"}%0A`;
    msg += `• Valor: R$ ${p.total}%0A%0A`;
  });

  const totalPedido = carrinho.reduce((acc, p) => acc + p.total, 0);
  msg += `💰 Total: R$ ${totalPedido}`;

  window.open("https://wa.me/+5512982153106?text=" + msg);
}

/* Inicializar */
renderizar();
