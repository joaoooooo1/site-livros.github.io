document.addEventListener("DOMContentLoaded", carregarLivrosNoSite);

function create() {
    const nomeInput = document.getElementById('filename');
    const autorInput = document.getElementById('author');
    const selectAno = document.getElementById('meuSelect');

    const nome = nomeInput.value.trim();
    const autor = autorInput.value.trim();
    const anoTexto = selectAno.options[selectAno.selectedIndex]?.text;

    if (!nome || !autor || selectAno.value === "") {
        alert("Por favor, preencha todos os campos e selecione o ano para ADICIONAR!");
        return;
    }

    const novoLivro = { nome, autor, ano: anoTexto };

    let bancoLivros = JSON.parse(localStorage.getItem('bancoLivros')) || [];
    bancoLivros.push(novoLivro);
    localStorage.setItem('bancoLivros', JSON.stringify(bancoLivros));

    atualizarTela();

    nomeInput.value = '';
    autorInput.value = '';
    selectAno.value = '';
}

function remove() {
    const nomeInput = document.getElementById('filename');
    const autorInput = document.getElementById('author');
    const selectAno = document.getElementById('meuSelect');

    const nomeParaRemover = nomeInput.value.trim();
    const autorParaRemover = autorInput.value.trim();
    const anoParaRemover = selectAno.options[selectAno.selectedIndex]?.text;

    if (!nomeParaRemover || !autorParaRemover || selectAno.value === "") {
        alert("Preencha o Nome, Autor e Série nos campos acima para identificar qual livro REMOVER!");
        return;
    }

    let bancoLivros = JSON.parse(localStorage.getItem('bancoLivros')) || [];
    
    const livroExiste = bancoLivros.some(livro => 
        livro.nome.toLowerCase() === nomeParaRemover.toLowerCase() &&
        livro.autor.toLowerCase() === autorParaRemover.toLowerCase() &&
        livro.ano === anoParaRemover
    );

    if (!livroExiste) {
        alert("Nenhum livro foi encontrado com esses dados exatos!");
        return;
    }

    bancoLivros = bancoLivros.filter(livro => !(
        livro.nome.toLowerCase() === nomeParaRemover.toLowerCase() &&
        livro.autor.toLowerCase() === autorParaRemover.toLowerCase() &&
        livro.ano === anoParaRemover
    ));

    localStorage.setItem('bancoLivros', JSON.stringify(bancoLivros));

    atualizarTela();

    nomeInput.value = '';
    autorInput.value = '';
    selectAno.value = '';
    
    alert("Livro removido com sucesso!");
}

function filtrarLivros() {
    const inputBusca = document.getElementById('inputBusca');
    if (!inputBusca) return; // Evita erros se o input de busca não existir no HTML

    const termoBusca = inputBusca.value.toLowerCase();
    const areaArquivos = document.getElementById('arquivos');
    
    areaArquivos.innerHTML = '';

    let bancoLivros = JSON.parse(localStorage.getItem('bancoLivros')) || [];
    
    const livrosFiltrados = bancoLivros.filter(livro => 
        livro.nome.toLowerCase().includes(termoBusca) || 
        livro.autor.toLowerCase().includes(termoBusca)
    );

    livrosFiltrados.forEach(livro => desenharLivroNaTela(livro));
}

function desenharLivroNaTela(livro) {
    const areaArquivos = document.getElementById('arquivos');
    const card = document.createElement('div');
    card.className = 'card-livro';

    card.innerHTML = `
        <h4>📖 ${livro.nome}</h4>
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <span class="badge-ano">${livro.ano}</span>
    `;

    areaArquivos.appendChild(card);
}

function carregarLivrosNoSite() {
    let bancoLivros = JSON.parse(localStorage.getItem('bancoLivros')) || [];
    bancoLivros.forEach(livro => desenharLivroNaTela(livro));
}

function atualizarTela() {
    // CORREÇÃO: Verifica se o elemento existe antes de tentar limpar o valor dele
    const inputBusca = document.getElementById('inputBusca');
    if (inputBusca) {
        inputBusca.value = '';
    }
    
    const areaArquivos = document.getElementById('arquivos');
    if (areaArquivos) {
        areaArquivos.innerHTML = '';
    }
    carregarLivrosNoSite();
}

const selectElement = document.getElementById('meuSelect');
if (selectElement) {
    selectElement.addEventListener('change', (evento) => {
        console.log("Item selecionado com sucesso:", evento.target.value);
    });
}
