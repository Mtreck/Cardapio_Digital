let carrinho = [];
const modalCarrinho = document.getElementById("modal-carrinho");
const itensCarrinho = document.getElementById("itens-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const botaoCarrinho = document.getElementById("carrinho");
const fecharModal = document.querySelector(".close");
const btnContinuar = document.querySelector(".btn-continuar");

window.addEventListener('load', function() {
    // Recuperar os produtos cadastrados do localStorage
    let produtosCadastrados = JSON.parse(localStorage.getItem('produtos')) || [];
 
    console.log(produtosCadastrados); // Adicione esse log para verificar os dados
 
    // Selecionar os locais onde vamos exibir os produtos de cada categoria
    const listaBurgues = document.getElementById('burgues_list');
    const listaPorcao = document.getElementById('porcao_list');
    const listaBebidas = document.getElementById('Bebidas_list');
 
    // Limpar os elementos de lista antes de adicionar os novos produtos
    listaBurgues.innerHTML = '';
    listaPorcao.innerHTML = '';
    listaBebidas.innerHTML = '';
 
    // Exibir os produtos cadastrados nas respectivas categorias
    produtosCadastrados.forEach(produto => {
        const produtoHTML = `
            <div class="produtos">
                <img class="img_produto" src="${produto.imagem}" alt="${produto.nome}">
                <h4>${produto.nome}</h4>
                <p>${produto.descricao}</p>
                <h3 class="titulo_preco">R$ ${produto.valor.toFixed(2)}</h3>
                <button class="btn_compra" data-nome="${produto.nome}" data-preco="${produto.valor}">Adicionar+</button>
            </div>
        `;
     
        if (produto.categoria === 'Burguer') {
            listaBurgues.innerHTML += produtoHTML;
        } else if (produto.categoria === 'Porção') {
            listaPorcao.innerHTML += produtoHTML;
        } else if (produto.categoria === 'Bebida') {
            listaBebidas.innerHTML += produtoHTML;
        } else {
            console.log('Categoria não reconhecida:', produto.categoria);
            // Exemplo de exibição de alerta
            alert(`Categoria não reconhecida: ${produto.categoria}`);
        }
    });

    // Adicionar evento para os botões "Adicionar"
    const botoesCompra = document.querySelectorAll(".btn_compra");
    botoesCompra.forEach(botao => {
        botao.addEventListener("click", () => {
            let produtoNome = botao.getAttribute("data-nome");
            let produtoPreco = parseFloat(botao.getAttribute("data-preco"));
            adicionar(produtoNome, produtoPreco);
        });
    });
    
    // Adicionar evento para abrir o carrinho
    botaoCarrinho.addEventListener("click", function() {
        modalCarrinho.style.display = "flex"; // Mostrar o modal
    });

    // Adicionar evento para fechar o modal
    fecharModal.addEventListener("click", function() {
        modalCarrinho.style.display = "none"; // Fechar o modal
    });

    // Adicionar evento para continuar a compra sem alert
    btnContinuar.addEventListener("click", function() {
        modalCarrinho.style.display = "none"; // Fechar o modal ao continuar
    });
});
 
// Função para adicionar um item ao carrinho
function adicionar(nome, preco) {
    let item = carrinho.find(produto => produto.nome === nome);
    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    let total = 0;
    let quantidadeTotal = 0; // Contador correto
    itensCarrinho.innerHTML = "";

    carrinho.forEach((produto, index) => {
        if (!produto.preco) return;

        total += produto.preco * produto.quantidade;
        quantidadeTotal += produto.quantidade; // Soma todas as unidades

        itensCarrinho.innerHTML += `
            <div>
                <p>${produto.nome} - R$ ${produto.preco.toFixed(2)} x ${produto.quantidade}</p>
                <button onclick="removerItem(${index})">Remover</button>
            </div>
        `;
    });

    totalCarrinho.textContent = total.toFixed(2);
    botaoCarrinho.innerHTML = `Ver carrinho (${quantidadeTotal}) <img class="img_carrinho" src="../src/img/carrinho.png">`;
}

// Função para remover um item do carrinho
function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}
