// --- DADOS INICIAIS ---
const titulos: string[] = ['O Hobbit', 'Revolução dos Bichos', 'Guia do Mochileiro das Galáxias', 'Percy Jackson e o Ladrão de Raios', 'Entendendo Algoritmos'];
const autores: string[] = ['J.R.R. Tolkien', 'George Orwell', 'Douglas Adams', 'Rick Riordan', 'Aditya Bhargava'];
const anos: number[] = [1937, 1945, 1979, 2005, 2017];
const paginas: number[] = [310, 152, 208, 384, 264];
const lido: boolean[] = [true, false, true, true, false];
const avaliacoes: number[] = [5, 0, 5, 3, 0];

// --- EXIBIÇÃO ---
function exibirBiblioteca(): void {
    console.log("\n=== MINHA BIBLIOTECA ===");
    titulos.forEach((titulo, i) => {
        const status = lido[i] ? `LIDO (${avaliacoes[i]}/5)` : "PENDENTE";
        console.log(`${i + 1}. "${titulo}" (${anos[i]}) - ${autores[i]} - ${paginas[i]} pag - ${status}`);
    });
}

// --- CADASTRO E REMOÇÃO ---

function adicionarLivro(titulo: string, autor: string, ano: number, numPaginas: number): void {
    if (ano > 0 && numPaginas > 0) {
        titulos.push(titulo);
        autores.push(autor);
        anos.push(ano);
        paginas.push(numPaginas);
        lido.push(false);
        avaliacoes.push(0);
        console.log(`\n✅ Livro "${titulo}" adicionado com sucesso!`);
    } else {
        console.log(`\n❌ Erro: Dados inválidos para o livro "${titulo}".`);
    }
}

function removerLivro(indice: number): void {
    if (indice >= 0 && indice < titulos.length) {
        const removido = titulos[indice];
        titulos.splice(indice, 1);
        autores.splice(indice, 1);
        anos.splice(indice, 1);
        paginas.splice(indice, 1);
        lido.splice(indice, 1);
        avaliacoes.splice(indice, 1);
        console.log(`\n🗑️ Livro "${removido}" removido com sucesso!`);
    } else {
        console.log(`\n❌ Erro: Índice ${indice} inválido.`);
    }
}

// --- BUSCA E FILTROS ---

function buscarPorTitulo(termo: string): number[] {
    const indicesEncontrados: number[] = [];
    
    titulos.forEach((titulo, i) => {
        // O includes() verifica se a palavra digitada existe dentro do título
        if (titulo.toLowerCase().includes(termo.toLowerCase())) {
            indicesEncontrados.push(i);
        }
    });
    
    return indicesEncontrados;
}

function listarPorAutor(autorBusca: string): string[] {
    //'map' junta os dados paralelos em objetos temporários
    //'filter' pega apenas os livros do autor pesquisado
    //O último 'map' devolve apenas um array com os nomes dos livros
    
    return titulos
        .map((titulo, i) => ({ nome: titulo, autor: autores[i]! }))
        .filter(livro => livro.autor.toLowerCase().includes(autorBusca.toLowerCase()))
        .map(livro => livro.nome);
}

// --- STATUS DE LEITURA ---

function marcarComoLido(indice: number, avaliacao: number): void {
    // 1. Validar se o livro existe
    if (indice < 0 || indice >= titulos.length) {
        console.log(`\n❌ Erro: Índice ${indice} não encontrado.`);
        return; // O return vazio para a execução da função aqui
    }

    // 2. Validar se a avaliação está entre 1 e 5
    if (avaliacao >= 1 && avaliacao <= 5) {
        lido[indice] = true;
        avaliacoes[indice] = avaliacao;
        console.log(`\n⭐ Livro "${titulos[indice]}" marcado como LIDO com nota ${avaliacao}/5!`);
    } else {
        console.log(`\n❌ Erro: A avaliação de "${titulos[indice]}" deve ser entre 1 e 5.`);
    }
}

function listarLidos(): string[] {
    // Usamos o '_' no primeiro parâmetro porque não precisamos do nome do título no momento da checagem, apenas do índice 'i'
    return titulos.filter((_, i) => lido[i] === true);
}

function listarPendentes(): string[] {
    return titulos.filter((_, i) => lido[i] === false);
}

// --- TESTES  ---
adicionarLivro("Código Limpo", "Robert C. Martin", 2008, 464);
adicionarLivro("Arquitetura Limpa", "Robert C. Martin", 2017, 432);
removerLivro(3); // Remove "Percy Jackson e o Ladrão de Raios"
exibirBiblioteca();

// --- TESTES DA ETAPA DE BUSCA E FILTRO ---
console.log("\n--- RESULTADOS DA BUSCA ---");

// Testando a busca por título (pesquisando pela palavra "Guia")
const resultadosBusca = buscarPorTitulo("guia");
console.log(`Índices encontrados para 'guia': [${resultadosBusca}]`);
resultadosBusca.forEach(i => console.log(`Livro: "${titulos[i]}"`));

// Testando o filtro por autor (pesquisando pelos livros que adicionamos na Etapa 3)
const livrosDoTioBob = listarPorAutor("Robert C. Martin");
console.log(`\nLivros do autor Robert C. Martin:`);
console.log(livrosDoTioBob);

// --- TESTE DO STATUS DE LEITURA ---
console.log("\n--- TESTANDO STATUS DE LEITURA ---");

//Tentando marcar com nota inválida (deve dar erro)
marcarComoLido(4,10);

//Marcando corretamente com nota 5
marcarComoLido(4,5);

console.log("\n📚 Livros já lidos:");
console.log(listarLidos());

console.log("\n⏳ Livros pendentes:");
console.log(listarPendentes());