document.addEventListener('DOMContentLoaded', function() {
    const formCadastro = document.getElementById('formCadastro');
    const listaProdutos = document.getElementById('listaProdutos');

    // Função para exibir produtos na tela
    function exibirProdutos() {
        listaProdutos.innerHTML = ''; // Limpa a lista antes de exibir
        let produtosCadastrados = JSON.parse(localStorage.getItem('produtos')) || [];

        produtosCadastrados.forEach((produto, index) => {
            const li = document.createElement('li');
            li.classList.add('produto-item'); // Adicionando classe para estilização
            
            li.innerHTML = `
                <strong>${produto.nome}</strong> - R$ ${produto.valor.toFixed(2)} <br>
                <img src="${produto.imagem}" alt="${produto.nome}" width="100"> <br>
                <button onclick="excluirProduto(${index})">Excluir</button>
            `;
            listaProdutos.appendChild(li);
        });
    }

    // Cadastrar produto
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault();

        const nomeProduto = document.getElementById('nomeProduto').value;
        const descricaoProduto = document.getElementById('descricaoProduto').value;
        const valorProduto = parseFloat(document.getElementById('valorProduto').value);
        const categoriaProduto = document.getElementById('categoriaProduto').value;
        const imagemProduto = document.getElementById('imagemProduto').files[0];

        if (!nomeProduto || !descricaoProduto || !valorProduto || !categoriaProduto || !imagemProduto) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            let produto = {
                nome: nomeProduto,
                descricao: descricaoProduto,
                imagem: e.target.result,
                valor: valorProduto,
                categoria: categoriaProduto
            };

            let produtosCadastrados = JSON.parse(localStorage.getItem('produtos')) || [];
            produtosCadastrados.push(produto);
            localStorage.setItem('produtos', JSON.stringify(produtosCadastrados));

            formCadastro.reset();
            alert('Produto cadastrado com sucesso!');
            exibirProdutos(); // Atualiza a lista de produtos
        };

        reader.readAsDataURL(imagemProduto);
    });

    // Função para excluir produto
    window.excluirProduto = function(index) {
        let produtosCadastrados = JSON.parse(localStorage.getItem('produtos')) || [];
        produtosCadastrados.splice(index, 1); // Remove o produto pelo índice
        localStorage.setItem('produtos', JSON.stringify(produtosCadastrados));
        exibirProdutos(); // Atualiza a lista de produtos
    };

    // Exibir os produtos ao carregar a página
    exibirProdutos();
});
