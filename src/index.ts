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

// --- TESTES DA NOVA ETAPA  ---
adicionarLivro("Código Limpo", "Robert C. Martin", 2008, 464);
adicionarLivro("Arquitetura Limpa", "Robert C. Martin", 2017, 432);
removerLivro(4); // Remove "Percy Jackson e o Ladrão de Raios"
exibirBiblioteca();